import { Navbar } from "@/components/navbar";
import { Play, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const mockWorkouts = [
  {
    id: 1,
    title: "30-MIN HIIT BURN",
    thumbnail: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "30 min",
    isPopular: true,
  },
  {
    id: 2,
    title: "Quick HIIT",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "20 min",
    isPopular: false,
  },
  {
    id: 3,
    title: "Cardio Blast",
    thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "25 min",
    isPopular: true,
  },
  {
    id: 4,
    title: "HIIT Cardio",
    thumbnail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "35 min",
    isPopular: false,
  },
  {
    id: 5,
    title: "FULL BODY BURN",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "30 min",
    isPopular: true,
  },
  {
    id: 6,
    title: "POWER BOXING",
    thumbnail: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "25 min",
    isPopular: true,
  },
  {
    id: 7,
    title: "RUNNING INTERVALS",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "40 min",
    isPopular: false,
  },
];



export default function CategoryPage() {
  const navigate = useNavigate();
  const categoryName = "Cardio";

  const handleWorkoutClick = (workoutId: number) => {
    navigate(`/workout/${workoutId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden">
      <Navbar />

   

      {/* Content */}
      <main className="px-4 pt-6">
        <div className="space-y-4">
          {mockWorkouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => handleWorkoutClick(workout.id)}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="w-32 h-20 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                <img
                  src={workout.thumbnail}
                  alt={workout.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-base font-medium truncate">
                  {workout.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                  <span className="font-semibold text-green-400">{workout.category}</span>
                  <span>•</span>
                  <span>{workout.duration}</span>
                </div>
              </div>

              {/* Play button */}
              <div className="flex-shrink-0">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/workout/${workout.id}`);
                  }}
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition"
                >
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

    
    </div>
  );
}