import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Video } from "../../store/api/pages/videoApi";
import { getImageUrl } from "./helpers";

interface Props {
  videos: Video[];
  currentId?: string;
  isLoading: boolean;
  categoryId: string | null;
}

export default function RelatedVideos({ videos, isLoading, categoryId }: Props) {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-12 md:pb-16 lg:pb-20">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">More Like This</h2>

      {!categoryId ? (
        <p className="text-gray-400 text-sm sm:text-base">No related videos available.</p>
      ) : isLoading ? (
        <p className="text-gray-400 text-sm sm:text-base">Loading related videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-400 text-sm sm:text-base">No related videos found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {videos.map((v) => {
            const thumb = getImageUrl(v.thumbnail_url);
            const cat = v.category && typeof v.category === "object" ? v.category.category_name || "" : "";
            return (
              <Link key={v._id} to={`/workout/${v._id}`} className="group cursor-pointer">
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-gray-800">
                  {thumb ? (
                    <img src={thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <Play className="w-10 h-10 text-gray-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-base mb-1 line-clamp-1">{v.title}</h3>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
                      {cat && <span>{cat}</span>}
                      {v.duration_minutes && <span className="text-gray-400">{v.duration_minutes}m</span>}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}