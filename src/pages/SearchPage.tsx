import { useState } from "react";
import { Search as SearchIcon, X, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  useGetPersonalizedRecommendationsQuery,
  useGetPopularWorkoutsThisWeekQuery 
} from "../store/api/pages/recommendationApi";
import { useGetVideosQuery } from "../store/api/pages/videoApi";

// Helper function to resolve image URL
function getImageUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_BACKEND_URL}/${path}`;
}

// Helper to check if video was uploaded within 24 hours
function isRecentlyAdded(createdAt: string): boolean {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours <= 24;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Check if user is logged in
  const token = localStorage.getItem("fitnessFlicksToken");
  const isLoggedIn = !!token;

  const isSearching = query.length > 0;

  // Fetch recommendations for when not searching
  const { 
    data: recommendationsData, 
    isLoading: isRecommendationsLoading 
  } = useGetPersonalizedRecommendationsQuery(
    { page: 1, limit: 20 },
    { skip: isSearching || !isLoggedIn }
  );

  // Fetch popular videos as fallback for non-logged-in users
  const { 
    data: popularData, 
    isLoading: isPopularLoading 
  } = useGetPopularWorkoutsThisWeekQuery(
    { page: 1, limit: 20 },
    { skip: isSearching || isLoggedIn }
  );

  // Fetch search results when searching
  const { 
    data: searchData, 
    isLoading: isSearchLoading 
  } = useGetVideosQuery(
    { 
      search: query,
      page: 1,
      limit: 50,
      status: "published",
      is_active: true,
      sort_by: "createdAt",
      sort_order: "desc"
    },
    { skip: !isSearching }
  );

  // Determine which data to show
  const recommendedVideos = isLoggedIn 
    ? (recommendationsData?.data?.videos || [])
    : (popularData?.data?.videos || []);
  
  const searchResults = searchData?.data?.videos || [];

  const isLoading = isSearching 
    ? isSearchLoading 
    : (isLoggedIn ? isRecommendationsLoading : isPopularLoading);

  const handleWorkoutClick = (workoutId: string) => {
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
            placeholder="Search workouts, trainers, categories..."
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
          </div>
        </div>
      </div>

      <main className="px-4 pt-4">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}

        {/* Show Recommendations when not searching */}
        {!isSearching && !isLoading ? (
          <>
            <div>
              <h2 className="text-xl font-bold mb-4">
                {isLoggedIn ? "Recommended For You" : "Popular Workouts"}
              </h2>
              
              {recommendedVideos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-sm">
                    {isLoggedIn 
                      ? "Start watching videos to get personalized recommendations"
                      : "No workouts available at the moment"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendedVideos.map((workout: any) => {
                    const thumbnailUrl = getImageUrl(workout.thumbnail_url);
                    const isRecent = workout.createdAt ? isRecentlyAdded(workout.createdAt) : false;
                    const categoryName = workout.category && typeof workout.category === "object"
                      ? workout.category.category_name || workout.category.name
                      : null;

                    return (
                      <div
                        key={workout._id}
                        onClick={() => handleWorkoutClick(workout._id)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                          {thumbnailUrl ? (
                            <img
                              src={thumbnailUrl}
                              alt={workout.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-500" />
                            </div>
                          )}
                          
                          {/* TOP 10 Badge */}
                          {workout.is_top_10 && (
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl">
                              TOP 10
                            </div>
                          )}
                          
                          {/* Recently Added Badge */}
                          {isRecent && (
                            <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 text-center">
                              Recently added
                            </div>
                          )}
                        </div>

                        {/* Title and Category */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-base font-medium line-clamp-1">
                            {workout.title}
                          </h3>
                          {categoryName && (
                            <p className="text-gray-400 text-xs mt-0.5">
                              {categoryName}
                            </p>
                          )}
                        </div>

                        {/* Play Button */}
                        <button className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                          <Play className="w-5 h-5 text-white fill-white ml-1" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : null}

        {/* Show Search Results */}
        {isSearching && !isLoading ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              {searchResults.length > 0 
                ? `${searchResults.length} Result${searchResults.length !== 1 ? 's' : ''} for "${query}"`
                : `No results for "${query}"`
              }
            </h2>
            
            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm mb-2">
                  No workouts found matching your search
                </p>
                <p className="text-gray-500 text-xs">
                  Try searching with different keywords
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {searchResults.map((result: any) => {
                  const thumbnailUrl = getImageUrl(result.thumbnail_url);
                  const isRecent = result.createdAt ? isRecentlyAdded(result.createdAt) : false;

                  return (
                    <div
                      key={result._id}
                      onClick={() => handleWorkoutClick(result._id)}
                      className="cursor-pointer"
                    >
                      <div className="relative aspect-[2/3] rounded overflow-hidden bg-gray-800">
                        {thumbnailUrl ? (
                          <img
                            src={thumbnailUrl}
                            alt={result.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <Play className="w-8 h-8 text-gray-500" />
                          </div>
                        )}
                        
                        {/* TOP 10 Badge */}
                        {result.is_top_10 && (
                          <div className="absolute top-0 left-0 z-10 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm leading-tight">
                            TOP<br/>10
                          </div>
                        )}
                        
                        {/* Recently Added Badge */}
                        {isRecent && (
                          <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 text-center">
                            Recently added
                          </div>
                        )}
                      </div>
                      
                      {/* Video Title Below Thumbnail */}
                      <div className="mt-1">
                        <h3 className="text-white text-xs font-medium line-clamp-2">
                          {result.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : null}
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}