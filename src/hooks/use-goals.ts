import { goalsApi } from "@/api/goals";
import { GoalsCreatePayload, GoalsFilters } from "@/lib/types/goals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGoals(filters: GoalsFilters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["goals", filters],
    queryFn: () => goalsApi.getAll(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: GoalsCreatePayload) => goalsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Successfully added goal!", {
        description: "Goal added successfully!",
        duration: 3000,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: GoalsCreatePayload }) =>
      goalsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Successfully updated goal!", {
        description: "Goal updated successfully!",
        duration: 3000,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => goalsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Successfully deleted goal!", {
        description: "Goal deleted successfully!",
        duration: 3000,
      });
    },
  });

  return {
    goals: [],
    totalPages: 10,
    isLoading: false,
    error: false,
    createGoal: createMutation.mutate,
    updateGoal: updateMutation.mutate,
    deleteGoal: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
