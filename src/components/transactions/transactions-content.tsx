"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Transaction,
  TransactionCreatePayload,
  TransactionFilters,
} from "@/lib/types/transaction";
import { useTransactions } from "@/hooks/use-transactions";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionFilters as Filters } from "@/components/transactions/transaction-filters";
import { TransactionCard } from "@/components/transactions/transaction-card";

export default function TransactionsContent() {
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <p className="text-red-400">Failed to load transactions</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-400 hover:text-blue-300"
        >
          Try again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-4"
      >
        <h1 className="text-2xl font-semibold text-zinc-100">Transactions</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Add Transaction
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Filters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {transactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-zinc-400">No transactions found</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <TransactionCard
                  transaction={transaction}
                  onEdit={handleEditClick}
                  onDelete={deleteTransaction}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center items-center pt-8 gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
        <span className="text-zinc-400">
          Page {filters.page} of {totalPages}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TransactionForm
              transaction={selectedTransaction}
              onClose={handleFormClose}
              onSubmit={handleFormSubmit}
              isSubmitting={isCreating || isUpdating}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
