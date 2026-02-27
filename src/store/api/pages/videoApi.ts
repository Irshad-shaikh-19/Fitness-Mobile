import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   TYPES
======================= */

export interface Video {
  _id: string;
  id?: string;
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

  // In getVideoById: populated object WITH _id & description ONLY (no name fields)
  // In getVideosByCategory: populated object WITH _id & category_name & description
  category?: {
    _id: string;
    category_name?: string;   // present in list API, absent in single video API
    name?: string;
    description?: string;
  } | string | null;

  goals?: string[];

  // In getVideoById: populated with _id & description ONLY (no equipment_name)
  equipment_required?: {
    _id: string;
    equipment_name?: string;  // may be absent in single video API response
    name?: string;
    description?: string;
  }[] | string[];

  duration_minutes?: number | null;
  calories_burn?: number | null;
  trainer_id?: string | null;
  language?: string;
  is_paid: boolean;
  price?: number;
  status: string;
  is_active: boolean;
  order_index?: number;

  created_by?: {
    _id: string;
    name: string;
    email?: string;
  } | string;

  updated_by?: {
    _id: string;
    name: string;
    email?: string;
  } | string;

  createdAt: string;
  updatedAt: string;

  // Populated fields — name fields absent in single video response
  trainer?: {
    _id: string;
    name: string;             // present
    email?: string;
    profile_picture?: string;
    bio?: string;
  };

  fitness_type?: {
    _id: string;
    fitness_type_name?: string; // absent in single video response
    name?: string;
    description?: string;
  };

  difficulty?: {
    _id: string;
    difficulty_name?: string;   // absent in single video response
    name?: string;
    level?: number;
    description?: string;
  };

  // For recommendation features
  is_top_10?: boolean;
  top_10_rank?: number | null;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface VideoListResponse {
  videos: Video[];
  pagination?: Pagination;
  total?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* =======================
   QUERY PARAMS
======================= */

export interface VideoListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
  difficulty_id?: string;
  fitness_type_id?: string;
  trainer_id?: string;
  is_paid?: boolean;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  all?: boolean; // fetch all without pagination
}

/* =======================
   API
======================= */

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("fitnessFlicksToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    /* ---------- Video List (Frontend - Published & Active only) ---------- */
    getVideos: builder.query<ApiResponse<VideoListResponse>, VideoListParams | void>({
      query: (params) => ({
        url: "/video-link/public",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Video"],
    }),

    /* ---------- Video By ID ---------- */
    getVideoById: builder.query<ApiResponse<{ video: Video }>, string>({
      query: (id) => `/video-link/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Video", id }],
    }),

    /* ---------- Video By Slug ---------- */
    getVideoBySlug: builder.query<ApiResponse<{ video: Video }>, string>({
      query: (slug) => `/video-link/slug/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Video", id: slug }],
    }),

    /* ---------- Videos By Category ---------- */
    getVideosByCategory: builder.query<
      ApiResponse<VideoListResponse>,
      { category_id: string; page?: number; limit?: number }
    >({
      query: ({ category_id, page = 1, limit = 10 }) => ({
        url: `/video-link/category/${category_id}`,
        params: { page, limit },
      }),
      providesTags: (_result, _error, { category_id }) => [
        { type: "Video", id: `category-${category_id}` },
      ],
    }),

    /* ---------- Videos By Trainer ---------- */
    getVideosByTrainer: builder.query<
      ApiResponse<VideoListResponse>,
      { trainer_id: string; page?: number; limit?: number; status?: string }
    >({
      query: ({ trainer_id, page = 1, limit = 10, status }) => ({
        url: `/video-link/trainer/${trainer_id}`,
        params: { page, limit, ...(status && { status }) },
      }),
      providesTags: (_result, _error, { trainer_id }) => [
        { type: "Video", id: `trainer-${trainer_id}` },
      ],
    }),
  }),
});

/* =======================
   HOOKS
======================= */

export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useGetVideoBySlugQuery,
  useGetVideosByCategoryQuery,
  useGetVideosByTrainerQuery,
} = videoApi;