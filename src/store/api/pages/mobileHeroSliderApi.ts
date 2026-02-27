import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MobileHeroVideo {
  _id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  category?: { _id: string; category_name: string } | string;
  difficulty?: { _id: string; difficulty_name: string } | string;
  duration_minutes?: number;
  video_url_1080p?: string;
  slug?: string;
}

export interface MobileHeroSliderData {
  _id: string;
  mobile_selected_video: MobileHeroVideo | null;
  mobile_is_active: boolean;
  mobile_display_order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MobileHeroSliderResponse {
  success: boolean;
  message: string;
  data: MobileHeroSliderData | { mobile_selected_video: null };
}

export const mobileHeroSliderApi = createApi({
  reducerPath: "mobileHeroSliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/hero/hero-slider",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("fitnessFlicksToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["MobileHeroSlider"],
  endpoints: (builder) => ({
    getPublicMobileHeroSlider: builder.query<MobileHeroSliderResponse, void>({
      query: () => "/mobile/public",
      providesTags: ["MobileHeroSlider"],
    }),
  }),
});

export const { useGetPublicMobileHeroSliderQuery } = mobileHeroSliderApi;