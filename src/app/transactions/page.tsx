"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type {
  Transaction,
  TransactionCreatePayload,
  TransactionFilters,
} from "@/lib/types/transaction";
import { useTransactions } from "@/hooks/use-transactions";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionFilters as Filters } from "@/components/transactions/transaction-filters";
import { TransactionCard } from "@/components/transactions/transaction-card";

export default function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 10,
  });
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    transactions,
    totalPages,
    isLoading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    isCreating,
    isUpdating,
  } = useTransactions(filters);

  const handleAddClick = () => {
    setSelectedTransaction(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedTransaction(null);
  };

  const handleFormSubmit = (data: TransactionCreatePayload) => {
    if (selectedTransaction) {
      updateTransaction({ id: selectedTransaction.id, data });
    } else {
      createTransaction(data);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Failed to load transactions</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-400 hover:text-blue-300"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">Transactions</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Add Transaction"
        >
          <span className="text-2xl font-bold">+</span>
        </button>
      </div>

      <Filters filters={filters} onFiltersChange={setFilters} />

      {transactions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zinc-400">No transactions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onEdit={handleEditClick}
              onDelete={deleteTransaction}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center pt-8 gap-4">
        <button
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: Math.max((prev.page ?? 1) - 1, 1),
            }))
          }
          disabled={filters.page === 1}
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
          Previous
        </button>
        <span className="text-zinc-400">
          Page {filters.page} of {totalPages}
        </span>
        <button
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: Math.min((prev.page ?? 1) + 1, totalPages),
            }))
          }
          disabled={filters.page === totalPages}
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>

      {isFormOpen && (
        <TransactionForm
          transaction={selectedTransaction}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          isSubmitting={isCreating || isUpdating}
        />
      )}
    </div>
  );
}
