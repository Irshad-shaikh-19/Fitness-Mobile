import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Maximize, Minimize, ChevronLeft, MoreVertical,
  Share2, Check, Plus, CheckCheck, Download,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { formatTime } from "./helpers";

interface Props {
  videoUrl: string | null;
  thumbnailUrl: string | null;
  title?: string;
  isInMyList: boolean;
  isMyListLoading: boolean;
  isAlreadyDownloaded?: boolean;
  isDownloading?: boolean;
  onMyListToggle: () => void;
  // FIX: onViewRecord now receives actual current time data from inside the player
  onViewRecord: (data: { duration: number; percentage: number; completed: boolean }) => void;
  onDownload?: () => void;
  onPlayStateChange?: (playing: boolean) => void;
}

export interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, Props>(({
  videoUrl,
  thumbnailUrl,
  title,
  isInMyList,
  isMyListLoading,
  isAlreadyDownloaded = false,
  isDownloading = false,
  onMyListToggle,
  onViewRecord,
  onDownload,
  onPlayStateChange,
}, ref) => {
  const navigate = useNavigate();
  const videoRef     = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resume from continue-watching
  const location = useLocation();
  const resumeTimeRef = useRef<number>((location.state as any)?.resumeTime ?? 0);
  const hasResumed = useRef(false);

  const [isPlaying, setIsPlaying]         = useState(false);
  const [currentTime, setCurrentTime]     = useState(0);
  const [duration, setDuration]           = useState(0);
  const [volume, setVolume]               = useState(1);
  const [isMuted, setIsMuted]             = useState(false);
  const [isFullscreen, setIsFullscreen]   = useState(false);
  const [showControls, setShowControls]   = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [showMoreMenu, setShowMoreMenu]   = useState(false);
  const [hasRecordedView, setHasRecordedView] = useState(false);
  const [copied, setCopied]               = useState(false);
  const [showResumeToast, setShowResumeToast] = useState(false);

  const trackingRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Helper: build view payload from live video element ───────────────────
  // Always reads from videoRef so values are never stale
  const buildViewData = (completed = false) => {
    const v = videoRef.current;
    const currentSec = v ? Math.floor(v.currentTime) : 0;
    const totalSec   = v ? v.duration : 0;
    const pct = completed
      ? 100
      : totalSec > 0
        ? Math.min(100, Math.round((currentSec / totalSec) * 100))
        : 0;
    return { duration: currentSec, percentage: pct, completed };
  };

  // ── Expose play / pause / toggle to parent ───────────────────────────────
  useImperativeHandle(ref, () => ({
    play:   () => { const v = videoRef.current; if (v && v.paused) v.play(); },
    pause:  () => { const v = videoRef.current; if (v && !v.paused) v.pause(); },
    toggle: () => { const v = videoRef.current; if (!v) return; v.paused ? v.play() : v.pause(); },
  }));

  // ── View tracking every 30s ───────────────────────────────────────────────
  const startTracking = () => {
    if (trackingRef.current) clearInterval(trackingRef.current);
    trackingRef.current = setInterval(() => onViewRecord(buildViewData()), 30000);
  };

  const stopTracking = () => {
    if (trackingRef.current) { clearInterval(trackingRef.current); trackingRef.current = null; }
  };

  // ── Controls auto-hide ────────────────────────────────────────────────────
  const bumpControls = () => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (videoRef.current && !videoRef.current.paused) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  // ── Orientation helpers ───────────────────────────────────────────────────
  const lockLandscape = async () => {
    try { const o = (screen as any).orientation; if (o?.lock) await o.lock("landscape"); } catch (_) {}
  };
  const unlockOrientation = () => {
    try { const o = (screen as any).orientation; if (o?.unlock) o.unlock(); } catch (_) {}
  };

  // ── Fullscreen ────────────────────────────────────────────────────────────
  const handleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const video     = videoRef.current as any;
    const container = containerRef.current as any;
    if (!isFullscreen) {
      if (video?.webkitEnterFullscreen) { video.webkitEnterFullscreen(); setIsFullscreen(true); await lockLandscape(); return; }
      if (video?.requestFullscreen) {
        try { await video.requestFullscreen(); setIsFullscreen(true); await lockLandscape(); }
        catch (_) { try { await container?.requestFullscreen?.(); setIsFullscreen(true); await lockLandscape(); } catch (_) {} }
        return;
      }
      if (video?.webkitRequestFullscreen) { video.webkitRequestFullscreen(); setIsFullscreen(true); await lockLandscape(); return; }
      container?.requestFullscreen?.(); setIsFullscreen(true); await lockLandscape();
    } else {
      const doc = document as any;
      (doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen)?.call(doc);
      setIsFullscreen(false); unlockOrientation();
    }
  };

  useEffect(() => {
    const onChange = async () => {
      const doc = document as any;
      const fsEl = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement;
      setIsFullscreen(!!fsEl);
      if (fsEl) await lockLandscape(); else unlockOrientation();
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => { document.removeEventListener("fullscreenchange", onChange); document.removeEventListener("webkitfullscreenchange", onChange); };
  }, []);

  useEffect(() => {
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); stopTracking(); };
  }, []);

  // ── Share ─────────────────────────────────────────────────────────────────
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); setShowMoreMenu(false);
    const shareData = { title: title || "Watch this video", text: `Check out "${title || "this video"}"`, url: window.location.href };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData); return; } catch (_) {}
    }
    try { await navigator.clipboard.writeText(window.location.href); }
    catch (_) {
      const el = document.createElement("input"); el.value = window.location.href;
      document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const close = () => { if (showMoreMenu) setShowMoreMenu(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showMoreMenu]);

  const controlsVisible = !isPlaying || showControls;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video md:h-[70vh] lg:h-[80vh] bg-black select-none"
      onMouseMove={bumpControls}
      onMouseLeave={() => { if (isPlaying) setShowControls(false); }}
      onTouchStart={bumpControls}
    >
      {/* Thumbnail */}
      {showThumbnail && !isPlaying && thumbnailUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Resume toast */}
      {showResumeToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full z-40 pointer-events-none">
          ▶ Resuming from {formatTime(resumeTimeRef.current)}
        </div>
      )}

      {/* Video */}
      {videoUrl && (
        <video
          ref={videoRef}
          key={videoUrl}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          poster={thumbnailUrl || undefined}
          playsInline
          onTimeUpdate={() => {
            if (!videoRef.current) return;
            const t = videoRef.current.currentTime;
            const d = videoRef.current.duration;
            setCurrentTime(t);
            // Record at 90%
            if (d > 0 && (t / d) * 100 >= 90 && !hasRecordedView) {
              onViewRecord(buildViewData(true));
              setHasRecordedView(true);
            }
          }}
          onLoadedMetadata={() => {
            const v = videoRef.current;
            if (!v) return;
            setDuration(v.duration);
            // Seek to resume position once
            if (!hasResumed.current && resumeTimeRef.current > 0) {
              v.currentTime = Math.min(resumeTimeRef.current, v.duration - 1);
              hasResumed.current = true;
              setShowResumeToast(true);
              setTimeout(() => setShowResumeToast(false), 2500);
            }
          }}
          onPlay={() => {
            setIsPlaying(true);
            setShowThumbnail(false);
            if (!hasRecordedView) { onViewRecord(buildViewData()); setHasRecordedView(true); }
            startTracking();
            bumpControls();
            onPlayStateChange?.(true);
          }}
          onPause={() => {
            setIsPlaying(false);
            stopTracking();
            onViewRecord(buildViewData());   // ← sends real current time on pause
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            setShowControls(true);
            onPlayStateChange?.(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            stopTracking();
            onViewRecord(buildViewData(true));  // ← marks as completed
            setShowControls(true);
            onPlayStateChange?.(false);
          }}
        />
      )}

      {/* z-10: click-to-play */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={handlePlayPause} />

      {/* z-20: gradient overlay */}
      <div className={`absolute inset-0 z-20 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none transition-opacity duration-300 ${controlsVisible ? "opacity-100" : "opacity-0"}`} />

      {/* z-30: controls */}
      <div className={`absolute inset-0 z-30 transition-opacity duration-300 ${controlsVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex items-center justify-between">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="flex items-center gap-1.5 sm:gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full transition-all text-white"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back</span>
          </button>

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowMoreMenu((p) => !p)} className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm transition-all text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-gray-900 rounded-xl shadow-2xl border border-gray-700/60 overflow-hidden z-40" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { onMyListToggle(); setShowMoreMenu(false); }} disabled={isMyListLoading} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-800 transition-colors text-left disabled:opacity-50 text-white">
                  {isInMyList ? <><Check className="w-5 h-5 text-green-400 shrink-0" /><span className="text-sm">Remove from List</span></> : <><Plus className="w-5 h-5 shrink-0" /><span className="text-sm">Add to My List</span></>}
                </button>
                <button onClick={() => { onDownload?.(); setShowMoreMenu(false); }} disabled={isDownloading || isAlreadyDownloaded} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-800 transition-colors text-left border-t border-gray-700/60 disabled:opacity-60 text-white">
                  {isAlreadyDownloaded ? <><Check className="w-5 h-5 text-green-400 shrink-0" /><span className="text-sm text-green-400">Downloaded</span></> : isDownloading ? <><Download className="w-5 h-5 shrink-0 animate-bounce" /><span className="text-sm">Starting...</span></> : <><Download className="w-5 h-5 shrink-0" /><span className="text-sm">Download</span></>}
                </button>
                <button onClick={handleShare} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-800 transition-colors text-left border-t border-gray-700/60 text-white">
                  {copied ? <><CheckCheck className="w-5 h-5 text-green-400 shrink-0" /><span className="text-sm text-green-400">Link Copied!</span></> : <><Share2 className="w-5 h-5 shrink-0" /><span className="text-sm">Share</span></>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center play/pause */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-2xl">
            {isPlaying ? <Pause className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black fill-black" /> : <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black fill-black ml-1.5" />}
          </button>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <button onClick={(e) => { e.stopPropagation(); if (videoRef.current) videoRef.current.currentTime = Math.max(0, currentTime - 10); }} className="hover:scale-110 transition-transform text-white">
                <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} className="hover:scale-110 transition-transform text-white">
                {isPlaying ? <Pause className="w-6 h-6 md:w-7 md:h-7 fill-white" /> : <Play className="w-6 h-6 md:w-7 md:h-7 fill-white" />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); if (videoRef.current) videoRef.current.currentTime = Math.min(duration, currentTime + 10); }} className="hover:scale-110 transition-transform text-white">
                <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <div className="hidden lg:flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="hover:scale-110 transition-transform text-white">
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input type="range" min="0" max="1" step="0.1" value={isMuted ? 0 : volume}
                  onChange={(e) => { const v = parseFloat(e.target.value); setVolume(v); setIsMuted(v === 0); if (videoRef.current) videoRef.current.volume = v; }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="lg:hidden hover:scale-110 transition-transform text-white">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <select value={playbackSpeed}
                onChange={(e) => { const s = parseFloat(e.target.value); setPlaybackSpeed(s); if (videoRef.current) videoRef.current.playbackRate = s; }}
                onClick={(e) => e.stopPropagation()}
                className="bg-black/60 backdrop-blur-sm border border-gray-600 rounded px-2 py-1.5 text-xs lg:text-sm focus:outline-none min-w-[60px] text-white cursor-pointer"
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => <option key={s} value={s}>{s}x</option>)}
              </select>
              <button onClick={handleFullscreen} className="hover:scale-110 transition-transform text-white">
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <input type="range" min="0" max={duration || 100} value={currentTime}
            onChange={(e) => { const t = parseFloat(e.target.value); setCurrentTime(t); if (videoRef.current) videoRef.current.currentTime = t; }}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-1 sm:h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 sm:[&::-webkit-slider-thumb]:h-4 sm:[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
            style={{ background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / (duration || 1)) * 100}%, #374151 ${(currentTime / (duration || 1)) * 100}%, #374151 100%)` }}
          />
        </div>
      </div>
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;