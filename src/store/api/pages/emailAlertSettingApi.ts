import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ───────────────── Types ───────────────── */

export interface EmailAlertSettings {
  _id: string;
  userId: string;
  new_content_alert: boolean;
  promotional_emails: boolean;
  workout_reminders: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailAlertApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ───────────────── API ───────────────── */

export const emailAlertSettingApi = createApi({
  reducerPath: "emailAlertSettingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/email-alert-settings`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("fitnessFlicksToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["EmailAlertSettings"],
  endpoints: (builder) => ({
    // ✅ GET SETTINGS
    getEmailAlertSettings: builder.query<
      EmailAlertApiResponse<EmailAlertSettings>,
      void
    >({
      query: () => "/",
      providesTags: ["EmailAlertSettings"],
    }),

    // ✅ UPDATE SETTINGS
    updateEmailAlertSettings: builder.mutation<
      EmailAlertApiResponse<EmailAlertSettings>,
      Partial<
        Pick<
          EmailAlertSettings,
          "new_content_alert" | "promotional_emails" | "workout_reminders"
        >
      >
    >({
      query: (body) => ({
        url: "/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["EmailAlertSettings"],
    }),
  }),
});

/* ───────────────── Hooks ───────────────── */

export const {
  useGetEmailAlertSettingsQuery,
  useUpdateEmailAlertSettingsMutation,
} = emailAlertSettingApi;