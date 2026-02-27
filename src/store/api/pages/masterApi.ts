import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   TYPES
======================= */

export interface Category {
  _id: string;
  category_name: string;
  description?: string;
  image?: string | null;
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

export interface CategoryListResponse {
  categories: Category[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* =======================
   QUERY PARAMS
======================= */

export interface CategoryListParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

/* =======================
   API
======================= */

export const masterApi = createApi({
  reducerPath: "masterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("ottplusToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    /* ---------- Category List ---------- */
   getCategories: builder.query<
  ApiResponse<CategoryListResponse>,
  CategoryListParams | void
>({
  query: (params) => ({
    url: "/categories",
    ...(params ? { params } : {}),
  }),
  providesTags: ["Category"],
}),

    /* ---------- Category By ID ---------- */
    getCategoryById: builder.query<ApiResponse<Category>, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),
  }),
});

/* =======================
   HOOKS
======================= */

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} = masterApi;
