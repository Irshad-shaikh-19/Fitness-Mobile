import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useNavigate } from "react-router-dom";


const mockWorkouts: any[] = [
  {
    id: 1,
    title: "30-MIN HIIT BURN",
    thumbnail: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "30 min",
    isPopular: true,
    progress: 45,
  },
  {
    id: 2,
    title: "CORE BLAST",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop&q=80",
    category: "Core",
    duration: "15 min",
    isPopular: false,
    progress: 60,
  },
  {
    id: 3,
    title: "MORNING YOGA FLOW",
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=600&fit=crop&q=80",
    category: "Yoga",
    duration: "25 min",
    isPopular: false,
    progress: 30,
  },
  {
    id: 4,
    title: "UPPER BODY STRENGTH",
    thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=600&fit=crop&q=80",
    category: "Strength",
    duration: "45 min",
    isPopular: false,
  },
  {
    id: 5,
    title: "QUICK HIIT",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "20 min",
    isPopular: false,
  },
  {
    id: 6,
    title: "FULL BODY BURN",
    thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "30 min",
    isPopular: true,
  },
  {
    id: 7,
    title: "PILATES POWER",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop&q=80",
    category: "Pilates",
    duration: "35 min",
    isPopular: true,
  },
  {
    id: 8,
    title: "LEGS & GLUTES",
    thumbnail: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=600&fit=crop&q=80",
    category: "Strength",
    duration: "40 min",
    isPopular: false,
  },
  {
    id: 9,
    title: "POWER BOXING",
    thumbnail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "25 min",
    isPopular: true,
  },
  {
    id: 10,
    title: "STRETCH & RECOVERY",
    thumbnail: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=600&fit=crop&q=80",
    category: "Recovery",
    duration: "20 min",
    isPopular: false,
  },
];

const categories: any[] = [
  { id: "chest", name: "Chest", color: "from-gray-700 to-gray-900" },
  { id: "fullbody", name: "Full Body", color: "from-orange-600 to-red-700" },
  { id: "core", name: "Core", color: "from-indigo-600 to-indigo-900" },
  { id: "arms", name: "Arms", color: "from-slate-600 to-slate-900" },
  { id: "yoga", name: "Yoga", color: "from-cyan-500 to-cyan-700" },
  { id: "cardio", name: "Cardio", color: "from-red-600 to-pink-700" },
];

function WorkoutCard({ workout, showProgress, size = "normal", rank }: any) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  
  const getCardDimensions = () => {
    switch(size) {
      case "large":
        return {
          width: "w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px]",
          height: "h-[400px] sm:h-[450px] md:h-[480px] lg:h-[500px]",
          titleSize: "text-sm md:text-base",
          infoSize: "text-xs md:text-sm"
        };
      case "top10":
        return {
          width: "w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]",
          height: "h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px]",
          titleSize: "text-xs md:text-sm",
          infoSize: "text-[10px] md:text-xs"
        };
      default:
        return {
          width: "w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]",
          height: "h-[165px] sm:h-[185px] md:h-[210px] lg:h-[230px]",
          titleSize: "text-xs md:text-sm",
          infoSize: "text-[10px] md:text-xs"
        };
    }
  };


   const handleClick = () => {
    navigate(`/workout/${workout.id}`);
  };

  const dimensions = getCardDimensions();
  
  return (
    <div className={`relative flex-shrink-0 group cursor-pointer ${dimensions.width}`}  onClick={handleClick}>
      {rank && (
        <div className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20">
          <div className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-black leading-none stroke-text">
            {rank}
          </div>
        </div>
      )}
      
      <div className={`relative ${dimensions.height} rounded-md overflow-hidden bg-gray-800 transition-all duration-300 
        active:scale-95 sm:group-hover:scale-105 sm:group-hover:shadow-2xl sm:group-hover:z-10`}>
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 animate-pulse" />
        )}
        
        <img
          src={workout.thumbnail}
          alt={workout.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:transform md:translate-y-full md:group-hover:translate-y-0 md:transition-transform md:duration-300 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
          <h3 className={`text-white font-bold mb-1 line-clamp-2 ${dimensions.titleSize}`}>
            {workout.title}
          </h3>
          <div className={`flex items-center gap-1.5 sm:gap-2 text-gray-300 ${dimensions.infoSize}`}>
            <span className="font-semibold text-green-400">{workout.category}</span>
            <span>•</span>
            <span>{workout.duration}</span>
          </div>
        </div>
        
        {showProgress && workout.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 md:h-2 bg-gray-700">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${workout.progress}%` }}
            />
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-6 h-6 md:w-7 md:h-7 text-black fill-black ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkoutRow({ title, workouts, showProgress, type = "normal" }: any) {
  const rowRef = useRef(null);
  
  const scroll = (direction: any) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      (rowRef.current as any).scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-8 md:mb-12 lg:mb-16">
      <h2 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 px-4 md:px-6 lg:px-8">
        {title}
      </h2>
      
      <div className="relative group/row">
        <button 
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-0 bottom-0 z-30 w-12 lg:w-16 bg-gradient-to-r from-black/80 via-black/60 to-transparent items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
        </button>
        
        <div
          ref={rowRef}
          className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-6 lg:px-8 pb-4 md:pb-6"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {workouts.map((workout: any, index: any) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              showProgress={showProgress}
              size={type === "large" ? "large" : type === "top10" ? "top10" : "normal"}
              rank={type === "top10" ? index + 1 : null}
            />
          ))}
        </div>
        
        <button 
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-0 bottom-0 z-30 w-12 lg:w-16 bg-gradient-to-l from-black/80 via-black/60 to-transparent items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
        </button>
      </div>
    </div>
  );
}

function CategoryGrid({ categories }: any) {
  return (
    <div className="px-4 mb-6">
      <h2 className="text-white text-base md:text-lg font-bold mb-3">
        Browse by Category
      </h2>

      <div
        className="
          flex gap-3
          overflow-x-auto md:overflow-visible
          scrollbar-hide
        "
      >
        {categories.map((category: any) => (
          <div
            key={category.id}
            className={`
              relative
              min-w-[160px] sm:min-w-[180px]
              md:flex-1 md:min-w-0
              h-20 sm:h-24 md:h-28 lg:h-32
              rounded-lg
              bg-gradient-to-br ${category.color}
              overflow-hidden cursor-pointer group
              transition-transform active:scale-95 hover:scale-[1.02]
            `}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

            <div className="relative h-full flex items-center justify-center px-3">
              <h3 className="
                text-white text-sm sm:text-base md:text-lg lg:text-xl
                font-extrabold uppercase tracking-wide text-center
              ">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




export default function FitnessHomePage() {
  const continueWorkouts: any[] = mockWorkouts.slice(0, 3).filter((w: any) => w.progress);
  const popularWorkouts: any[] = mockWorkouts.filter((w: any) => w.isPopular);
  const topWorkouts: any[] = mockWorkouts.slice(0, 10);
  const recommendedWorkouts: any[] = mockWorkouts;
  const heroWorkout: any = mockWorkouts[0];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden ">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .stroke-text {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
          text-stroke: 2px rgba(255, 255, 255, 0.2);
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Navbar Component */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] w-full mb-4 md:mb-6 lg:mb-8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&h=800&fit=crop&q=80"
            alt="Hero workout"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="relative h-full flex items-end md:items-center px-4 md:px-8 lg:px-12 xl:px-16 pb-16 md:pb-8 lg:pb-12">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl space-y-3 md:space-y-4 lg:space-y-6 animate-fadeInUp">
            <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-red-600 text-white text-xs md:text-sm font-bold uppercase tracking-wider rounded">
              Featured
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-none">
              {heroWorkout.title}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl">
              Intense full-body HIIT session to torch calories and boost your metabolism. 
              Join our expert trainers for this high-energy workout.
            </p>
            <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-300">
              <span className="font-bold text-green-400">{heroWorkout.category}</span>
              <span>•</span>
              <span>{heroWorkout.duration}</span>
              <span>•</span>
              <span className="text-yellow-400">★ 4.8</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
              <button className="flex items-center gap-2 md:gap-3 bg-white hover:bg-gray-200 active:scale-95 text-black font-bold px-5 md:px-8 lg:px-10 py-3 md:py-4 rounded-lg transition-all text-sm md:text-base lg:text-lg">
                <Play className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 fill-black" />
                <span>Play Now</span>
              </button>
              <button className="flex items-center gap-2 md:gap-3 bg-gray-600/60 hover:bg-gray-600/80 active:scale-95 backdrop-blur-sm text-white font-bold px-5 md:px-8 lg:px-10 py-3 md:py-4 rounded-lg transition-all text-sm md:text-base lg:text-lg">
                <Plus className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                <span>Add to My List</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rows */}
      <div className="relative z-20 pb-4 md:pb-8">
        <WorkoutRow
          title="Continue Your Journey"
          workouts={continueWorkouts}
          showProgress={true}
          type="large"
        />
        
        {/* <WorkoutRow
          title="Top 10 Workouts Today"
          workouts={topWorkouts}
          type="top10"
        /> */}
        
        <WorkoutRow
          title="Popular This Week"
          workouts={popularWorkouts}
        />
        
        <WorkoutRow
          title="Recommended For You"
          workouts={recommendedWorkouts}
        />
        
        <CategoryGrid categories={categories} />
        
        <WorkoutRow
          title="New Releases"
          workouts={mockWorkouts.slice(0, 6)}
        />
      </div>

    </div>
  );
}