import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Plan } from "./planApi";

/* =======================
   TYPES
======================= */

export interface UserSubscription {
  _id: string;
  userId: string;
  planId: Plan;
  status: "active" | "expired" | "cancelled" | "pending";
  purchased_at: string;
  expires_at: string;
  amount_paid: number;
  payment_status?: "pending" | "succeeded" | "failed" | "refunded";
  receipt_url?: string;
  createdAt: string;
  updatedAt: string;
}

// Update the Payment interface
export interface Payment {
  _id: string;
  userId: string;
  subscriptionId: string;
  planId: Plan;
  stripe_payment_intent_id: string;  // Add this field
  stripe_customer_id?: string;        // Add this field
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "refunded";
  payment_method: string;
  receipt_url: string;
  failure_message?: string;
  metadata?: Record<string, any>;
  paid_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  subscriptionId: string;
}

export interface PaymentHistoryResponse {
  payments: Payment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
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
  tagTypes: ["Subscription", "Payment"],
  endpoints: (builder) => ({

    /* ---------- Create Payment Intent ---------- */
    createPaymentIntent: builder.mutation<ApiResponse<PaymentIntentResponse>, { planId: string }>({
      query: (data) => ({
        url: "/payments/create-intent",
        method: "POST",
        body: data,
      }),
    }),

    /* ---------- Confirm Payment ---------- */
    confirmPayment: builder.mutation<ApiResponse<{ subscription: UserSubscription }>, { paymentIntentId: string }>({
      query: (data) => ({
        url: "/payments/confirm",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription", "Payment"],
    }),

    /* ---------- Get Payment History ---------- */
    getPaymentHistory: builder.query<
      ApiResponse<PaymentHistoryResponse>,
      { page?: number; limit?: number; status?: string } | void
    >({
      query: (params) => ({
        url: "/payments/history",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Payment"],
    }),

    /* ---------- Get Payment Details ---------- */
    getPaymentDetails: builder.query<ApiResponse<{ payment: Payment }>, string>({
      query: (paymentId) => `/payments/${paymentId}`,
      providesTags: (result, error, paymentId) => [{ type: "Payment", id: paymentId }],
    }),

    /* ---------- Buy Plan (Legacy - keep for compatibility) ---------- */
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
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetPaymentHistoryQuery,
  useGetPaymentDetailsQuery,
  useBuyPlanMutation,
  useGetMySubscriptionQuery,
  useGetSubscriptionHistoryQuery,
  useCancelSubscriptionMutation,
  useGetAllSubscriptionsQuery,
} = subscriptionApi;