import { Navbar } from "@/components/navbar";
import { WorkoutCard } from "@/components/workout-card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const categoryName = "Cardio";

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white pb-20">
      {/* <Navbar /> */}

      <div className="pt-4 px-4 md:px-12">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 gap-2 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
          {categoryName} Workouts
        </h1>
        <p className="text-gray-400 mb-6">
          {mockWorkouts.length} workouts available
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {mockWorkouts.map((workout) => (
            <div key={workout.id} className="group cursor-pointer">
              <div className="relative rounded-md overflow-hidden bg-gray-800 transition-all duration-300 
                active:scale-95 sm:group-hover:scale-105 sm:group-hover:shadow-2xl sm:group-hover:z-10">
                
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={workout.thumbnail}
                    alt={workout.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded">
                    <span className="text-xs font-semibold text-white">{workout.duration}</span>
                  </div>
                  
                  {/* Popular Badge */}
                  {workout.isPopular && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-600/90 backdrop-blur-sm rounded">
                      <span className="text-xs font-semibold text-white">Popular</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-3">
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                    {workout.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-300 text-xs">
                    <span className="font-semibold text-green-400">{workout.category}</span>
                    <span>•</span>
                    <span>{workout.duration}</span>
                  </div>
                </div>
                
                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5 text-black fill-black ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}