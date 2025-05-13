import axios from "axios";
import { authService } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

if (typeof window !== "undefined") {
  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (value: string) => void;
    reject: (reason: unknown) => void;
  }> = [];

  const processQueue = (error: unknown = null, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });
    failedQueue = [];
  };

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await authService.refreshToken();
          if (response.data?.accessToken) {
            processQueue(null, response.data.accessToken);
            return api(originalRequest);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          window.location.href = "/auth/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}

