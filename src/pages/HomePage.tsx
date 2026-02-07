import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockWorkouts: any[] = [
  {
    id: 1,
    title: "HIIT CARDIO BLAST",
    thumbnail: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "30 min",
    rating: "10",
    badge: "Recently added"
  },
  {
    id: 2,
    title: "CORE STRENGTH",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop&q=80",
    category: "Core",
    duration: "20 min",
    rating: "10"
  },
  {
    id: 3,
    title: "YOGA FLOW",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=600&fit=crop&q=80",
    category: "Yoga",
    duration: "25 min",
    rating: "10",
    badge: "Recently added"
  },
  {
    id: 4,
    title: "UPPER BODY",
    thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=600&fit=crop&q=80",
    category: "Strength",
    duration: "35 min",
    rating: "10"
  },
  {
    id: 5,
    title: "QUICK BURN",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "15 min",
    rating: "10"
  },
  {
    id: 6,
    title: "FULL BODY",
    thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=600&fit=crop&q=80",
    category: "Strength",
    duration: "40 min",
    rating: "10",
    badge: "Recently added"
  },
  {
    id: 7,
    title: "PILATES",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop&q=80",
    category: "Pilates",
    duration: "30 min",
    rating: "10"
  },
  {
    id: 8,
    title: "LEG DAY",
    thumbnail: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=600&fit=crop&q=80",
    category: "Strength",
    duration: "45 min",
    rating: "10"
  },
];

const mockPrograms: any[] = [
  {
    id: 101,
    title: "30-DAY TRANSFORMATION",
    thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=600&fit=crop&q=80",
    category: "Program",
    duration: "30 days",
    rating: "10",
    badge: "Popular"
  },
  {
    id: 102,
    title: "BEGINNER'S BOOTCAMP",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop&q=80",
    category: "Program",
    duration: "21 days",
    rating: "10"
  },
  {
    id: 103,
    title: "MUSCLE BUILDING SERIES",
    thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=600&fit=crop&q=80",
    category: "Program",
    duration: "60 days",
    rating: "10",
    badge: "Popular"
  },
  {
    id: 104,
    title: "FLEXIBILITY CHALLENGE",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=600&fit=crop&q=80",
    category: "Program",
    duration: "14 days",
    rating: "10"
  },
  {
    id: 105,
    title: "CARDIO ENDURANCE",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    category: "Program",
    duration: "45 days",
    rating: "10"
  },
];

function WorkoutCard({ workout, showTopBadge = false }: any) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/workout/${workout.id}`);
  };

  return (
    <div className="relative flex-shrink-0 w-[110px] cursor-pointer" onClick={handleClick}>
      {showTopBadge && (
        <div className="absolute top-0 left-0 z-10 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
          TOP<br/>10
        </div>
      )}
      
      <div className="relative h-[160px] rounded-sm overflow-hidden bg-gray-800">
        <img
          src={workout.thumbnail}
          alt={workout.title}
          className="w-full h-full object-cover"
        />
        
        {workout.badge && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 text-center">
            {workout.badge}
          </div>
        )}
      </div>
      
      <div className="mt-1">
        <h3 className="text-white text-xs font-medium line-clamp-2">
          {workout.title}
        </h3>
      </div>
    </div>
  );
}

function WorkoutRow({ title, workouts, showTopBadgeOnFirst2 = false }: any) {
  const rowRef = useRef(null);

  return (
    <div className="mb-6 pb-6 ">
      <h2 className="text-white text-base font-bold mb-2 px-4">
        {title}
      </h2>
      
      <div
        ref={rowRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {workouts.map((workout: any, index: number) => (
          <WorkoutCard 
            key={workout.id} 
            workout={workout} 
            showTopBadge={showTopBadgeOnFirst2 && index < 2}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryPills({ categories }: any) {
  const navigate = useNavigate();
  
  const handleCategoryClick = () => {
    navigate('/category/all');
  };
  
  return (
    <div className="px-4 mb-4">
      <h2 className="text-white text-base font-bold mb-3">
        Recommended for New Members
      </h2>
      
      <div className="grid grid-cols-2 gap-2 mb-2">
        {categories.slice(0, 4).map((category: any) => (
          <div
            key={category.id}
            onClick={handleCategoryClick}
            className={`h-20 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center cursor-pointer`}
          >
            <h3 className="text-white text-sm font-bold text-center px-2">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {categories.slice(4, 6).map((category: any) => (
          <div
            key={category.id}
            onClick={handleCategoryClick}
            className={`h-20 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center cursor-pointer`}
          >
            <h3 className="text-white text-sm font-bold text-center px-2">
              {category.name}
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
    navigate(`/category/all`);
    onClose();
  };

  return (
    <>
      {/* Semi-transparent Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown Menu */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex flex-col">
        <div className="flex-1 overflow-y-auto bg-black/95 backdrop-blur-sm">
          <div className="pt-16 pb-4 px-6">
            {/* Category List */}
            <div className="space-y-1 max-w-md mx-auto">
              {categories.map((category: any) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-center py-4 cursor-pointer hover:bg-white/5 transition-colors rounded-lg"
                >
                  <h3 className="text-white text-lg font-normal">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Close Button at Bottom */}
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

  const categories: any[] = [
    { id: "hiit", name: "HIIT Workouts", color: "from-orange-600 to-red-700" },
    { id: "strength", name: "Strength Training", color: "from-purple-600 to-purple-900" },
    { id: "yoga", name: "Yoga & Flexibility", color: "from-pink-600 to-pink-800" },
    { id: "cardio", name: "Cardio Sessions", color: "from-blue-600 to-blue-900" },
    { id: "core", name: "Core Workouts", color: "from-teal-500 to-teal-700" },
    { id: "pilates", name: "Pilates", color: "from-indigo-600 to-indigo-900" },
    { id: "dance", name: "Dance Fitness", color: "from-pink-500 to-rose-700" },
    { id: "boxing", name: "Boxing & Combat", color: "from-red-600 to-orange-700" },
    { id: "cycling", name: "Cycling & Spin", color: "from-yellow-600 to-orange-600" },
    { id: "running", name: "Running & Track", color: "from-green-600 to-teal-700" },
    { id: "meditation", name: "Meditation & Mindfulness", color: "from-purple-500 to-indigo-700" },
    { id: "stretching", name: "Stretching & Recovery", color: "from-blue-500 to-cyan-700" },
    { id: "crossfit", name: "CrossFit Training", color: "from-gray-700 to-gray-900" },
    { id: "bodyweight", name: "Bodyweight Training", color: "from-amber-600 to-orange-800" },
    { id: "mobility", name: "Mobility & Balance", color: "from-emerald-600 to-green-800" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show pills when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        // Scrolling up - show pills
        setShowPills(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide pills
        setShowPills(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const heroWorkout: any = {
    id: 1, // Added id for navigation
    title: "CROSSFIT BURN",
    thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=1200&fit=crop&q=80",
    tags: ["High-Intensity", "Fat-Burning", "Full-Body", "Fast-Paced"],
  };

  const heroProgram: any = {
    id: 101, // Added id for navigation
    title: "30-DAY CHALLENGE",
    thumbnail: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=1200&fit=crop&q=80",
    tags: ["Transformation", "Full-Body", "Beginner-Friendly", "Results-Driven"],
  };

  const handleHeroPlayClick = () => {
    const heroId = selectedCategory === "Programs" ? heroProgram.id : heroWorkout.id;
    navigate(`/workout/${heroId}`);
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
        categories={categories}
        isOpen={isCategoryDropdownOpen}
        onClose={() => setIsCategoryDropdownOpen(false)}
      />

      {/* Filter Pills - Shows/Hides on scroll */}
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
          <button
            onClick={() => setSelectedCategory("Programs")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "Programs"
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Programs
          </button>
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
              src={selectedCategory === "Programs" ? heroProgram.thumbnail : heroWorkout.thumbnail}
              alt="Hero workout"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <h1 className="text-4xl font-black text-white mb-2">
              {selectedCategory === "Programs" ? heroProgram.title : heroWorkout.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-300">
              {(selectedCategory === "Programs" ? heroProgram.tags : heroWorkout.tags).map((tag: string, index: number) => (
                <span key={tag}>
                  {tag}
                  {index < (selectedCategory === "Programs" ? heroProgram.tags : heroWorkout.tags).length - 1 && <span className="mx-1">•</span>}
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
              <button className="flex-1 bg-gray-600/80 backdrop-blur-sm text-white font-bold py-2.5 rounded-md flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                My List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Section */}
      <CategoryPills categories={categories} />

      {/* Content Rows - Changes based on selected category */}
      <div className="pb-8">
        {selectedCategory === "Workouts" && (
          <>
            <WorkoutRow 
              title="New on FitnessPro" 
              workouts={mockWorkouts.slice(0, 6)} 
              showTopBadgeOnFirst2={true}
            />
            
            <WorkoutRow 
              title="Today's Top Picks for You" 
              workouts={mockWorkouts} 
              showTopBadgeOnFirst2={true}
            />
            
            <WorkoutRow 
              title="HIIT Workouts" 
              workouts={mockWorkouts.slice(0, 5)} 
              showTopBadgeOnFirst2={true}
            />
            
            <WorkoutRow 
              title="Strength Training" 
              workouts={mockWorkouts.slice(2, 8)} 
              showTopBadgeOnFirst2={true}
            />
          </>
        )}

        {selectedCategory === "Programs" && (
          <>
            <WorkoutRow 
              title="Popular Programs" 
              workouts={mockPrograms} 
              showTopBadgeOnFirst2={true}
            />
            
            <WorkoutRow 
              title="Beginner Programs" 
              workouts={mockPrograms.slice(0, 4)} 
              showTopBadgeOnFirst2={true}
            />
            
            <WorkoutRow 
              title="Advanced Training" 
              workouts={mockPrograms.slice(1, 5)} 
              showTopBadgeOnFirst2={true}
            />
            
            <WorkoutRow 
              title="Quick Challenges" 
              workouts={mockPrograms.slice(2, 5)} 
              showTopBadgeOnFirst2={true}
            />
          </>
        )}
      </div>
    </div>
  );
}