import { Navbar } from "@/components/navbar";
import { WorkoutCard } from "@/components/workout-card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockWorkouts = [
  {
    id: 1,
    title: "30-MIN HIIT BURN",
    image: "",
    category: "Cardio",
    duration: "30 min",
    isPopular: true,
  },
  {
    id: 2,
    title: "Quick HIIT",
    image: "",
    category: "Cardio",
    duration: "20 min",
    isPopular: false,
  },
  {
    id: 3,
    title: "Cardio Blast",
    image: "",
    category: "Cardio",
    duration: "25 min",
    isPopular: true,
  },
  {
    id: 4,
    title: "HIIT Cardio",
    image: "",
    category: "Cardio",
    duration: "35 min",
    isPopular: false,
  },
];

export default function CategoryPage() {
  const categoryName = "Cardio";

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white pb-20">
      {/* <Navbar /> */}

      <div className="pt-24 px-4 md:px-12">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 gap-2 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Button>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
          {categoryName} Workouts
        </h1>
        <p className="text-gray-400 mb-8">
          {mockWorkouts.length} workouts available
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  );
}
