import { useState } from "react";
import { Search as SearchIcon, X, Play, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";



const mockRecommendedWorkouts = [
  {
    id: 1,
    title: "Total Body HIIT Burn",
    thumbnail:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop&q=80",
    badge: "TOP 10",
  },
  {
    id: 2,
    title: "Strength & Conditioning",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Advanced Fat Burn Workout",
    thumbnail:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
    badge: "TOP 10",
    recentlyAdded: true,
  },
  {
    id: 4,
    title: "Morning Yoga Flow",
    thumbnail:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=300&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Beginner Cardio Session",
    thumbnail:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=300&fit=crop&q=80",
  },
];


const mockSearchResults = [
  {
    id: 1,
    title: "30-Min Full Body Burn",
    thumbnail:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=300&h=450&fit=crop&q=80",
  },
  {
    id: 2,
    title: "HIIT Cardio Blast",
    thumbnail:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=300&h=450&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Strength Training Essentials",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=450&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Beginner Yoga Flow",
    thumbnail:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=450&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Live Morning Workout",
    thumbnail:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&h=450&fit=crop&q=80",
    live: "02/03",
  },
  {
    id: 6,
    title: "Core & Abs Sculpt",
    thumbnail:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&h=450&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Power Yoga Strength",
    thumbnail:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=450&fit=crop&q=80",
  },
  {
    id: 8,
    title: "Lower Body Strength",
    thumbnail:
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=300&h=450&fit=crop&q=80",
  },
  {
    id: 9,
    title: "Evening Stretch & Recovery",
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=450&fit=crop&q=80",
  },
];


export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const isSearching = query.length > 0;

  const handleWorkoutClick = (workoutId: number) => {
    navigate(`/workout/${workoutId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 pt-20">
      {/* Search Input */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gray-800 px-4 py-3">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search shows, movies, games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-20 bg-gray-700 border-none text-white text-base rounded-md focus:outline-none focus:ring-0"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {/* <button className="text-gray-400 hover:text-white">
              <Mic className="w-5 h-5" />
            </button> */}
          </div>
        </div>
      </div>

      <main className="px-4 pt-4">
        {/* Show Recommendations when not searching */}
        {!isSearching ? (
          <>
          

            {/* Recommended Shows & Movies */}
            <div>
              <h2 className="text-xl font-bold mb-4">Recommended Workouts</h2>
              <div className="space-y-3">
                {mockRecommendedWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    onClick={() => handleWorkoutClick(workout.id)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                      <img
                        src={workout.thumbnail}
                        alt={workout.title}
                        className="w-full h-full object-cover"
                      />
                      {workout.badge && (
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl">
                          {workout.badge}
                        </div>
                      )}
                      {workout.recentlyAdded && (
                        <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 text-center">
                          Recently added
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="text-white text-base font-medium">
                        {workout.title}
                      </h3>
                    </div>

                    {/* Play Button */}
                    <button className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-white fill-white ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Show Search Results */
          <>
            <h2 className="text-xl font-bold mb-4">Movies & TV</h2>
            <div className="grid grid-cols-3 gap-2">
              {mockSearchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleWorkoutClick(result.id)}
                  className="cursor-pointer"
                >
                  <div className="relative aspect-[2/3] rounded overflow-hidden bg-gray-800">
                    <img
                      src={result.thumbnail}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                    {result.live && (
                      <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white">
                        <div className="text-center text-[10px] font-bold py-0.5">Live</div>
                        <div className="text-center text-xs font-bold py-1">{result.live}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}