import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "@/api/categories";
import type { CategoryType } from "@/app/categories/page";

export function useCategories(type?: CategoryType) {
  const query = useQuery({
    queryKey: ['categories', type],
    queryFn: () => categoriesApi.getAll({ type }),
  });

  return {
    categories: query.data?.list ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
} 