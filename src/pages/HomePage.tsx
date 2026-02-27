import { useRef, useState, useEffect } from "react";
import { Play, Check, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../store/api/pages/masterApi"; 
import { 
  useGetContinueWatchingQuery,
  useGetPersonalizedRecommendationsQuery,
  useGetPopularWorkoutsThisWeekQuery,
  useGetTop10AllTimeQuery
} from "../store/api/pages/recommendationApi";
import { useGetPublicMobileHeroSliderQuery } from "../store/api/pages/mobileHeroSliderApi";
import {
  useCheckVideoInMyListQuery,
  useAddToMyListMutation,
  useRemoveFromMyListByVideoIdMutation,
} from "../store/api/pages/myListApi";

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

function WorkoutCard({ workout, showTopBadge = false, showProgress = false }: any) {
  const navigate = useNavigate();
  
  const handleClick = () => {
   
    const resumeTime = workout.progress?.watch_duration_seconds ?? 0;
    navigate(`/workout/${workout._id || workout.id}`, {
      state: { resumeTime: resumeTime > 0 ? resumeTime : 0 },
    });
  };

  const thumbnailUrl = getImageUrl(workout.thumbnail_url || workout.thumbnail);
  const categoryName = workout.category && typeof workout.category === "object" 
    ? workout.category.category_name || workout.category.name 
    : workout.category;

  const isRecent = workout.createdAt ? isRecentlyAdded(workout.createdAt) : false;
  const progressPercentage = workout.progress?.watch_percentage || 0;

  return (
    <div className="relative flex-shrink-0 w-[110px] cursor-pointer" onClick={handleClick}>
      {showTopBadge && workout.is_top_10 && (
        <div className="absolute top-0 left-0 z-10 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm leading-tight">
          TOP<br/>10
        </div>
      )}
      
      <div className="relative h-[160px] rounded-sm overflow-hidden bg-gray-800">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={workout.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <Play className="w-10 h-10 text-gray-500" />
          </div>
        )}
        
        {showProgress && progressPercentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-700">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
        
        {isRecent && !showProgress && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 text-center">
            Recently Added
          </div>
        )}
      </div>
      
      <div className="mt-1">
        <h3 className="text-white text-xs font-medium line-clamp-2">
          {workout.title}
        </h3>
        {categoryName && (
          <p className="text-gray-400 text-[10px] mt-0.5">
            {categoryName}
          </p>
        )}
      </div>
    </div>
  );
}

function WorkoutRow({ 
  title, 
  workouts, 
  showTopBadges = false, 
  showProgress = false,
  isLoading = false, 
  isEmpty = false 
}: any) {
  const rowRef = useRef(null);

  if (isLoading) {
    return (
      <div className="mb-6 pb-6">
        <h2 className="text-white text-base font-bold mb-2 px-4">{title}</h2>
        <div className="px-4">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="mb-6 pb-6">
        <h2 className="text-white text-base font-bold mb-2 px-4">{title}</h2>
        <div className="px-4 py-8">
          <div className="bg-gray-900/50 rounded-xl p-6 text-center">
            <div className="mb-3">
              <Play className="w-12 h-12 mx-auto text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm mb-2">
              {title.includes("Continue") 
                ? "No videos in progress"
                : "Start watching videos to get personalized recommendations"
              }
            </p>
            <p className="text-gray-500 text-xs">
              {title.includes("Continue")
                ? "Videos you start watching will appear here"
                : "Your recommendations will appear here based on your viewing history"
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!workouts || workouts.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 pb-6">
      <h2 className="text-white text-base font-bold mb-2 px-4">{title}</h2>
      <div
        ref={rowRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {workouts.map((workout: any) => (
          <WorkoutCard 
            key={workout._id || workout.id} 
            workout={workout} 
            showTopBadge={showTopBadges}
            showProgress={showProgress}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryPills({ categories }: any) {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      "from-orange-600 to-red-700",
      "from-purple-600 to-purple-900",
      "from-pink-600 to-pink-800",
      "from-blue-600 to-blue-900",
      "from-teal-500 to-teal-700",
      "from-indigo-600 to-indigo-900",
    ];
    return gradients[index % gradients.length];
  };
  
  return (
    <div className="px-4 mb-4">
      <h2 className="text-white text-base font-bold mb-3">
        Recommended for New Members
      </h2>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {categories.slice(0, 4).map((category: any, index: number) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className={`h-20 rounded-lg bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center cursor-pointer`}
          >
            <h3 className="text-white text-sm font-bold text-center px-2">
              {category.category_name}
            </h3>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {categories.slice(4, 6).map((category: any, index: number) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category._id)} 
            className={`h-20 rounded-lg bg-gradient-to-br ${getGradientColor(index + 4)} flex items-center justify-center cursor-pointer`}
          >
            <h3 className="text-white text-sm font-bold text-center px-2">
              {category.category_name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryDropdown({ categories, isOpen, onClose }: any) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex flex-col">
        <div className="flex-1 overflow-y-auto bg-black/95 backdrop-blur-sm">
          <div className="pt-16 pb-4 px-6">
            <div className="space-y-1 max-w-md mx-auto">
              {categories.map((category: any) => (
                <div
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)} 
                  className="text-center py-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg"
                >
                  <h3 className="text-white text-lg font-normal">
                    {category.category_name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-black/95 backdrop-blur-sm pb-8 pt-4 flex justify-center">
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default function FitnessHomePage() {
  const navigate = useNavigate();
  const [showPills, setShowPills] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Workouts");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Check if user is logged in
  const token = localStorage.getItem("fitnessFlicksToken");
  const isLoggedIn = !!token;

  // Fetch categories from API
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery({
    is_active: true,
    limit: 100,
  });

  // Fetch continue watching (only if logged in)
  const { 
    data: continueWatchingData, 
    isLoading: isContinueWatchingLoading 
  } = useGetContinueWatchingQuery(
    { limit: 12 },
    { skip: !isLoggedIn || selectedCategory !== "Workouts" }
  );

  // Fetch personalized recommendations (only if logged in)
  const { 
    data: recommendationsData, 
    isLoading: isRecommendationsLoading 
  } = useGetPersonalizedRecommendationsQuery(
    { page: 1, limit: 12 },
    { skip: !isLoggedIn || selectedCategory !== "Workouts" }
  );

  // Fetch popular workouts this week
  const { 
    data: popularData, 
    isLoading: isPopularLoading 
  } = useGetPopularWorkoutsThisWeekQuery(
    { page: 1, limit: 12 },
    { skip: selectedCategory !== "Workouts" }
  );

  // Fetch all-time top 10
  const { 
    data: allTimeTop10Data, 
    isLoading: isAllTimeTop10Loading 
  } = useGetTop10AllTimeQuery(
    undefined,
    { skip: selectedCategory !== "Workouts" }
  );

  // Fetch mobile hero slider
  const { data: mobileHeroData } = useGetPublicMobileHeroSliderQuery();
  const mobileHeroVideo = (mobileHeroData?.data as any)?.mobile_selected_video ?? null;

  const apiCategories = categoriesData?.data?.categories || [];
  const continueWatchingVideos = continueWatchingData?.data?.videos || [];
  const recommendedVideos = recommendationsData?.data?.videos || [];
  const popularVideos = popularData?.data?.videos || [];
  const allTimeTop10Videos = allTimeTop10Data?.data?.videos || [];
  
  // Check if user has data
  const hasContinueWatching = continueWatchingVideos.length > 0;
  const hasRecommendations = recommendedVideos.length > 0;

  // Hero: use mobile hero slider API first, fall back to first popular video
  const heroSource = mobileHeroVideo || popularVideos[0];
  const heroVideoId = heroSource?._id || null;

  const heroWorkout: any = {
    id: heroVideoId || "1",
    title: heroSource?.title || "CROSSFIT BURN",
    thumbnail: getImageUrl(heroSource?.thumbnail_url) || "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=1200&fit=crop&q=80",
    tags: heroSource ? [
      typeof heroSource.difficulty === "object"
        ? heroSource.difficulty?.difficulty_name
        : heroSource.difficulty,
      typeof heroSource.category === "object"
        ? heroSource.category?.category_name
        : heroSource.category,
      heroSource.duration_minutes ? `${heroSource.duration_minutes} min` : null,
      heroSource.calories_burn ? `${heroSource.calories_burn} cal` : null,
    ].filter(Boolean) : ["High-Intensity", "Fat-Burning", "Full-Body", "Fast-Paced"],
  };

  // My List: check if hero video is already saved (only when logged in)
  const { data: checkData, refetch: refetchCheck } = useCheckVideoInMyListQuery(
    heroVideoId!,
    { skip: !isLoggedIn || !heroVideoId }
  );
  const isInMyList = checkData?.data?.is_in_list ?? false;

  // My List mutations
  const [addToMyList, { isLoading: isAdding }] = useAddToMyListMutation();
  const [removeFromMyListByVideoId, { isLoading: isRemoving }] = useRemoveFromMyListByVideoIdMutation();
  const isMyListLoading = isAdding || isRemoving;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShowPills(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowPills(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleHeroPlayClick = () => {
    navigate(`/workout/${heroWorkout.id}`);
  };

  const handleMyListClick = async () => {
    // Not logged in
    if (!isLoggedIn) {
      const result = await Swal.fire({
        title: "Login Required",
        text: "Please log in to save videos to your list.",
        icon: "info",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#4b5563",
        background: "#1a1a1a",
        color: "#ffffff",
      });
      if (result.isConfirmed) navigate("/login");
      return;
    }

    if (!heroVideoId) return;

    // Already in list → ask to remove
    if (isInMyList) {
      const result = await Swal.fire({
        title: "Remove from My List?",
        text: `"${heroWorkout.title}" will be removed from your list.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#4b5563",
        background: "#1a1a1a",
        color: "#ffffff",
      });
      if (result.isConfirmed) {
        try {
          await removeFromMyListByVideoId(heroVideoId).unwrap();
          refetchCheck();
          Swal.fire({
            title: "Removed!",
            text: `"${heroWorkout.title}" has been removed from your list.`,
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
            background: "#1a1a1a",
            color: "#ffffff",
          });
        } catch {
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#dc2626",
            background: "#1a1a1a",
            color: "#ffffff",
          });
        }
      }
      return;
    }

    // Not in list → ask to add
    const result = await Swal.fire({
      title: "Add to My List?",
      text: `Add "${heroWorkout.title}" to your list?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#4b5563",
      background: "#1a1a1a",
      color: "#ffffff",
    });
    if (result.isConfirmed) {
      try {
        await addToMyList({ video_id: heroVideoId }).unwrap();
        refetchCheck();
        Swal.fire({
          title: "Added!",
          text: `"${heroWorkout.title}" has been added to your list.`,
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#ffffff",
        });
      } catch {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
          background: "#1a1a1a",
          color: "#ffffff",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Category Dropdown */}
      <CategoryDropdown 
        categories={apiCategories}
        isOpen={isCategoryDropdownOpen}
        onClose={() => setIsCategoryDropdownOpen(false)}
      />

      {/* Filter Pills */}
      <div className={`sticky top-0 z-40 bg-gradient-to-b from-black via-black/95 to-transparent transition-all duration-300 ${showPills ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex gap-2 px-4 py-3">
          <button
            onClick={() => setSelectedCategory("Workouts")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "Workouts"
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Workouts
          </button>
          {/* <button
            onClick={() => setSelectedCategory("Videos")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "Videos"
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Videos
          </button> */}
          <button
            onClick={() => {
              setIsCategoryDropdownOpen(true);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
              selectedCategory === "Categories"
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full px-4 pb-4 -mt-14">
        <div className="relative rounded-xl overflow-hidden border-2 border-white/20">
          <div className="relative h-[500px]">
            <img
              src={heroWorkout.thumbnail}
              alt="Hero workout"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <h1 className="text-4xl font-black text-white mb-2">
              {heroWorkout.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-300">
              {heroWorkout.tags.map((tag: string, index: number) => (
                <span key={tag}>
                  {tag}
                  {index < heroWorkout.tags.length - 1 && <span className="mx-1">•</span>}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleHeroPlayClick}
                className="flex-1 bg-white text-black font-bold py-2.5 rounded-md flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-black" />
                Play
              </button>

              {/* My List Button — toggles based on isInMyList */}
              <button
                onClick={handleMyListClick}
                disabled={isMyListLoading}
                className={`flex-1 backdrop-blur-sm font-bold py-2.5 rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
                  isInMyList
                    ? "bg-white/20 border border-white text-white"
                    : "bg-gray-600/80 text-white"
                } ${isMyListLoading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {isInMyList ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    <span>In My List</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>My List</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Section */}
      {!isCategoriesLoading && apiCategories.length > 0 && (
        <CategoryPills categories={apiCategories} />
      )}

      {/* Content Rows - Changes based on selected category */}
      <div className="pb-8">
        {selectedCategory === "Workouts" && (
          <>
            {/* Continue Your Journey - Only for logged in users with incomplete videos */}
            {isLoggedIn && (
              <WorkoutRow 
                title="Continue Your Journey" 
                workouts={continueWatchingVideos}
                showTopBadges={false}
                showProgress={true}
                isLoading={isContinueWatchingLoading}
                isEmpty={!hasContinueWatching && !isContinueWatchingLoading}
              />
            )}
            
            {/* Personalized Recommendations - Only for logged in users */}
            {isLoggedIn && (
              <WorkoutRow 
                title="Recommended For You" 
                workouts={recommendedVideos}
                showTopBadges={true}
                showProgress={false}
                isLoading={isRecommendationsLoading}
                isEmpty={!hasRecommendations && !isRecommendationsLoading}
              />
            )}
            
            {/* Popular Workouts This Week - With Top 10 Badges */}
            <WorkoutRow 
              title="Popular This Week" 
              workouts={popularVideos}
              showTopBadges={true}
              showProgress={false}
              isLoading={isPopularLoading}
              isEmpty={false}
            />

            {/* All Time Top 10 - With Recently Added badges */}
            <WorkoutRow 
              title="All Time Top 10" 
              workouts={allTimeTop10Videos}
              showTopBadges={false}
              showProgress={false}
              isLoading={isAllTimeTop10Loading}
              isEmpty={false}
            />
          </>
        )}

        {selectedCategory === "Videos" && (
          <>
            {/* For Videos tab, show the same sections */}
            {isLoggedIn && (
              <WorkoutRow 
                title="Continue Your Journey" 
                workouts={continueWatchingVideos}
                showTopBadges={false}
                showProgress={true}
                isLoading={isContinueWatchingLoading}
                isEmpty={!hasContinueWatching && !isContinueWatchingLoading}
              />
            )}

            {isLoggedIn && (
              <WorkoutRow 
                title="Recommended For You" 
                workouts={recommendedVideos}
                showTopBadges={true}
                showProgress={false}
                isLoading={isRecommendationsLoading}
                isEmpty={!hasRecommendations && !isRecommendationsLoading}
              />
            )}
            
            <WorkoutRow 
              title="Popular This Week" 
              workouts={popularVideos}
              showTopBadges={true}
              showProgress={false}
              isLoading={isPopularLoading}
              isEmpty={false}
            />

            <WorkoutRow 
              title="All Time Top 10" 
              workouts={allTimeTop10Videos}
              showTopBadges={false}
              showProgress={false}
              isLoading={isAllTimeTop10Loading}
              isEmpty={false}
            />
          </>
        )}
      </div>
    </div>
  );
}