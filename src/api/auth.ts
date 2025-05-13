"use client";

import { LoginInput, RegisterInput } from "@/lib/validators/auth";
import { authApi as axiosAuthApi } from "./index";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  errors?: Record<string, string>;
}

export const authService = {
  login: async (credentials: LoginInput): Promise<ApiResponse<AuthResponse>> => {
    try {
      const { data } = await axiosAuthApi.post("/auth/login", credentials);
      return { data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        error: "Login failed"
      };
    }
  },

  register: async (userData: RegisterInput): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Important for cookies
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          error: result.message || "Registration failed",
          errors: result.errors,
        };
      }

      return {
        data: result,
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        error: "An unexpected error occurred during registration",
      };
    }
  },

  refreshToken: async (): Promise<ApiResponse<{ accessToken: string }>> => {
    try {
      const { data } = await axiosAuthApi.post("/auth/refresh");
      return { data };
    } catch (error) {
      console.error("Refresh token error:", error);
      return {
        error: "Failed to refresh token"
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosAuthApi.post("/auth/logout", {}, {
        withCredentials: true
      });
    } finally {
      window.location.href = "/auth/login";
    }
  },
};