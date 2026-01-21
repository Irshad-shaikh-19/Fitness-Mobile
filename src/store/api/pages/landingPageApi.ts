import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Types for API responses
export interface HeroSectionData {
  _id: string;
  background_image: string;
  main_title: string;
  highlighted_text: string;
  description: string;
  primary_button: {
    text: string;
    action: string;
  };
  secondary_button: {
    text: string;
    action: string;
  };
  footer_text: string;
}

export interface WhySectionCard {
  _id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

export interface WhySectionData {
  _id: string;
  section_title: string;
  cards: WhySectionCard[];
}

export interface Testimonial {
  _id: string;
  name: string;
  text: string;
  rating: number;
}

export interface TestimonialSectionData {
  _id: string;
  section_title: string;
  testimonials: Testimonial[];
}

export interface CTASectionData {
  _id: string;
  section_title: string;
  description: string;
  button_text: string;
  button_link: string;
}

export interface LandingPageApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const landingPageApi = createApi({
  reducerPath: "landingPageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api/landing-page",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("ottplusToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Hero", "WhySection", "Testimonials", "CTASection"],
  endpoints: (builder) => ({
    // Hero Section
    getPublicHero: builder.query<LandingPageApiResponse<any>, void>({
      query: () => "/hero/public",
      providesTags: ["Hero"],
    }),

    // Why Section
    getPublicWhySection: builder.query<LandingPageApiResponse<any>, void>({
      query: () => "/why-section/public",
      providesTags: ["WhySection"],
    }),

    // Testimonials Section
    getPublicTestimonials: builder.query<LandingPageApiResponse<any>, void>({
      query: () => "/testimonials/public",
      providesTags: ["Testimonials"],
    }),

    // CTA Section
    getPublicCTASection: builder.query<LandingPageApiResponse<any>, void>({
      query: () => "/cta-section/public",
      providesTags: ["CTASection"],
    }),

    // Get all sections at once (optimized)
    getAllPublicSections: builder.query({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const hero = await baseQuery("/hero/public");
        const whySection = await baseQuery("/why-section/public");
        const testimonials = await baseQuery("/testimonials/public");
        const ctaSection = await baseQuery("/cta-section/public");

        return {
          data: {
            hero: hero.data,
            whySection: whySection.data,
            testimonials: testimonials.data,
            ctaSection: ctaSection.data,
          },
        };
      },
      providesTags: ["Hero", "WhySection", "Testimonials", "CTASection"],
    }),
  }),
});

export const {
  useGetPublicHeroQuery,
  useGetPublicWhySectionQuery,
  useGetPublicTestimonialsQuery,
  useGetPublicCTASectionQuery,
  useGetAllPublicSectionsQuery,
} = landingPageApi;
