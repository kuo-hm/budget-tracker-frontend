import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Base axios instance for authentication endpoints
export const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Axios instance for authenticated API calls
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Only add interceptors on the client side
if (typeof window !== "undefined") {
  // Add a request interceptor for authenticated API calls
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Authorization");
      console.log("token", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor for authenticated API calls
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("Authorization");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  );
}

