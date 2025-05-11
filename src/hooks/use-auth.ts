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
        
        if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
          localStorage.removeItem("Authorization");
          router.push("/auth/login");
        }
        throw error;
      }
    },
    retry: false, 
    staleTime: 1000 * 60 * 5, 
  });

  const logout = () => {
    localStorage.removeItem("Authorization");
    router.push("/auth/login");
  };

  return {
    user: user || null,
    isLoading,
    error: error as AxiosError | null,
    logout,
    isAuthenticated: !!user,
  };
} 