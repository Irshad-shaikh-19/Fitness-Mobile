import { ArrowLeft, Play, Pause, Volume2, Maximize, Bookmark, ThumbsUp, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WatchPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const workout = {
    id: 1,
    title: "30-MIN HIIT BURN",
    category: "Cardio",
    duration: "30 min",
    coach: "Mike Thompson",
    description: "Intense full-body HIIT session to torch calories and boost your metabolism. This workout combines cardio bursts with strength moves for maximum calorie burn.",
    difficulty: "Intermediate",
    equipment: "None",
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      <div className="relative w-full aspect-video bg-black max-h-[80vh]">
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div 
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </div>
        </div>
        
        <button className="absolute top-4 left-4 z-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <div className="w-full h-1 bg-gray-700 rounded-full mb-4 cursor-pointer">
            <div 
              className="h-full bg-[#F97316] rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F97316] rounded-full" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <span className="text-sm">10:30 / 30:00</span>
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-8">
        <div className="max-w-4xl">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span>{workout.category}</span>
                <span>•</span>
                <span>{workout.duration}</span>
                <span>•</span>
                <span>{workout.difficulty}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-gray-700">
                <Bookmark className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700">
                <ThumbsUp className="w-4 h-4 mr-2" /> Like
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#F97316]/20 flex items-center justify-center">
                <span className="text-[#F97316] font-bold">MT</span>
              </div>
              <div>
                <h3 className="font-bold">{workout.coach}</h3>
                <p className="text-gray-400 text-sm">Certified Fitness Trainer</p>
              </div>
            </div>
            <p className="text-gray-300">{workout.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <h3 className="font-bold mb-2">Equipment Needed</h3>
              <p className="text-gray-400">{workout.equipment}</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <h3 className="font-bold mb-2">Difficulty Level</h3>
              <p className="text-gray-400">{workout.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
