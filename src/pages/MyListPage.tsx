import { Play, Trash2, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const mockSavedWorkouts = [
  {
    id: "1",
    workoutId: 1,
    workout: {
      id: 1,
      title: "Quick Burn",
      category: "Cardio",
      duration: "30 min",
      thumbnail:
        "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=600&fit=crop&q=80",
    },
  },
  {
    id: "2",
    workoutId: 2,
    workout: {
      id: 2,
      title: "Upper Body",
      category: "Core",
      duration: "15 min",
      thumbnail:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    },
  },
];

interface SortMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
}

function SortMenu({ isOpen, onClose, selectedSort, onSelectSort }: SortMenuProps) {
  const sortOptions = [
    "Suggested",
    "Date Added to List",
    "A - Z",
    "Release Date",
  ];

  const handleSelect = (option: string) => {
    onSelectSort(option);
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-[60]
          transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="px-4 py-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-xl font-semibold">Sort by</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-0">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full flex items-center justify-between px-4 py-4
                  text-white hover:bg-gray-800/50 active:bg-gray-800/70
                  rounded-lg transition"
              >
                <span className="text-lg">{option}</span>
                {selectedSort === option && (
                  <Check className="w-6 h-6 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Define the context type
interface OutletContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

export default function MyListPage() {
  const navigate = useNavigate();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Suggested");
  
  // Get edit mode state from outlet context
  const context = useOutletContext<OutletContextType>();
  const isEditMode = context?.isEditMode ?? false;
  const setIsEditMode = context?.setIsEditMode ?? (() => {});

  // Add console log to debug
  useEffect(() => {
    console.log("Edit Mode in MyListPage:", isEditMode);
  }, [isEditMode]);

  const handleDelete = (id: string) => {
    console.log("Delete saved workout:", id);
    // Add your delete logic here
  };

  const handleWorkoutClick = (workoutId: number) => {
    if (!isEditMode) {
      navigate(`/workout/${workoutId}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden">
      {/* Sort Header - Only show when NOT in edit mode */}
      {!isEditMode && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-black">
          <div className="px-4 py-2 pb-3">
            <button
              onClick={() => setIsSortOpen(true)}
              className="w-full text-left active:bg-gray-800/40 rounded-lg transition"
            >
              <span className="text-gray-400 text-sm">Sort by</span>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-white text-base font-medium">
                  {selectedSort}
                </span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <main className={`px-4 ${isEditMode ? 'pt-20' : 'pt-24'}`}>
        <div className="space-y-4">
          {mockSavedWorkouts.map((saved) => (
            <div
              key={saved.id}
              onClick={() => handleWorkoutClick(saved.workoutId)}
              className={`flex items-center gap-4 ${!isEditMode ? 'cursor-pointer' : ''}`}
            >
              <div className="w-32 h-20 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                <img
                  src={saved.workout.thumbnail}
                  alt={saved.workout.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-base font-medium truncate">
                  {saved.workout.title}
                </h3>
              </div>

              {/* Conditional rendering: Delete button in edit mode, Play button otherwise */}
              <div className="flex-shrink-0">
                {isEditMode ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(saved.id);
                    }}
                    className="text-red-500 hover:text-red-400 transition p-2"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/workout/${saved.workoutId}`);
                    }}
                    className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition"
                  >
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <SortMenu
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
      />
    </div>
  );
}