import React from "react";
import { ChevronRight, Download as DownloadIcon, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockMyList = [
  {
    id: 1,
    title: "ALICE IN BORDERLAND",
    thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=600&fit=crop&q=80",
    badge: "TOP 10"
  },
  {
    id: 2,
    title: "SAIKAARA",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop&q=80",
  },
  {
    id: 3,
    title: "STRANGER THINGS",
    thumbnail: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=600&fit=crop&q=80",
    badge: "TOP 10"
  },
];

function WorkoutCard({ workout }: any) {
  const navigate = useNavigate();
  
  return (
    <div 
      className="relative flex-shrink-0 w-[110px] cursor-pointer"
      onClick={() => navigate(`/workout/${workout.id}`)}
    >
      {workout.badge && (
        <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
          {workout.badge}
        </div>
      )}
      <div className="relative h-[160px] rounded-sm overflow-hidden bg-gray-800">
        <img
          src={workout.thumbnail}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pb-24">
     

      {/* Downloads Section - Box Style */}
      <div className="px-4 mb-8 pt-6">
        <button 
          onClick={() => navigate("/downloads")}
          className="w-full bg-gray-800/50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800/70 transition"
        >
          <div className="flex items-center gap-4">
            <DownloadIcon className="w-8 h-8 text-gray-400" />
            <div className="text-left">
              <h3 className="text-white text-lg font-semibold">Downloads</h3>
              <p className="text-gray-400 text-sm">Movies and shows that you download appear here.</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
        </button>
      </div>

      {/* My List Section */}
      <div>
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-xl font-bold">My List</h2>
          <button 
            onClick={() => navigate("/my-list")}
            className="flex items-center gap-1 text-base text-white hover:text-gray-300"
          >
            See All
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
          {mockMyList.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>

    

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}