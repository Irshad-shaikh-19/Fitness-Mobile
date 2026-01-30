import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   TYPES
======================= */

export interface ContactUsContent {
  _id: string;
  title: string;
  subtitle: string;
  formTitle: string;
  email: string;
  phone: string;
  address: string;
  supportHours: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HelpCentreCard {
  _id: string;
  logo: string;
  logoColor: string;
  title: string;
  subtitle?: string;
}


export interface HelpCentreData {
  _id: string;
  title: string;
  subtitle: string;
  cards: HelpCentreCard[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WaysToWatchCard {
  _id: string;
  title: string;
  description?: string;
}

export interface WaysToWatchData {
  _id: string;
  logo: string;
  logoColor: string;
  title: string;
  subtitle: string;
  cards: WaysToWatchCard[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* =======================
   API
======================= */

export const footerSupportApi = createApi({
  reducerPath: "footerSupportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/footer",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("ottplusToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ContactUs", "HelpCentre", "WaysToWatch"],
  endpoints: (builder) => ({
    /* ---------- Contact Us ---------- */
    getContactUs: builder.query<ApiResponse<ContactUsContent>, void>({
      query: () => "/contact-us",
      providesTags: ["ContactUs"],
    }),

    /* ---------- Help Centre ---------- */
    getHelpCentre: builder.query<ApiResponse<HelpCentreData>, void>({
      query: () => "/help-centre",
      providesTags: ["HelpCentre"],
    }),

    /* ---------- Ways To Watch ---------- */
    getWaysToWatch: builder.query<ApiResponse<WaysToWatchData>, void>({
      query: () => "/ways-to-watch",
      providesTags: ["WaysToWatch"],
    }),

    /* ---------- All Footer Support Sections ---------- */
    getAllFooterSupportSections: builder.query({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const contactUs = await baseQuery("/contact-us");
        const helpCentre = await baseQuery("/help-centre");
        const waysToWatch = await baseQuery("/ways-to-watch");

        return {
          data: {
            contactUs: contactUs.data,
            helpCentre: helpCentre.data,
            waysToWatch: waysToWatch.data,
          },
        };
      },
      providesTags: ["ContactUs", "HelpCentre", "WaysToWatch"],
    }),
  }),
});

/* =======================
   HOOKS
======================= */

export const {
  useGetContactUsQuery,
  useGetHelpCentreQuery,
  useGetWaysToWatchQuery,
  useGetAllFooterSupportSectionsQuery,
} = footerSupportApi;
