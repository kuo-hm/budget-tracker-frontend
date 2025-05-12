import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});


export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});


if (typeof window !== "undefined") {
  
  api.interceptors.request.use(
    (config) => {
      try {
        const token = Cookies.get("Authorization");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.warn("Failed to access cookie:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        try {
          Cookies.remove("Authorization");
          window.location.href = "/auth/login";
        } catch (error) {
          console.warn("Failed to remove cookie:", error);
        }
      }
      return Promise.reject(error);
    }
  );
}

