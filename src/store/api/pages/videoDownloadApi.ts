import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DownloadRecord {
  _id: string;
  user_id: string;
  video_id: {
    _id: string;
    title: string;
    thumbnail_url?: string | null;
    duration_minutes?: number | null;
    slug?: string;
  };
  quality: "480p" | "720p" | "1080p" | "4k";
  status: "pending" | "downloading" | "completed" | "failed";
  progress: number;
  downloaded_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StartDownloadResponse {
  success: boolean;
  message: string;
  data: {
    download_id: string;
    video_url: string;
  };
}

export interface MyDownloadsResponse {
  success: boolean;
  message: string;
  data: {
    downloads: DownloadRecord[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export const videoDownloadApi = createApi({
  reducerPath: "videoDownloadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("fitnessFlicksToken");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Download"],
  endpoints: (builder) => ({

    /* Start a download */
    startDownload: builder.mutation<
      StartDownloadResponse,
      { video_id: string; quality?: string }
    >({
      query: (body) => ({
        url: "/video-downloads/start",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Download"],
    }),

    /* Get user's download list */
    getMyDownloads: builder.query<
      MyDownloadsResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/video-downloads/my-downloads",
        params: params || {},
      }),
      providesTags: ["Download"],
    }),

    /* Remove a download */
    removeDownload: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (downloadId) => ({
        url: `/video-downloads/${downloadId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Download"],
    }),

    /* Get stream URL (helper only) */
    getStreamUrl: builder.query<
      string,
      { downloadId: string; forceDownload?: boolean }
    >({
      queryFn: ({ downloadId, forceDownload }) => {
        const base = import.meta.env.VITE_BACKEND_URL;
        const url = `${base}/api/video-downloads/stream/${downloadId}${
          forceDownload ? "?download=true" : ""
        }`;
        return { data: url };
      },
    }),
  }),
});

export const {
  useStartDownloadMutation,
  useGetMyDownloadsQuery,
  useRemoveDownloadMutation,
  useGetStreamUrlQuery,
} = videoDownloadApi;
