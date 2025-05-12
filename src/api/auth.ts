"use client";

import { LoginInput, RegisterInput } from "@/lib/validators/auth";
import { authApi as axiosAuthApi } from "./index";
import Cookies from 'js-cookie';

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
  token: string;
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
      if (data.token) {
        Cookies.set('Authorization', data.token, { 
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
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

  logout: async (): Promise<void> => {
    try {
      await axiosAuthApi.post("/auth/logout");
    } finally {
      Cookies.remove('Authorization');
      window.location.href = "/auth/login";
    }
  },
};