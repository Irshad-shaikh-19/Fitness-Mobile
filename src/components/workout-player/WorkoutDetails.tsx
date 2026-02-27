import { useState } from "react";
import { Play, Pause, Plus, Check, Download, Heart, Share2, Flag, Users, Calendar, CheckCheck } from "lucide-react";
import { Video } from "../../store/api/pages/videoApi";
import { useStartDownloadMutation } from "../../store/api/pages/videoDownloadApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetMyDownloadsQuery } from "../../store/api/pages/videoDownloadApi";

interface Props {
  video: Video;
  difficultyName: string | null;
  fitnessTypeName: string | null;
  categoryName: string | null;
  languageDisplayName: string | null;
  trainerName: string | null;
  trainerAvatar: string | null;
  trainerBio: string | null;
  equipmentList: string[];
  isPlaying: boolean;
  isInMyList: boolean;
  isMyListLoading: boolean;
  showDescription: boolean;
  onPlayPause: () => void;
  onMyListToggle: () => void;
  onToggleDescription: () => void;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm sm:text-base">
      <span className="text-gray-400">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900/50 rounded-xl p-4 sm:p-5 md:p-6">
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ActionIconButton({
  icon: Icon,
  label,
  onClick,
  iconClass = "",
  active = false,
  disabled = false,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  iconClass?: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
    >
      <div className={`p-2.5 sm:p-3 rounded-full ${active ? "bg-red-600/20" : "bg-gray-800"}`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconClass}`} />
      </div>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </button>
  );
}

const swalTheme = {
  background: "#1a1a1a",
  color: "#ffffff",
  confirmButtonColor: "#dc2626",
  cancelButtonColor: "#4b5563",
};

export default function WorkoutDetails({
  video,
  difficultyName,
  fitnessTypeName,
  categoryName,
  languageDisplayName,
  trainerName,
  trainerAvatar,
  trainerBio,
  equipmentList,
  isPlaying,
  isInMyList,
  isMyListLoading,
  showDescription,
  onPlayPause,
  onMyListToggle,
  onToggleDescription,
}: Props) {
  const navigate = useNavigate();
  const [startDownload, { isLoading: isDownloading }] = useStartDownloadMutation();
  const [copied, setCopied] = useState(false);

  const isLoggedIn = !!localStorage.getItem("fitnessFlicksToken");

  const { data: downloadsData } = useGetMyDownloadsQuery();
  const isAlreadyDownloaded = downloadsData?.data?.downloads?.some(
    (d) => d.video_id?._id === video._id && d.status === "completed"
  );

  const handleDownload = async () => {
    if (!isLoggedIn) {
      const result = await Swal.fire({
        title: "Login Required",
        text: "Please log in to download videos.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        ...swalTheme,
      });
      if (result.isConfirmed) navigate("/login");
      return;
    }

    try {
      await startDownload({ video_id: video._id, quality: "720p" }).unwrap();
      navigate("/downloads");
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to start download. Please try again.",
        icon: "error",
        ...swalTheme,
      });
    }
  };

  // ── Real share — OS share sheet on mobile, clipboard copy on desktop ─────
  const handleShare = async () => {
    const shareData = {
      title: video.title || "Watch this workout",
      text: `Check out "${video.title || "this workout"}"`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData); return; } catch (_) {}
    }

    // Desktop fallback: copy URL
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (_) {
      const el = document.createElement("input");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8 lg:py-12">
      {/* Meta pills + title + action buttons */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 sm:mb-4 text-gray-300 text-sm sm:text-base">
          {video.duration_minutes && (
            <>
              <span>{video.duration_minutes} min</span>
              <span>•</span>
            </>
          )}
          {difficultyName && <span>{difficultyName}</span>}
          {languageDisplayName && (
            <>
              <span>•</span>
              <span>{languageDisplayName}</span>
            </>
          )}
          {video.is_paid !== undefined && (
            <>
              <span>•</span>
              <span
                className={`px-2.5 py-1 text-white text-xs font-bold uppercase rounded ${
                  video.is_paid ? "bg-yellow-600" : "bg-green-600"
                }`}
              >
                {video.is_paid ? "Premium" : "Free"}
              </span>
            </>
          )}
        </div>

        {video.title && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {video.title}
          </h1>
        )}

        {/* Action Buttons Row */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 md:gap-4">
          {/* Play / Pause */}
          <button
            onClick={onPlayPause}
            className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-bold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg transition-all text-sm sm:text-base"
          >
            {isPlaying ? (
              <><Pause className="w-5 h-5 fill-black" /><span>Pause</span></>
            ) : (
              <><Play className="w-5 h-5 fill-black" /><span>Play</span></>
            )}
          </button>

          {/* My List */}
          <button
            onClick={onMyListToggle}
            disabled={isMyListLoading}
            className={`flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base disabled:opacity-60 transition-all ${
              isInMyList
                ? "bg-white/20 border border-white text-white"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            {isInMyList ? (
              <><Check className="w-5 h-5 text-green-400" /><span>In My List</span></>
            ) : (
              <><Plus className="w-5 h-5" /><span>My List</span></>
            )}
          </button>

          {/* Download */}
          {isAlreadyDownloaded ? (
            <button
              onClick={() => navigate("/downloads")}
              className="flex items-center gap-2 bg-green-800/40 border border-green-600 text-green-400 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all"
            >
              <Check className="w-5 h-5" />
              <span className="hidden md:inline">Downloaded</span>
            </button>
          ) : (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-60 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg font-bold text-sm sm:text-base transition-all"
            >
              <Download className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`} />
              <span className="hidden md:inline">
                {isDownloading ? "Starting..." : "Download"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {video.description && (
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {showDescription || video.description.length <= 150
                  ? video.description
                  : `${video.description.substring(0, 150)}...`}
              </p>
              {video.description.length > 150 && (
                <button
                  onClick={onToggleDescription}
                  className="text-red-500 hover:text-red-400 font-medium mt-2 text-sm"
                >
                  {showDescription ? "Show Less" : "Read More"}
                </button>
              )}
            </div>
          )}

          {fitnessTypeName && (
            <Card title="Fitness Type">
              <p className="text-gray-400 text-sm sm:text-base">{fitnessTypeName}</p>
            </Card>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4 sm:space-y-6">
          <Card title="Workout Details">
            <div className="space-y-3 sm:space-y-4">
              {video.duration_minutes && (
                <DetailRow label="Duration" value={`${video.duration_minutes} min`} />
              )}
              {difficultyName && <DetailRow label="Difficulty" value={difficultyName} />}
              {video.calories_burn && (
                <DetailRow label="Calories" value={`${video.calories_burn} kcal`} />
              )}
              {languageDisplayName && (
                <DetailRow label="Language" value={languageDisplayName} />
              )}
              {video.status && (
                <DetailRow
                  label="Status"
                  value={<span className="capitalize">{video.status}</span>}
                />
              )}
              {video.createdAt && (
                <DetailRow
                  label="Released"
                  value={new Date(video.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                />
              )}
            </div>
          </Card>

          {equipmentList.length > 0 && (
            <Card title="Equipment">
              <div className="flex flex-wrap gap-2">
                {equipmentList.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-gray-800 rounded-full text-xs sm:text-sm flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3" />{item}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {video.goals && video.goals.length > 0 && (
            <Card title="Goals">
              <div className="flex flex-wrap gap-2">
                {video.goals.map((g, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-full text-xs sm:text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {categoryName && (
            <Card title="Category">
              <p className="text-gray-400 text-sm sm:text-base">{categoryName}</p>
            </Card>
          )}

          {trainerName && (
            <Card title="About the Trainer">
              <div className="flex items-start gap-3 sm:gap-4">
                {trainerAvatar ? (
                  <img
                    src={trainerAvatar}
                    alt={trainerName}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-bold">{trainerName}</h4>
                  {trainerBio && (
                    <p className="text-gray-400 mb-2 text-sm sm:text-base">{trainerBio}</p>
                  )}
                  {video.createdAt && (
                    <span className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      {new Date(video.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* ── Action icons row ── */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
        {/* My List */}
        <ActionIconButton
          icon={Heart}
          label={isInMyList ? "In My List" : "My List"}
          onClick={onMyListToggle}
          disabled={isMyListLoading}
          active={isInMyList}
          iconClass={isInMyList ? "text-red-500 fill-current" : ""}
        />

        {/* Download */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <div className={`p-2.5 sm:p-3 rounded-full ${isAlreadyDownloaded ? "bg-green-600/20" : "bg-gray-800"}`}>
            {isAlreadyDownloaded
              ? <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              : <Download className={`w-5 h-5 sm:w-6 sm:h-6 ${isDownloading ? "animate-bounce" : ""}`} />}
          </div>
          <span className="text-xs sm:text-sm font-medium">
            {isAlreadyDownloaded ? "Downloaded" : isDownloading ? "Starting..." : "Download"}
          </span>
        </button>

        {/* Share — real OS share sheet */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <div className={`p-2.5 sm:p-3 rounded-full ${copied ? "bg-green-600/20" : "bg-gray-800"}`}>
            {copied
              ? <CheckCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              : <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />}
          </div>
          <span className="text-xs sm:text-sm font-medium">
            {copied ? "Copied!" : "Share"}
          </span>
        </button>

        {/* Report */}
        {/* <ActionIconButton
          icon={Flag}
          label="Report"
          onClick={() => console.log("Report")}
        /> */}
      </div>
    </div>
  );
}