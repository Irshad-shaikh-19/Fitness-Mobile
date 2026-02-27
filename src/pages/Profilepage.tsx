import React from "react";
import { ChevronRight, Download as DownloadIcon, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetMyDownloadsQuery } from "../store/api/pages/videoDownloadApi";
import { useGetMyListQuery } from "../store/api/pages/myListApi";
import { getImageUrl } from "../components/workout-player/helpers";

function ThumbnailCard({
  id,
  title,
  thumbnail,
  badge,
  onClick,
}: {
  id: string;
  title: string;
  thumbnail: string;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="relative flex-shrink-0 w-[110px] cursor-pointer"
      onClick={onClick}
    >
      {badge && (
        <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
          {badge}
        </div>
      )}
      <div className="relative h-[160px] rounded-sm overflow-hidden bg-gray-800">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="w-8 h-8 text-gray-600" />
          </div>
        )}
      </div>
      <p className="text-white text-xs mt-1.5 leading-tight line-clamp-2">{title}</p>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();

  const { data: downloadsData } = useGetMyDownloadsQuery();
 const { data: myListData } = useGetMyListQuery({
  page: 1,
  limit: 3,
  sort_by: "added_at",
  sort_order: "desc",
});

  const downloads = downloadsData?.data?.downloads || [];
 const completedDownloads = downloads.filter((d) => d.status === "completed").slice(0, 3);

  const myList = myListData?.data?.myList || [];

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* Downloads Section */}
      <div className="px-4 mb-8 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DownloadIcon className="w-6 h-6 text-gray-400" />
            <h2 className="text-xl font-bold">Downloads</h2>
          </div>
          {completedDownloads.length > 0 && (
            <button
              onClick={() => navigate("/downloads")}
              className="flex items-center gap-1 text-base text-white hover:text-gray-300"
            >
              See All
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {completedDownloads.length === 0 ? (
          <button
            onClick={() => navigate("/downloads")}
            className="w-full bg-gray-800/50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800/70 transition"
          >
            <div className="flex items-center gap-4">
              <DownloadIcon className="w-8 h-8 text-gray-400" />
              <div className="text-left">
                <h3 className="text-white text-base font-semibold">No downloads yet</h3>
                <p className="text-gray-400 text-sm">
                  Videos you download appear here.
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </button>
        ) : (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {completedDownloads.map((d) => (
              <ThumbnailCard
                key={d._id}
                id={d._id}
                title={d.video_id?.title || "Untitled"}
                thumbnail={getImageUrl(d.video_id?.thumbnail_url) || ""}
                badge={d.quality}
                onClick={() => navigate(`/workout/${d.video_id?._id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* My List Section */}
      <div>
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-xl font-bold">My List</h2>
          {myList.length > 0 && (
            <button
              onClick={() => navigate("/my-list")}
              className="flex items-center gap-1 text-base text-white hover:text-gray-300"
            >
              See All
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {myList.length === 0 ? (
          <div className="mx-4 bg-gray-800/50 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-3">
            <Play className="w-10 h-10 text-gray-600" />
            <p className="text-white font-semibold">Your list is empty</p>
            <p className="text-gray-400 text-sm">
              Save workouts from the home screen to watch them later.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
            >
              Browse Workouts
            </button>
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
            {myList.map((entry) => (
              <ThumbnailCard
                key={entry._id}
                id={entry.video?._id || entry.video_id}
                title={entry.video?.title || "Untitled"}
                thumbnail={getImageUrl(entry.video?.thumbnail_url) || ""}
                onClick={() => navigate(`/workout/${entry.video?._id || entry.video_id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}