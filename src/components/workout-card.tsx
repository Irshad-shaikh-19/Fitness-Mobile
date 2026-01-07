import { Play, Plus, Clock } from "lucide-react";

export interface WorkoutCardData {
  id: number;
  title: string;
  image: string;
  category: string;
  duration: string;
  progress?: number;
  isPopular?: boolean;
}

interface WorkoutCardProps {
  workout: WorkoutCardData;
  showProgress?: boolean;
}

export function WorkoutCard({ workout, showProgress }: WorkoutCardProps) {
  return (
    <div className="group flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        <img 
          src={workout.image} 
          alt={workout.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {workout.duration}
        </div>
        
        {workout.isPopular && (
          <div className="absolute top-2 left-2 bg-primary text-black px-2 py-0.5 rounded text-xs font-bold">
            POPULAR
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-black fill-black ml-0.5" />
          </div>
        </div>
        
        <button className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80">
          <Plus className="w-4 h-4 text-white" />
        </button>
        
        {showProgress && workout.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${workout.progress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <h3 className="font-medium text-white truncate">{workout.title}</h3>
        <p className="text-sm text-gray-400">{workout.category}</p>
      </div>
    </div>
  );
}
