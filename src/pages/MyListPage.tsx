import { ArrowLeft, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Navbar } from "@/components/navbar";

const mockSavedWorkouts = [
  {
    id: "1",
    workoutId: 1,
    workout: {
      id: 1,
      title: "30-MIN HIIT BURN",
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
      title: "Core Blast",
      category: "Core",
      duration: "15 min",
      thumbnail:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    },
  },
  {
    id: "3",
    workoutId: 3,
    workout: {
      id: 3,
      title: "Morning Yoga Flow",
      category: "Yoga",
      duration: "25 min",
      thumbnail:
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=600&fit=crop&q=80",
    },
  },
];

export default function MyListPage() {
  const handleDelete = (id: string) => {
    console.log("Delete saved workout:", id);
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white pb-20">
      {/* <Navbar /> */}

      <main className="pt-4 px-4 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">My List</h1>
            <p className="text-gray-400">
              {mockSavedWorkouts.length} saved workouts
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mockSavedWorkouts.map((saved) => (
            <div key={saved.id} className="group cursor-pointer relative">
              <div
                className="relative rounded-md overflow-hidden bg-gray-800 transition-all duration-300
                active:scale-95 sm:group-hover:scale-105 sm:group-hover:shadow-2xl sm:group-hover:z-10"
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={saved.workout.thumbnail}
                    alt={saved.workout.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded">
                    <span className="text-xs font-semibold text-white">
                      {saved.workout.duration}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(saved.id);
                    }}
                    className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/70
                      text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                    {saved.workout.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-300 text-xs">
                    <span className="font-semibold text-green-400">
                      {saved.workout.category}
                    </span>
                    <span>•</span>
                    <span>{saved.workout.duration}</span>
                  </div>
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-5 h-5 text-black ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
