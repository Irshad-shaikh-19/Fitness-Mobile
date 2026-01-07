import { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { WorkoutCard, type WorkoutCardData } from "@/components/workout-card";
import { CategoryGrid } from "@/components/category-grid";
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
    title: "Core Blast",
    image: "",
    category: "Core",
    duration: "15 min",
    isPopular: false,
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    image: "",
    category: "Yoga",
    duration: "25 min",
    isPopular: false,
  },
  {
    id: 4,
    title: "Upper Body Strength",
    image: "",
    category: "Strength",
    duration: "45 min",
    isPopular: false,
  },
  {
    id: 5,
    title: "Quick HIIT",
    image: "",
    category: "Cardio",
    duration: "20 min",
    isPopular: false,
  },
  {
    id: 6,
    title: "HIIT Cardio",
    image: "",
    category: "Cardio",
    duration: "30 min",
    isPopular: true,
  },
];

const mockCategories = [
  { id: "chest", name: "Chest", color: "bg-gray-800" },
  { id: "fullbody", name: "Full Body", color: "bg-[#F97316]" },
  { id: "core", name: "Core", color: "bg-indigo-900" },
  { id: "arms", name: "Arms", color: "bg-slate-800" },
  { id: "yoga", name: "Yoga", color: "bg-cyan-600" },
];

function WorkoutRow({
  title,
  workouts,
  showProgress,
}: {
  title: string;
  workouts: WorkoutCardData[];
  showProgress?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4 py-6 px-4 md:px-12 group relative">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h2>

      <div className="relative group/row">
        <div className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer hover:bg-black/70 rounded-l-lg">
          <ChevronLeft className="text-white w-8 h-8" />
        </div>

        <div
          ref={rowRef}
          className="flex items-center gap-4 overflow-x-scroll scroll-smooth no-scrollbar py-4 px-1"
        >
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              showProgress={showProgress}
            />
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer hover:bg-black/70 rounded-r-lg">
          <ChevronRight className="text-white w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const continueWorkouts: WorkoutCardData[] = mockWorkouts
    .slice(0, 3)
    .map((w) => ({
      ...w,
      progress: Math.floor(Math.random() * 70) + 20,
    }));

  const popularWorkouts = mockWorkouts.filter((w) => w.isPopular);
  const recommendedWorkouts = mockWorkouts.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white pb-20">
      {/* <Navbar /> */}

      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-800" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-transparent to-transparent" />

        <div className="relative z-10 flex items-center h-full px-6 md:px-12 pt-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
              30-MIN HIIT BURN
            </h1>
            <p className="text-lg text-gray-300 mb-6 line-clamp-3">
              Intense full-body HIIT session to torch calories and boost your
              metabolism. Join our expert trainers for this high-energy workout.
            </p>
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-200 text-black font-bold px-8"
              >
                <Play className="w-5 h-5 mr-2 fill-black" /> Play
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-400 text-white hover:bg-white/10"
              >
                <Plus className="w-5 h-5 mr-2" /> My List
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 pt-8 space-y-12">
        <WorkoutRow
          title="Continue Your Journey"
          workouts={continueWorkouts}
          showProgress={true}
        />
        <WorkoutRow
          title="Recommended For You"
          workouts={recommendedWorkouts}
        />
        <WorkoutRow
          title="Popular Workouts This Week"
          workouts={popularWorkouts}
        />

        <div className="pt-8">
          <CategoryGrid categories={mockCategories} />
        </div>
      </div>
    </div>
  );
}
