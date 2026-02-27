import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MyListVideo {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  thumbnail_url?: string;
  preview_video_url?: string;
  duration_minutes?: number;
  calories_burn?: number;
  is_paid?: boolean;
  fitness_type?: { fitness_type_name: string };
  difficulty?: { difficulty_name: string };
  trainer?: { name: string; avatar?: string };
}

export interface MyListEntry {
  _id: string;
  user_id: string;
  video_id: string;
  video: MyListVideo;
  notes?: string;
  added_at: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MyListApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface GetMyListResponse {
  myList: MyListEntry[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CheckVideoInListResponse {
  is_in_list: boolean;
  myListEntry?: MyListEntry;
}

export const myListApi = createApi({
  reducerPath: "myListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/my-list",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("fitnessFlicksToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["MyList"],
  endpoints: (builder) => ({
    // Add video to My List
    addToMyList: builder.mutation<
      MyListApiResponse<MyListEntry>,
      { video_id: string; notes?: string }
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyList"],
    }),

    // Get user's My List with pagination
    getMyList: builder.query<
      MyListApiResponse<GetMyListResponse>,
      { page?: number; limit?: number; search?: string; sort_by?: string; sort_order?: string }
    >({
      query: (params) => ({
        url: "/",
        params,
      }),
      providesTags: ["MyList"],
    }),

    // Check if specific video is in My List
    checkVideoInMyList: builder.query<
      MyListApiResponse<CheckVideoInListResponse>,
      string // video_id
    >({
      query: (video_id) => `/check/${video_id}`,
      providesTags: (_result, _error, video_id) => [{ type: "MyList", id: video_id }],
    }),

    // Update notes for a My List entry
    updateMyListNotes: builder.mutation<
      MyListApiResponse<MyListEntry>,
      { id: string; notes: string }
    >({
      query: ({ id, notes }) => ({
        url: `/${id}/notes`,
        method: "PUT",
        body: { notes },
      }),
      invalidatesTags: ["MyList"],
    }),

    // Remove video from My List by entry ID
    removeFromMyList: builder.mutation<MyListApiResponse<null>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyList"],
    }),

    // Remove video from My List by video ID
    removeFromMyListByVideoId: builder.mutation<MyListApiResponse<null>, string>({
      query: (video_id) => ({
        url: `/video/${video_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyList"],
    }),

    // Get count of videos in My List
    getMyListCount: builder.query<MyListApiResponse<{ count: number }>, void>({
      query: () => "/count",
      providesTags: ["MyList"],
    }),
  }),
});

export const {
  useAddToMyListMutation,
  useGetMyListQuery,
  useCheckVideoInMyListQuery,
  useUpdateMyListNotesMutation,
  useRemoveFromMyListMutation,
  useRemoveFromMyListByVideoIdMutation,
  useGetMyListCountQuery,
} = myListApi;