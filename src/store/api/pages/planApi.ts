import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   TYPES
======================= */

export interface Plan {
  _id: string;
  plan_name: string;
  monthly_price: number;
  video_sound_quality: "Poor" | "Fair" | "Good" | "Very Good" | "Excellent" | "Ultimate";
  resolution: "480p" | "720p" | "1080p" | "1440p" | "4K" | "8K";
  duration: number;
  supported_devices: string[];
  watch_same_time: number;
  is_active: boolean;
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

export interface PlanListResponse {
  plans: Plan[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* =======================
   CREATE/UPDATE TYPES
======================= */

export interface CreatePlanRequest {
  plan_name: string;
  monthly_price: number;
  video_sound_quality: Plan["video_sound_quality"];
  resolution: Plan["resolution"];
  duration: number;
  supported_devices: string[] | string;
  watch_same_time: number;
  is_active?: boolean;
}

export interface UpdatePlanRequest extends Partial<CreatePlanRequest> {
  _id?: string;
}

/* =======================
   QUERY PARAMS
======================= */

export interface PlanListParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean | string;
  duration?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

/* =======================
   API
======================= */

export const planApi = createApi({
  reducerPath: "planApi",
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
  tagTypes: ["Plan"],
  endpoints: (builder) => ({
    /* ---------- Create Plan ---------- */
    createPlan: builder.mutation<ApiResponse<Plan>, CreatePlanRequest>({
      query: (data) => ({
        url: "/plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),

    /* ---------- Plan List ---------- */
    getPlans: builder.query<ApiResponse<PlanListResponse>, PlanListParams | void>({
      query: (params) => ({
        url: "/plans",
        ...(params ? { params } : {}),
      }),
      providesTags: ["Plan"],
    }),

    /* ---------- Plan By ID ---------- */
    getPlanById: builder.query<ApiResponse<Plan>, string>({
      query: (id) => `/plans/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Plan", id }],
    }),

    /* ---------- Update Plan ---------- */
    updatePlan: builder.mutation<ApiResponse<Plan>, { id: string; data: UpdatePlanRequest }>({
      query: ({ id, data }) => ({
        url: `/plans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Plan",
        { type: "Plan", id },
      ],
    }),

    /* ---------- Delete Plan ---------- */
    deletePlan: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plan"],
    }),
  }),
});

/* =======================
   HOOKS
======================= */

export const {
  useCreatePlanMutation,
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = planApi;