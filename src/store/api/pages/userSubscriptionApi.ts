import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Plan } from "./planApi";

/* =======================
   TYPES
======================= */

export interface UserSubscription {
  _id: string;
  userId: string;
  planId: Plan;
  status: "active" | "expired" | "cancelled";
  purchased_at: string;
  expires_at: string;
  amount_paid: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SubscriptionListResponse {
  subscriptions: UserSubscription[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ActiveSubscriptionResponse {
  subscription: UserSubscription | null;
}

/* =======================
   API
======================= */

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
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
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({

    /* ---------- Buy Plan ---------- */
    buyPlan: builder.mutation<ApiResponse<UserSubscription>, { planId: string }>({
      query: (data) => ({
        url: "/subscriptions/buy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    /* ---------- Get My Active Subscription ---------- */
    getMySubscription: builder.query<ApiResponse<ActiveSubscriptionResponse>, void>({
      query: () => "/subscriptions/my",
      providesTags: ["Subscription"],
    }),

    /* ---------- Get Subscription History ---------- */
    getSubscriptionHistory: builder.query<
      ApiResponse<SubscriptionListResponse>,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: "/subscriptions/history",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Subscription"],
    }),

    /* ---------- Cancel Subscription ---------- */
    cancelSubscription: builder.mutation<ApiResponse<UserSubscription>, string>({
      query: (subscriptionId) => ({
        url: `/subscriptions/cancel/${subscriptionId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Subscription"],
    }),

    /* ---------- Admin: Get All Subscriptions ---------- */
    getAllSubscriptions: builder.query<
      ApiResponse<SubscriptionListResponse>,
      { page?: number; limit?: number; status?: string } | void
    >({
      query: (params) => ({
        url: "/subscriptions/all",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Subscription"],
    }),
  }),
});

/* =======================
   HOOKS
======================= */

export const {
  useBuyPlanMutation,
  useGetMySubscriptionQuery,
  useGetSubscriptionHistoryQuery,
  useCancelSubscriptionMutation,
  useGetAllSubscriptionsQuery,
} = subscriptionApi;