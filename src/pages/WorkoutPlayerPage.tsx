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
  MoreVertical,
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Mock data for the workout
const mockWorkoutDetails = {
  id: 1,
  title: "30-MIN HIIT BURN",
  description: "Intense full-body HIIT session to torch calories and boost your metabolism. Join our expert trainers for this high-energy workout designed for all fitness levels.",
  thumbnail: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&h=800&fit=crop&q=80",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
  const videoRef = useRef<any>(null);
  
  const [isPlaying, setIsPlaying] = useState<any>(false);
  const [currentTime, setCurrentTime] = useState<any>(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFavorite, setIsFavorite] = useState(mockWorkoutDetails.isFavorite);
  const [showDescription, setShowDescription] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Auto-hide controls after inactivity (only when playing)
  useEffect(() => {
    if (!showControls || !isPlaying) return;
    
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e:any) => {
      if (showMoreMenu) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMoreMenu]);

  // Video event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowThumbnail(false);
      }
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

  const handleSeek = (e:any) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e:any) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
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

  const formatTime = (seconds:any) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddToList = () => {
    setIsFavorite(!isFavorite);
  };

  const handleDownload = () => {
    console.log("Download initiated");
  };

  const handleShare = () => {
    console.log("Sharing workout");
  };

  const handleReport = () => {
    console.log("Report initiated");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Player Section */}
      <section className="relative">
        {/* Video Container */}
        <div 
          className="relative w-full aspect-video md:h-[70vh] lg:h-[80vh] bg-black"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          onClick={(e) => {
            // Only toggle if clicking on the video container itself, not on controls
            if (e.target === e.currentTarget || e.target.tagName === 'VIDEO') {
              handlePlayPause();
            }
          }}
        >
          {/* Thumbnail Overlay */}
          {showThumbnail && !isPlaying && (
            <div className="absolute inset-0 z-10">
              <img
                src={mockWorkoutDetails.thumbnail}
                alt={mockWorkoutDetails.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            src={mockWorkoutDetails.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            poster={mockWorkoutDetails.thumbnail}
          />

          {/* Video Overlay Controls */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ pointerEvents: showControls || !isPlaying ? 'auto' : 'none' }}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex items-center justify-between z-20">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 sm:gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full transition-all"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Back</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreMenu(!showMoreMenu);
                  }}
                  className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all relative"
                >
                  <MoreVertical className="w-5 h-5" />
                  
                  {/* Dropdown Menu */}
                  {showMoreMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden z-30">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToList();
                          setShowMoreMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left"
                      >
                        {isFavorite ? (
                          <>
                            <Check className="w-5 h-5 text-red-500" />
                            <span>Remove from List</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5" />
                            <span>Add to My List</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload();
                          setShowMoreMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left border-t border-gray-800"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare();
                          setShowMoreMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left border-t border-gray-800"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReport();
                          setShowMoreMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left border-t border-gray-800"
                      >
                        <Flag className="w-5 h-5" />
                        <span>Report Issue</span>
                      </button>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Center Play/Pause Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause();
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-2xl"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black fill-black ml-1.5" />
                </button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
              {/* Control Buttons Row */}
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkipBackward();
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkipForward();
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
                  </button>

                  {/* Volume Control - Visible on larger screens */}
                  <div className="hidden lg:flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                        if (videoRef.current) {
                          videoRef.current.muted = !isMuted;
                        }
                      }}
                      className="hover:scale-110 transition-transform"
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
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Time Display */}
                  <div className="text-xs sm:text-sm font-medium">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Volume Control for Mobile */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                      }
                    }}
                    className="lg:hidden hover:scale-110 transition-transform"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>

                  {/* Speed Dropdown for Mobile */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => {
                      const speed = parseFloat(e.target.value);
                      setPlaybackSpeed(speed);
                      if (videoRef.current) {
                        videoRef.current.playbackRate = speed;
                      }
                    }}
                    className="lg:hidden bg-black/60 backdrop-blur-sm border border-gray-600 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-600 min-w-[60px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>

                  {/* Playback Speed - Visible on larger screens */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => {
                      const speed = parseFloat(e.target.value);
                      setPlaybackSpeed(speed);
                      if (videoRef.current) {
                        videoRef.current.playbackRate = speed;
                      }
                    }}
                    className="hidden lg:block bg-black/60 backdrop-blur-sm border border-gray-600 rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFullscreen();
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Bar - Below Controls */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 sm:h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 sm:[&::-webkit-slider-thumb]:h-4 sm:[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  style={{
                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Workout Details Section */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8 lg:py-12">
          {/* Title and Info */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 sm:mb-4">
              <span className="px-2.5 sm:px-3 py-1 bg-red-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded">
                {mockWorkoutDetails.category}
              </span>
              <span className="text-gray-300 text-sm sm:text-base">•</span>
              <span className="text-gray-300 text-sm sm:text-base">{mockWorkoutDetails.duration}</span>
              <span className="text-gray-300 text-sm sm:text-base">•</span>
              <span className="text-yellow-400 flex items-center gap-1 text-sm sm:text-base">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                {mockWorkoutDetails.rating}
              </span>
              <span className="text-gray-300 text-sm sm:text-base hidden sm:inline">•</span>
              <span className="text-gray-300 text-sm sm:text-base hidden sm:inline">{mockWorkoutDetails.difficulty}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {mockWorkoutDetails.title}
            </h1>

            <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 md:gap-4">
              <button
                onClick={handlePlayPause}
                className="flex items-center gap-2 bg-white hover:bg-gray-200 active:scale-95 text-black font-bold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg transition-all text-sm sm:text-base"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-black" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-black" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg transition-all text-sm sm:text-base font-bold ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {isFavorite ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="hidden sm:inline">In My List</span>
                    <span className="sm:hidden">Saved</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="hidden sm:inline">My List</span>
                    <span className="sm:hidden">Save</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg transition-all text-sm sm:text-base font-bold"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="hidden md:inline">Download</span>
              </button>
            </div>
          </div>

          {/* Description and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {showDescription
                    ? mockWorkoutDetails.description
                    : `${mockWorkoutDetails.description.substring(0, 150)}...`}
                </p>
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="text-red-500 hover:text-red-400 font-medium mt-2 text-sm sm:text-base"
                >
                  {showDescription ? 'Show Less' : 'Read More'}
                </button>
              </div>

              {/* Trainer Info */}
              <div className="bg-gray-900/50 rounded-xl p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4">About the Trainer</h3>
                <div className="flex items-start gap-3 sm:gap-4">
                  <img
                    src={mockWorkoutDetails.trainerAvatar}
                    alt={mockWorkoutDetails.trainer}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-bold">{mockWorkoutDetails.trainer}</h4>
                    <p className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">{mockWorkoutDetails.trainerBio}</p>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {mockWorkoutDetails.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {mockWorkoutDetails.releaseDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats and Tags */}
            <div className="space-y-4 sm:space-y-6">
              {/* Workout Stats */}
              <div className="bg-gray-900/50 rounded-xl p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4">Workout Details</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-bold">{mockWorkoutDetails.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Difficulty</span>
                    <span className="font-bold">{mockWorkoutDetails.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Calories</span>
                    <span className="font-bold">{mockWorkoutDetails.calories}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Rating</span>
                    <span className="font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      {mockWorkoutDetails.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Equipment Needed */}
              <div className="bg-gray-900/50 rounded-xl p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4">Equipment</h3>
                <div className="flex flex-wrap gap-2">
                  {mockWorkoutDetails.equipment.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-800 rounded-full text-xs sm:text-sm flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-900/50 rounded-xl p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {mockWorkoutDetails.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-full text-xs sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className={`p-2.5 sm:p-3 rounded-full ${isFavorite ? 'bg-red-600/20' : 'bg-gray-800'}`}>
                {isFavorite ? (
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-current" />
                ) : (
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium">My List</span>
            </button>

            <button
              onClick={() => console.log("Rate")}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="p-2.5 sm:p-3 rounded-full bg-gray-800">
                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Rate</span>
            </button>

            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="p-2.5 sm:p-3 rounded-full bg-gray-800">
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Share</span>
            </button>

            <button
              onClick={handleReport}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="p-2.5 sm:p-3 rounded-full bg-gray-800">
                <Flag className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs sm:text-sm font-medium">Report</span>
            </button>
          </div>
        </div>
      </section>

      {/* Related Workouts */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-12 md:pb-16 lg:pb-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">More Like This</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {relatedWorkouts.map((workout) => (
            <Link
              key={workout.id}
              to={`/workout/${workout.id}`}
              className="group cursor-pointer"
            >
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden bg-gray-800">
                <img
                  src={workout.thumbnail}
                  alt={workout.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-bold text-xs sm:text-sm md:text-base mb-1 line-clamp-1">
                    {workout.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300">
                    <span>{workout.category}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {workout.rating}
                    </span>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
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