import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types based on your API responses
export interface AboutUsCard {
  _id: string;
  logo: string;
  logoColor: string;
  title: string;
  description: string;
}

export interface AboutUsData {
  _id: string;
  title: string;
  subtitle: string;
  cards: AboutUsCard[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobCard {
  _id: string;
  role: string;
  location: string;
  department: string;
}

export interface JobsSectionData {
  _id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  cards: JobCard[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaCentreCard {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaCentreData {
  _id: string;
  logo: string;
  iconColor: string;
  title: string;
  description: string;
  cards: MediaCentreCard[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvestorCard {
  _id: string;
  value: string;
  description: string;
}

export interface InvestorRelationsData {
  _id: string;
  logo: string;
  logoColor: string;
  title: string;
  subtitle: string;
  cards: InvestorCard[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FooterApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const footerApi = createApi({
  reducerPath: "footerApi",
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
  tagTypes: ["AboutUs", "JobsSection", "MediaCentre", "InvestorRelations"],
  endpoints: (builder) => ({
    // About Us Section
    getAboutUs: builder.query<FooterApiResponse<AboutUsData>, void>({
      query: () => "/about-us",
      providesTags: ["AboutUs"],
    }),

    // Jobs Section
    getJobsSection: builder.query<FooterApiResponse<JobsSectionData>, void>({
      query: () => "/jobs-section",
      providesTags: ["JobsSection"],
    }),

    // Media Centre Section
    getMediaCentre: builder.query<FooterApiResponse<MediaCentreData>, void>({
      query: () => "/media-centre",
      providesTags: ["MediaCentre"],
    }),

    // Investor Relations Section
    getInvestorRelations: builder.query<
      FooterApiResponse<InvestorRelationsData>,
      void
    >({
      query: () => "/investor-relations",
      providesTags: ["InvestorRelations"],
    }),

    // Get all footer sections at once
    getAllFooterSections: builder.query({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const aboutUs = await baseQuery("/about-us");
        const jobsSection = await baseQuery("/jobs-section");
        const mediaCentre = await baseQuery("/media-centre");
        const investorRelations = await baseQuery("/investor-relations");

        return {
          data: {
            aboutUs: aboutUs.data,
            jobsSection: jobsSection.data,
            mediaCentre: mediaCentre.data,
            investorRelations: investorRelations.data,
          },
        };
      },
      providesTags: [
        "AboutUs",
        "JobsSection",
        "MediaCentre",
        "InvestorRelations",
      ],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useGetJobsSectionQuery,
  useGetMediaCentreQuery,
  useGetInvestorRelationsQuery,
  useGetAllFooterSectionsQuery,
} = footerApi;
