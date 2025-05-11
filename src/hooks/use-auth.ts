import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types/user";
import { AxiosError } from "axios";

export function useAuth() {
  const router = useRouter();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await api.get<User>("/user/me");
        return data;
      } catch (error) {
        // If the request fails with 401 or 403, clear the token and redirect to login
        if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
          localStorage.removeItem("token");
          router.push("/login");
        }
        throw error;
      }
    },
    retry: false, // Don't retry on failure
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return {
    user: user || null,
    isLoading,
    error: error as AxiosError | null,
    logout,
    isAuthenticated: !!user,
  };
} 