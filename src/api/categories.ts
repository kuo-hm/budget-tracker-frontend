"use client";

import { api } from "./index";
import type { Category, CategoryType } from "@/app/categories/page";

export interface CreateCategoryDto {
  name: string;
  description: string;
  type: CategoryType;
}

export interface UpdateCategoryDto extends CreateCategoryDto {
  id: string;
}

export interface GetCategoriesParams {
  keyword?: string;
  type?: CategoryType;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface CategoriesResponse {
  list: Category[];
  metadata: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}


export const categoriesApi = {
  getAll: async (params?: GetCategoriesParams): Promise<CategoriesResponse> => {
    const { data } = await api.get("/categories", { params });
    return data;
  },

  create: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await api.post("/categories", data);
    return response.data;
  },

  update: async (data: UpdateCategoryDto): Promise<Category> => {
    const response = await api.put(`/categories/${data.id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },

}; 