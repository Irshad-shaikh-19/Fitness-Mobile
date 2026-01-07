import { Play, Plus } from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  image: string;
  title: string;
  description: string;
}

export function Hero({ image, title, description }: HeroProps) {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-transparent to-transparent" />
      
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 pt-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-300 mb-6 line-clamp-3">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg" className="bg-white hover:bg-gray-200 text-black font-bold px-8">
              <Play className="w-5 h-5 mr-2 fill-black" /> Play
            </Button>
            <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-white/10">
              <Plus className="w-5 h-5 mr-2" /> My List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
