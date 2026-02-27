import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   TYPES
======================= */

export interface VideoView {
  _id: string;
  user_id: string;
  video_id: string;
  video_type: "video" | "video_link";
  watch_duration_seconds: number;
  is_completed: boolean;
  watch_percentage: number;
  device_type: "mobile" | "tablet" | "desktop" | "tv" | "other";
  ip_address?: string;
  session_id?: string;
  last_viewed_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyStats {
  total_views: number;
  unique_viewers: number;
  completed_views: number;
  total_watch_time_seconds: number;
  engagement_score: number;
}

export interface AllTimeStats {
  total_views: number;
  unique_viewers: number;
  completed_views: number;
  total_watch_time_seconds: number;
}

export interface VideoProgress {
  watch_duration_seconds: number;
  watch_percentage: number;
  last_viewed_at: string;
}

export interface VideoWithStats {
  _id: string;
  title: string;
  slug?: string;
  video_url?: string | null;
  video_url_480p?: string | null;
  video_url_720p?: string | null;
  video_url_1080p?: string | null;
  video_url_4k?: string | null;
  preview_video_url?: string | null;
  thumbnail_url?: string | null;
  description?: string;
  fitness_type_id?: string | null;
  difficulty_id?: string | null;
  category?: {
    _id: string;
    category_name?: string;
    name?: string;
    description?: string;
  } | string | null;
  goals?: string[];
  equipment_required?: any[];
  duration_minutes?: number | null;
  calories_burn?: number | null;
  trainer_id?: string | null;
  language?: string;
  is_paid: boolean;
  price?: number;
  status: string;
  is_active: boolean;
  order_index?: number;
  createdAt: string;
  updatedAt: string;
  trainer?: {
    _id: string;
    name: string;
    profile_picture?: string;
    bio?: string;
  };
  fitness_type?: {
    _id: string;
    fitness_type_name?: string;
    name?: string;
    description?: string;
  };
  difficulty?: {
    _id: string;
    difficulty_name?: string;
    name?: string;
    level?: number;
    description?: string;
  };
  weekly_stats?: WeeklyStats;
  all_time_stats?: AllTimeStats;
  is_top_10?: boolean;
  top_10_rank?: number | null;
  rank?: number;
  progress?: VideoProgress; // For continue watching
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface RecommendationBasis {
  top_categories: number;
  top_fitness_types: number;
  top_difficulties: number;
  top_trainers: number;
  watched_videos_count: number;
}

export interface ContinueWatchingResponse {
  videos: VideoWithStats[];
  count: number;
}

export interface PersonalizedRecommendationsResponse {
  videos: VideoWithStats[];
  recommendation_basis: RecommendationBasis;
  pagination: Pagination;
}

export interface PopularWorkoutsResponse {
  videos: VideoWithStats[];
  period: {
    start_date: string;
    end_date: string;
    days: number;
  };
  pagination: Pagination;
  top_10_video_ids: string[];
}

export interface Top10AllTimeResponse {
  videos: VideoWithStats[];
  total_count: number;
}

export interface WatchHistoryStats {
  total_videos_watched: number;
  total_completed: number;
  total_watch_time_seconds: number;
  unique_videos_count: number;
}

export interface WatchHistoryItem {
  _id: string;
  user_id: string;
  video_id: VideoWithStats;
  watch_duration_seconds: number;
  watch_percentage: number;
  is_completed: boolean;
  device_type: string;
  last_viewed_at: string;
  createdAt: string;
}

export interface WatchHistoryResponse {
  history: WatchHistoryItem[];
  stats: WatchHistoryStats;
  pagination: Pagination;
}

export interface Top10StatusResponse {
  video_id: string;
  is_top_10: boolean;
  rank: number | null;
  weekly_stats: WeeklyStats | null;
}

export interface SimilarVideosResponse {
  source_video_id: string;
  videos: VideoWithStats[];
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* =======================
   REQUEST PARAMS
======================= */

export interface RecordViewParams {
  video_id: string;
  watch_duration_seconds?: number;
  watch_percentage?: number;
  device_type?: "mobile" | "tablet" | "desktop" | "tv" | "other";
  session_id?: string;
  video_type?: "video" | "video_link";
}

export interface RecommendationQueryParams {
  page?: number;
  limit?: number;
}

export interface WatchHistoryQueryParams {
  page?: number;
  limit?: number;
  completed_only?: boolean;
}

export interface SimilarVideosQueryParams {
  video_id: string;
  limit?: number;
}

export interface ContinueWatchingQueryParams {
  limit?: number;
}

/* =======================
   API
======================= */

export const recommendationApi = createApi({
  reducerPath: "recommendationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/recommendations",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("fitnessFlicksToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Recommendation", "WatchHistory", "Top10Status", "ContinueWatching"],
  endpoints: (builder) => ({
    /* ---------- Record Video View ---------- */
    recordView: builder.mutation<
      ApiResponse<{ view: VideoView }>,
      RecordViewParams
    >({
      query: (body) => ({
        url: "/record-view",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recommendation", "WatchHistory", "Top10Status", "ContinueWatching"],
    }),

    /* ---------- Get Continue Watching ---------- */
    getContinueWatching: builder.query<
      ApiResponse<ContinueWatchingResponse>,
      ContinueWatchingQueryParams | void
    >({
      query: (params) => ({
        url: "/continue-watching",
        params: params || {},
      }),
      providesTags: ["ContinueWatching"],
    }),

    /* ---------- Get Personalized Recommendations ---------- */
    getPersonalizedRecommendations: builder.query<
      ApiResponse<PersonalizedRecommendationsResponse>,
      RecommendationQueryParams | void
    >({
      query: (params) => ({
        url: "/for-you",
        params: params || {},
      }),
      providesTags: ["Recommendation"],
    }),

    /* ---------- Get Popular Workouts This Week ---------- */
    getPopularWorkoutsThisWeek: builder.query<
      ApiResponse<PopularWorkoutsResponse>,
      RecommendationQueryParams | void
    >({
      query: (params) => ({
        url: "/popular-this-week",
        params: params || {},
      }),
      providesTags: ["Recommendation"],
    }),

    /* ---------- Get Top 10 Videos All Time ---------- */
    getTop10AllTime: builder.query<ApiResponse<Top10AllTimeResponse>, void>({
      query: () => "/top-10-all-time",
      providesTags: ["Recommendation"],
    }),

    /* ---------- Get Watch History ---------- */
    getWatchHistory: builder.query<
      ApiResponse<WatchHistoryResponse>,
      WatchHistoryQueryParams | void
    >({
      query: (params) => ({
        url: "/watch-history",
        params: params || {},
      }),
      providesTags: ["WatchHistory"],
    }),

    /* ---------- Check Video Top 10 Status ---------- */
    checkTop10Status: builder.query<
      ApiResponse<Top10StatusResponse>,
      string
    >({
      query: (videoId) => `/top-10-status/${videoId}`,
      providesTags: (_result, _error, videoId) => [
        { type: "Top10Status", id: videoId },
      ],
    }),

    /* ---------- Get Similar Videos ---------- */
    getSimilarVideos: builder.query<
      ApiResponse<SimilarVideosResponse>,
      SimilarVideosQueryParams
    >({
      query: ({ video_id, limit = 10 }) => ({
        url: `/similar/${video_id}`,
        params: { limit },
      }),
    }),
  }),
});

/* =======================
   HOOKS
======================= */

export const {
  useRecordViewMutation,
  useGetContinueWatchingQuery,
  useGetPersonalizedRecommendationsQuery,
  useGetPopularWorkoutsThisWeekQuery,
  useGetTop10AllTimeQuery,
  useGetWatchHistoryQuery,
  useCheckTop10StatusQuery,
  useGetSimilarVideosQuery,
} = recommendationApi;