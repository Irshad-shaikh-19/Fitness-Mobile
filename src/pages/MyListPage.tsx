import { Play, Trash2, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetMyListQuery,
  useRemoveFromMyListMutation,
} from "../store/api/pages/myListApi";

// Helper function to resolve image URL
function getImageUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_BACKEND_URL}/${path}`;
}

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

// Map sort option label → API params
function getSortParams(sort: string): { sort_by: string; sort_order: string } {
  switch (sort) {
    case "Date Added to List":
      // Newest added first
      return { sort_by: "added_at", sort_order: "desc" };
    case "A - Z":
      // Handled client-side since backend sorts before $lookup (title not available)
      return { sort_by: "added_at", sort_order: "desc" };
    case "Release Date":
      // Oldest added first
      return { sort_by: "added_at", sort_order: "asc" };
    default:
      // Suggested: newest first
      return { sort_by: "added_at", sort_order: "desc" };
  }
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

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    console.log("Edit Mode in MyListPage:", isEditMode);
  }, [isEditMode]);

  const { sort_by, sort_order } = getSortParams(selectedSort);

  // Fetch my list from API
  const {
    data: myListData,
    isLoading,
    isFetching,
    refetch,
  } = useGetMyListQuery({
    page: 1,
    limit: 50,
    sort_by,
    sort_order,
  });

  const rawList = myListData?.data?.myList || [];
  // A-Z sorted client-side because backend sorts before video $lookup
  const myList = selectedSort === "A - Z"
    ? [...rawList].sort((a, b) =>
        (a.video?.title || "").localeCompare(b.video?.title || "")
      )
    : rawList;

  // Remove mutation
  const [removeFromMyList, { isLoading: isRemoving }] = useRemoveFromMyListMutation();

  const handleDelete = async (entryId: string, title: string) => {
    const result = await Swal.fire({
      title: "Remove from My List?",
      text: `"${title}" will be removed from your list.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#4b5563",
      background: "#1a1a1a",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      try {
        await removeFromMyList(entryId).unwrap();
        refetch();
        Swal.fire({
          title: "Removed!",
          text: `"${title}" has been removed from your list.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#ffffff",
        });
      } catch {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
          background: "#1a1a1a",
          color: "#ffffff",
        });
      }
    }
  };

  const handleWorkoutClick = (videoId: string) => {
    if (!isEditMode) {
      navigate(`/workout/${videoId}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading your list...</div>
      </div>
    );
  }

  // Empty state
  if (!isLoading && myList.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pb-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div className="mb-4">
            <Play className="w-16 h-16 mx-auto text-gray-600" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Your list is empty</h2>
          <p className="text-gray-400 text-sm">
            Save workouts from the home screen to watch them later.
          </p>
        </div>
      </div>
    );
  }

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
      <main className={`px-4 ${isEditMode ? "pt-20" : "pt-24"}`}>
        {/* Count label */}
        <p className="text-gray-400 text-xs mb-4">
          {myList.length} {myList.length === 1 ? "video" : "videos"} in your list
        </p>

        <div className="space-y-4">
          {myList.map((entry) => {
            const video = entry.video;
            const thumbnailUrl = getImageUrl(video?.thumbnail_url);
            const videoId = video?._id || entry.video_id;
            const title = video?.title || "Untitled";
            const duration = video?.duration_minutes
              ? `${video.duration_minutes} min`
              : null;
            const difficulty = video?.difficulty?.difficulty_name || null;

            return (
              <div
                key={entry._id}
                onClick={() => handleWorkoutClick(videoId)}
                className={`flex items-center gap-4 ${
                  !isEditMode ? "cursor-pointer" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="w-32 h-20 rounded overflow-hidden bg-gray-800 flex-shrink-0 relative">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-base font-medium truncate">
                    {title}
                  </h3>
                  {(duration || difficulty) && (
                    <p className="text-gray-400 text-xs mt-0.5">
                      {[difficulty, duration].filter(Boolean).join(" • ")}
                    </p>
                  )}
                </div>

                {/* Action button */}
                <div className="flex-shrink-0">
                  {isEditMode ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entry._id, title);
                      }}
                      disabled={isRemoving}
                      className="text-red-500 hover:text-red-400 transition p-2 disabled:opacity-50"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/workout/${videoId}`);
                      }}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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