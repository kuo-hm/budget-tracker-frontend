import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types/user";
import { AxiosError } from "axios";
import { authService } from "@/api/auth";

export function useAuth() {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await api.get<User>("/user/me");
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            try {
              await authService.refreshToken();
              const { data } = await api.get<User>("/user/me");
              return data;
            } catch (refreshError) {
              console.error("refreshError", refreshError);
              router.push(`/auth/login`);
            }
          } else if (error.response?.status === 403) {
            router.push("/");
          }
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
  });

  const logout = async () => {
    try {
      await authService.logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/auth/login");
    }
  };

  return {
    user: user || null,
    isLoading,
    error: error as AxiosError | null,
    logout,
    isAuthenticated: !!user,
  };
}
