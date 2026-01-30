import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ChevronLeft,
  Heart,
  Download,
  Share2,
  Flag,
  Clock,
  Users,
  Calendar,
  Star,
  Check,
  Plus,
  X,
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { Navbar } from "@/components/navbar";

// Mock data for the workout
const mockWorkoutDetails = {
  id: 1,
  title: "30-MIN HIIT BURN",
  description: "Intense full-body HIIT session to torch calories and boost your metabolism. Join our expert trainers for this high-energy workout designed for all fitness levels.",
  thumbnail: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&h=800&fit=crop&q=80",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video
  category: "Cardio",
  duration: "30 min",
  difficulty: "Intermediate",
  calories: "320-400",
  rating: 4.8,
  trainer: "Alex Johnson",
  trainerBio: "Certified HIIT specialist with 8+ years experience",
  trainerAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&q=80",
  equipment: ["Mat", "Water Bottle"],
  tags: ["HIIT", "Fat Burning", "Full Body", "Cardio"],
  isFavorite: false,
  isInProgress: true,
  progress: 45,
  releaseDate: "2024-01-15",
  views: "125.4K"
};

const relatedWorkouts = [
  {
    id: 2,
    title: "QUICK HIIT",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "20 min",
    rating: 4.7,
  },
  {
    id: 3,
    title: "FULL BODY BURN",
    thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "30 min",
    rating: 4.9,
  },
  {
    id: 4,
    title: "POWER BOXING",
    thumbnail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=600&fit=crop&q=80",
    category: "Cardio",
    duration: "25 min",
    rating: 4.6,
  },
];

export default function WorkoutPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFavorite, setIsFavorite] = useState(mockWorkoutDetails.isFavorite);
  const [showDescription, setShowDescription] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!showControls) return;
    
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  // Video event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddToList = () => {
    // Add to list logic
    console.log("Added to list");
  };

  const handleDownload = () => {
    // Download logic
    console.log("Download initiated");
  };

  const handleShare = () => {
    // Share logic
    console.log("Sharing workout");
  };

  const handleReport = () => {
    // Report logic
    console.log("Report initiated");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Video Player Section */}
      <section className="relative pt-16 md:pt-20">
        {/* Video Container */}
        <div 
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-black cursor-pointer"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          onClick={handlePlayPause}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={mockWorkoutDetails.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Video Overlay Controls */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>

              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToList();
                  }}
                  className={`p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all ${
                    isFavorite ? 'text-red-500' : 'text-white'
                  }`}
                >
                  {isFavorite ? <Heart className="w-5 h-5 fill-current" /> : <Plus className="w-5 h-5" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause();
                  }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-transform hover:scale-105"
                >
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-black fill-black ml-2" />
                </button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-4">
              {/* Progress Bar */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkipBackward();
                    }}
                    className="hover:text-gray-300 transition-colors"
                  >
                    <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 md:w-10 md:h-10" />
                    ) : (
                      <Play className="w-8 h-8 md:w-10 md:h-10" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkipForward();
                    }}
                    className="hover:text-gray-300 transition-colors"
                  >
                    <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted;
                        }
                      }}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Playback Speed */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => {
                      const speed = parseFloat(e.target.value);
                      setPlaybackSpeed(speed);
                      if (videoRef.current) {
                        videoRef.current.playbackRate = speed;
                      }
                    }}
                    className="bg-black/50 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">Normal</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFullscreen();
                    }}
                    className="hover:text-gray-300 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Details Section */}
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8 lg:py-12">
          {/* Title and Info */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
              <span className="px-3 py-1 bg-red-600 text-white text-xs md:text-sm font-bold uppercase tracking-wider rounded">
                {mockWorkoutDetails.category}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{mockWorkoutDetails.duration}</span>
              <span className="text-gray-300">•</span>
              <span className="text-yellow-400 flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                {mockWorkoutDetails.rating}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300">{mockWorkoutDetails.difficulty}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {mockWorkoutDetails.title}
            </h1>

            <div className="flex items-center flex-wrap gap-4 md:gap-6">
              <button
                onClick={handlePlayPause}
                className="flex items-center gap-2 md:gap-3 bg-white hover:bg-gray-200 active:scale-95 text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all text-sm md:text-base"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 md:w-6 md:h-6 fill-black" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
                    <span>Resume</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all text-sm md:text-base font-bold ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {isFavorite ? (
                  <>
                    <Check className="w-5 h-5 md:w-6 md:h-6" />
                    <span>In My List</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                    <span>My List</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 md:gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all text-sm md:text-base font-bold"
              >
                <Download className="w-5 h-5 md:w-6 md:h-6" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Description and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed">
                  {showDescription
                    ? mockWorkoutDetails.description
                    : `${mockWorkoutDetails.description.substring(0, 200)}...`}
                </p>
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-red-500 hover:text-red-400 font-medium mt-2"
                >
                  {showDescription ? 'Show Less' : 'Read More'}
                </button>
              </div>

              {/* Trainer Info */}
              <div className="bg-gray-900/50 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4">About the Trainer</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={mockWorkoutDetails.trainerAvatar}
                    alt={mockWorkoutDetails.trainer}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-bold">{mockWorkoutDetails.trainer}</h4>
                    <p className="text-gray-400 mb-3">{mockWorkoutDetails.trainerBio}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {mockWorkoutDetails.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Released {mockWorkoutDetails.releaseDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats and Tags */}
            <div className="space-y-6">
              {/* Workout Stats */}
              <div className="bg-gray-900/50 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4">Workout Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-bold">{mockWorkoutDetails.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Difficulty</span>
                    <span className="font-bold">{mockWorkoutDetails.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Calories Burn</span>
                    <span className="font-bold">{mockWorkoutDetails.calories}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      {mockWorkoutDetails.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Equipment Needed */}
              <div className="bg-gray-900/50 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4">Equipment Needed</h3>
                <div className="flex flex-wrap gap-2">
                  {mockWorkoutDetails.equipment.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-800 rounded-full text-sm flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-900/50 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {mockWorkoutDetails.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className={`p-3 rounded-full ${isFavorite ? 'bg-red-600/20' : 'bg-gray-800'}`}>
                {isFavorite ? (
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                ) : (
                  <Heart className="w-6 h-6" />
                )}
              </div>
              <span className="text-sm font-medium">My List</span>
            </button>

            <button
              onClick={() => console.log("Rate")}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="p-3 rounded-full bg-gray-800">
                <Star className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Rate</span>
            </button>

            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="p-3 rounded-full bg-gray-800">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Share</span>
            </button>

            <button
              onClick={handleReport}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="p-3 rounded-full bg-gray-800">
                <Flag className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Report</span>
            </button>
          </div>
        </div>
      </section>

      {/* Related Workouts */}
      <section className="px-4 md:px-8 lg:px-12 xl:px-16 pb-12 md:pb-16 lg:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">More Like This</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {relatedWorkouts.map((workout) => (
            <Link
              key={workout.id}
              to={`/workout/${workout.id}`}
              className="group cursor-pointer"
            >
              <div className="relative h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-gray-800">
                <img
                  src={workout.thumbnail}
                  alt={workout.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-1">
                    {workout.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-300">
                    <span>{workout.category}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {workout.rating}
                    </span>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}