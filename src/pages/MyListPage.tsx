import { ArrowLeft, Bookmark, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

const mockSavedWorkouts = [
  {
    id: "1",
    workoutId: 1,
    workout: {
      id: 1,
      title: "30-MIN HIIT BURN",
      category: "Cardio",
      duration: "30 min",
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
    },
  },
];

export default function MyListPage() {
  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* <Navbar /> */}

      <main className="px-6 md:px-12 py-8 pt-24">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockSavedWorkouts.map((saved) => (
            <div
              key={saved.id}
              className="group relative rounded-lg overflow-hidden bg-gray-900"
            >
              <div className="aspect-video relative cursor-pointer bg-gray-800">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">
                  {saved.workout.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">
                    {saved.workout.duration}
                  </span>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
