import axios from "axios";

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

