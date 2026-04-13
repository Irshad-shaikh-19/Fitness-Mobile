import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

// Create axios instance
const axiosServices = axios.create({
  baseURL: BACKEND_URL + "/api",
  withCredentials: true,
});

// Request interceptor
axiosServices.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem("fitnessFlicksToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// Response interceptor
axiosServices.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // Only auto-redirect on 401 for protected routes, NOT for login/auth endpoints
    if (
      status === 401 &&
      !window.location.pathname.includes("/login") &&
      !url.includes("/user/login") &&
      !url.includes("/user/verify-otp") &&
      !url.includes("/user/register")
    ) {
      localStorage.removeItem("fitnessFlicksToken");
      window.location.href = "/login";
    }

    if (status === 500) {
      console.error("Internal Server Error:", error);
    }

    return Promise.reject(error);
  }
);

export default axiosServices;

// Type definitions for fetcher functions
type FetcherArgs = string | [string, AxiosRequestConfig?];
type FetcherPostArgs<T = unknown> = string | [string, T?, AxiosRequestConfig?];

// GET fetcher
export const fetcher = async <T = unknown>(args: FetcherArgs): Promise<T> => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosServices.get<T>(url, config);
  return res.data;
};

// POST fetcher
export const fetcherPost = async <T = unknown, D = unknown>(
  args: FetcherPostArgs<D>
): Promise<T> => {
  const [url, data, config] = Array.isArray(args)
    ? args
    : [args, undefined, undefined];
  const res = await axiosServices.post<T>(url, data, config);
  return res.data;
};

// PUT fetcher
export const fetcherUpdate = async <T = unknown, D = unknown>(
  args: FetcherPostArgs<D>
): Promise<T> => {
  const [url, data, config] = Array.isArray(args)
    ? args
    : [args, undefined, undefined];
  const res = await axiosServices.put<T>(url, data, config);
  return res.data;
};

// DELETE fetcher
export const fetcherDelete = async <T = unknown>(
  args: FetcherArgs
): Promise<T> => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosServices.delete<T>(url, config);
  return res.data;
};