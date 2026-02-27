import { Play, MoreVertical, Trash2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetMyDownloadsQuery,
  useRemoveDownloadMutation,
  DownloadRecord,
} from "../store/api/pages/videoDownloadApi";
import { useDownloadProgress } from "../hooks/useDownloadProgress";
import { getImageUrl } from "../components/workout-player/helpers";
import { downloadManager } from "@/store/slice/downloadManager";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/* Progress bar for a single download */
function DownloadProgressBar({ downloadId }: { downloadId: string }) {
  const { progress, status } = useDownloadProgress(downloadId);

  if (status === "completed") return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
        <span className="capitalize">{status}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${
            status === "failed" ? "bg-red-500" : "bg-red-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function DownloadItem({
  download,
  onDelete,
}: {
  download: DownloadRecord;
  onDelete: (id: string) => void;
}) {
  const { status } = useDownloadProgress(download._id);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

  const token = localStorage.getItem("fitnessFlicksToken");
  const streamUrl = `${BACKEND_URL}/api/video-downloads/stream/${download._id}?token=${token}`;
  const thumbnail = getImageUrl(download.video_id?.thumbnail_url) || "";

  // For terminal DB states, trust DB — don't let manager's initial "pending" override
  const liveStatus =
    download.status === "completed" || download.status === "failed"
      ? download.status
      : status ?? download.status;

  const isActive = liveStatus === "downloading" || liveStatus === "pending";

  // Auto-start download if it's pending/downloading and not already running in manager
useEffect(() => {
    if (
      download.status !== "completed" &&
      download.status !== "failed" &&
      download.status === "pending" &&          
      !downloadManager.isActive(download._id)
    ) {
      const t = localStorage.getItem("fitnessFlicksToken") || "";
      downloadManager.start(download._id, t);
    }
  }, [download._id, download.status]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 5, right: window.innerWidth - rect.right });
    setMenuOpen((prev) => !prev);
  };

const handlePlay = () => {
  if (liveStatus === "completed") {
    navigate(`/workout/${download.video_id?._id}`);
  }
};

  return (
    <div className="flex items-start gap-3">
      {/* Thumbnail */}
     <div
  onClick={handlePlay}
  className={`relative w-40 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-800 ${
    liveStatus === "completed" ? "cursor-pointer" : "cursor-default"
  }`}
>
        {thumbnail && (
          <img
            src={thumbnail}
            alt={download.video_id?.title}
            className="w-full h-full object-cover"
          />
        )}
     <div className="absolute inset-0 flex items-center justify-center bg-black/30">
  {isActive ? (
    <Loader2 className="w-8 h-8 text-white animate-spin" />
  ) : liveStatus === "completed" ? (
    <div className="w-12 h-12 rounded-full bg-black/70 border-2 border-white flex items-center justify-center">
      <Play className="w-6 h-6 text-white fill-white ml-1" />
    </div>
  ) : null}
</div>
        <div className="absolute top-1 right-1 bg-gray-900/80 text-white text-[10px] px-1.5 py-0.5 rounded">
          {download.quality}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white text-base font-medium leading-tight">
          {download.video_id?.title}
        </h3>
        {download.video_id?.duration_minutes && (
          <p className="text-gray-400 text-sm mt-0.5">
            {download.video_id.duration_minutes} min
          </p>
        )}

        {/* Show progress bar for any non-completed, non-idle state */}
        {(isActive || liveStatus === "paused" || liveStatus === "failed") && (
          <DownloadProgressBar downloadId={download._id} />
        )}

        {liveStatus === "completed" && (
          <p className="text-green-500 text-xs mt-1">✓ Downloaded</p>
        )}
      </div>

      {/* Menu */}
      <div className="relative">
        <button onClick={handleMenuClick} className="text-white p-2">
          <MoreVertical className="w-6 h-6" />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div
              className="fixed z-50 bg-gray-800 rounded-lg shadow-xl min-w-[200px]"
              style={{ top: menuPos.top, right: menuPos.right }}
            >
              <button
                onClick={() => {
                  onDelete(download._id);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Download</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetMyDownloadsQuery();
  const [removeDownload] = useRemoveDownloadMutation();
  const downloads = data?.data?.downloads || [];

  const swalTheme = {
    background: "#1a1a1a", color: "#ffffff",
    confirmButtonColor: "#dc2626", cancelButtonColor: "#4b5563",
  };

  const handleDelete = async (id: string) => {
    const r = await Swal.fire({
      title: "Remove Download?", text: "This will remove it from your downloads list.",
      icon: "warning", showCancelButton: true, confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel", ...swalTheme,
    });
    if (!r.isConfirmed) return;
    try {
      await removeDownload(id).unwrap();
      refetch();
      Swal.fire({ title: "Removed!", icon: "success", timer: 1500, showConfirmButton: false, ...swalTheme });
    } catch {
      Swal.fire({ title: "Error", text: "Could not remove download.", icon: "error", ...swalTheme });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24 pt-4">
      <div className="px-4 py-4 space-y-6">
        {downloads.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg mb-2">No downloads yet</p>
            <p className="text-sm">Go to a video and tap Download to save it.</p>
          </div>
        ) : (
          downloads.map((download) => (
            <DownloadItem key={download._id} download={download} onDelete={handleDelete} />
          ))
        )}
      </div>

      <div className="px-4 pt-10">
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-md transition"
        >
          Find More to Download
        </button>
      </div>
    </div>
  );
}