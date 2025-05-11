import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsApi } from "@/api/transactions";
import type { TransactionCreatePayload, TransactionFilters } from "@/lib/types/transaction";

export function useTransactions(filters: TransactionFilters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionsApi.getAll(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: TransactionCreatePayload) => transactionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TransactionCreatePayload }) =>
      transactionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => transactionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return {
    transactions: query.data?.list ?? [],
    totalPages: query.data?.metadata.totalPages ?? 1,
    isLoading: query.isLoading,
    error: query.error,
    createTransaction: createMutation.mutate,
    updateTransaction: updateMutation.mutate,
    deleteTransaction: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
} 