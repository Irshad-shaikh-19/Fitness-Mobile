import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetVideoByIdQuery, useGetVideosByCategoryQuery } from "../store/api/pages/videoApi";
import { useRecordViewMutation } from "../store/api/pages/recommendationApi";
import { useCheckVideoInMyListQuery, useAddToMyListMutation, useRemoveFromMyListByVideoIdMutation } from "../store/api/pages/myListApi";
import VideoPlayer, { VideoPlayerHandle } from "../components/workout-player/VideoPlayer";
import WorkoutDetails from "../components/workout-player/WorkoutDetails";
import RelatedVideos from "../components/workout-player/RelatedVideos";
import { getImageUrl, getLanguageName, getDeviceType, getSessionId } from "../components/workout-player/helpers";

export default function WorkoutPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<VideoPlayerHandle>(null);

  const token = localStorage.getItem("fitnessFlicksToken");
  const isLoggedIn = !!token;

  const { data: videoData, isLoading } = useGetVideoByIdQuery(id || "", { skip: !id });
  const video = videoData?.data?.video;
  const categoryId = video?.category
    ? typeof video.category === "object" ? video.category._id : video.category
    : null;

  const { data: relatedData, isLoading: isRelatedLoading } = useGetVideosByCategoryQuery(
    { category_id: categoryId || "", limit: 10 },
    { skip: !categoryId }
  );
  const relatedVideos = (relatedData?.data?.videos || []).filter((v) => v._id !== id).slice(0, 4);

  const { data: checkData, refetch: refetchCheck } = useCheckVideoInMyListQuery(id!, { skip: !isLoggedIn || !id });
  const isInMyList = checkData?.data?.is_in_list ?? false;
  const [addToMyList, { isLoading: isAdding }] = useAddToMyListMutation();
  const [removeFromMyListByVideoId, { isLoading: isRemoving }] = useRemoveFromMyListByVideoIdMutation();
  const [recordView] = useRecordViewMutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsPlaying(false);
    setShowDescription(false);
  }, [id]);

  // FIX: handleViewRecord now receives real duration + percentage from VideoPlayer
  // instead of relying on a stale currentTime state in this parent component.
  const handleViewRecord = async ({
    duration,
    percentage,
    completed,
  }: {
    duration: number;
    percentage: number;
    completed: boolean;
  }) => {
    if (!id) return;
    try {
      await recordView({
        video_id: id,
        watch_duration_seconds: duration,     // real seconds from videoRef.currentTime
        watch_percentage: percentage,          // real % calculated inside VideoPlayer
        device_type: getDeviceType(),
        session_id: getSessionId(),
        video_type: "video_link",
      }).unwrap();
    } catch (e) {
      console.error("Failed to record view:", e);
    }
  };

  const swalTheme = {
    background: "#1a1a1a",
    color: "#ffffff",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#4b5563",
  };

  const handleMyListToggle = async () => {
    if (!isLoggedIn) {
      const r = await Swal.fire({
        title: "Login Required",
        text: "Please log in to save videos.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
        ...swalTheme,
      });
      if (r.isConfirmed) navigate("/login");
      return;
    }
    if (!id) return;
    if (isInMyList) {
      const r = await Swal.fire({
        title: "Remove from My List?",
        text: `"${video?.title}" will be removed.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove",
        cancelButtonText: "Cancel",
        ...swalTheme,
      });
      if (!r.isConfirmed) return;
      try {
        await removeFromMyListByVideoId(id).unwrap();
        refetchCheck();
        Swal.fire({ title: "Removed!", icon: "success", timer: 1800, showConfirmButton: false, ...swalTheme });
      } catch {
        Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error", ...swalTheme });
      }
      return;
    }
    const r = await Swal.fire({
      title: "Add to My List?",
      text: `Add "${video?.title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      ...swalTheme,
    });
    if (!r.isConfirmed) return;
    try {
      await addToMyList({ video_id: id }).unwrap();
      refetchCheck();
      Swal.fire({ title: "Added!", icon: "success", timer: 1800, showConfirmButton: false, ...swalTheme });
    } catch {
      Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error", ...swalTheme });
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-lg">Loading...</div>
    </div>
  );

  const videoUrl = video?.video_url_480p || video?.video_url_720p || video?.video_url_1080p || null;
  const thumbnailUrl = getImageUrl(video?.thumbnail_url) || null;
  const difficultyName = video?.difficulty?.difficulty_name || null;
  const fitnessTypeName = video?.fitness_type?.fitness_type_name || null;
  const categoryName = video?.category && typeof video.category === "object"
    ? video.category.category_name || null
    : null;
  const trainerName = video?.trainer?.name || null;
  const trainerAvatar = getImageUrl(video?.trainer?.profile_picture) || null;
  const trainerBio = video?.trainer?.bio || null;
  const languageDisplayName = getLanguageName(video?.language);
  const equipmentList = (video?.equipment_required as any[] || [])
    .map((e) => typeof e === "object" ? e.equipment_name || e.description || "" : e)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative">
        <VideoPlayer
          ref={playerRef}
          videoUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          title={video?.title}
          isInMyList={isInMyList}
          isMyListLoading={isAdding || isRemoving}
          onMyListToggle={handleMyListToggle}
          onViewRecord={handleViewRecord}
          onPlayStateChange={(playing) => setIsPlaying(playing)}
        />
        {video && (
          <WorkoutDetails
            video={video}
            difficultyName={difficultyName}
            fitnessTypeName={fitnessTypeName}
            categoryName={categoryName}
            languageDisplayName={languageDisplayName}
            trainerName={trainerName}
            trainerAvatar={trainerAvatar}
            trainerBio={trainerBio}
            equipmentList={equipmentList}
            isPlaying={isPlaying}
            isInMyList={isInMyList}
            isMyListLoading={isAdding || isRemoving}
            showDescription={showDescription}
            onPlayPause={() => playerRef.current?.toggle()}
            onMyListToggle={handleMyListToggle}
            onToggleDescription={() => setShowDescription((p) => !p)}
          />
        )}
      </section>
      <RelatedVideos
        videos={relatedVideos}
        currentId={id}
        isLoading={isRelatedLoading}
        categoryId={categoryId}
      />
    </div>
  );
}