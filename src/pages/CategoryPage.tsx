import { Navbar } from "@/components/navbar";
import { Play, X, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetVideosByCategoryQuery } from "../store/api/pages/videoApi";
import { useGetCategoriesQuery } from "../store/api/pages/masterApi";



interface CategoryMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string, categoryName: string) => void;
  categories: any[];
}

function CategoryMenu({ 
  isOpen, 
  onClose, 
  selectedCategoryId, 
  onSelectCategory,
  categories 
}: CategoryMenuProps) {
  const handleSelect = (categoryId: string, categoryName: string) => {
    onSelectCategory(categoryId, categoryName);
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-[60]
          transition-transform duration-300 max-h-[70vh] overflow-y-auto ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="px-4 py-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-xl font-semibold">Select Category</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-0">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleSelect(category._id, category.category_name)}
                className="w-full flex items-center justify-between px-4 py-4
                  text-white hover:bg-gray-800/50 active:bg-gray-800/70
                  rounded-lg transition"
              >
                <span className="text-lg">{category.category_name}</span>
                {selectedCategoryId === category._id && (
                  <Check className="w-6 h-6 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryId: urlCategoryId } = useParams(); // Get category ID from URL params
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("Category");

  // Fetch all categories
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery({
    is_active: true,
    limit: 100,
  });

  const apiCategories = categoriesData?.data?.categories || [];

  // Set default category on mount or when categories load
  useEffect(() => {
    if (apiCategories.length > 0) {
      if (urlCategoryId) {
        // If URL has category ID, use it
        setSelectedCategoryId(urlCategoryId);
        const category = apiCategories.find((cat: any) => cat._id === urlCategoryId);
        if (category) {
          setSelectedCategoryName(category.category_name);
        }
      } else {
        // If no URL category ID, use first category as default
        const firstCategory = apiCategories[0];
        setSelectedCategoryId(firstCategory._id);
        setSelectedCategoryName(firstCategory.category_name);
        // Update URL without page reload
        navigate(`/category/${firstCategory._id}`, { replace: true });
      }
    }
  }, [apiCategories, urlCategoryId, navigate]);

  // Fetch videos by selected category
  const { data: videosData, isLoading: isVideosLoading } = useGetVideosByCategoryQuery(
    {
      category_id: selectedCategoryId,
      limit: 100,
    },
    {
      skip: !selectedCategoryId,
    }
  );

  const apiVideos = videosData?.data?.videos || [];

  // Helper function to get image URL
  const getImageUrl = (path?: string | null) => {
    if (!path) return "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=600&fit=crop&q=80";
    if (path.startsWith("http")) return path;
    return `${import.meta.env.VITE_BACKEND_URL}/${path}`;
  };

  const handleWorkoutClick = (workoutId: string) => {
    navigate(`/workout/${workoutId}`);
  };

  const handleCategorySelect = (categoryId: string, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    // Update URL
    navigate(`/category/${categoryId}`, { replace: true });
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden">
      <Navbar />

      {/* Category Selector Header - Fixed at top after navbar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-black">
        <div className="px-4 py-2 pb-3">
          <button
            onClick={() => setIsCategoryMenuOpen(true)}
            className="w-full text-left active:bg-gray-800/40 rounded-lg transition"
            disabled={isCategoriesLoading}
          >
            <span className="text-gray-400 text-sm">Category</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-white text-base font-medium">
                {isCategoriesLoading ? "Loading..." : selectedCategoryName}
              </span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Content - with top padding to account for fixed header */}
      <main className="px-4 pt-24">
        {isVideosLoading || isCategoriesLoading ? (
          <div className="text-center text-gray-400 py-10">Loading videos...</div>
        ) : apiVideos.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No videos found in this category</div>
        ) : (
          <div className="space-y-4">
            {apiVideos.map((video: any) => (
              <div
                key={video._id}
                onClick={() => handleWorkoutClick(video._id)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className="w-32 h-20 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                  <img
                    src={getImageUrl(video.thumbnail_url)}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-base font-medium truncate">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                    <span className="font-semibold text-green-400">
                      {video.fitness_type?.fitness_type_name || selectedCategoryName}
                    </span>
                    <span>•</span>
                    <span>{video.duration_minutes ? `${video.duration_minutes} min` : 'N/A'}</span>
                  </div>
                </div>

                {/* Play button */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/workout/${video._id}`);
                    }}
                    className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition"
                  >
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Category Selection Menu */}
      <CategoryMenu
        isOpen={isCategoryMenuOpen}
        onClose={() => setIsCategoryMenuOpen(false)}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleCategorySelect}
        categories={apiCategories}
      />
    </div>
  );
}