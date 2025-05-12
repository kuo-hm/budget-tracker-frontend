"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type {
  Transaction,
  TransactionCreatePayload,
  TransactionType,
} from "@/lib/types/transaction";
import { useCategories } from "@/hooks/use-categories";

interface TransactionFormProps {
  transaction?: Transaction | null;
  onClose: () => void;
  onSubmit: (data: TransactionCreatePayload) => void;
  isSubmitting: boolean;
}

export function TransactionForm({
  transaction,
  onClose,
  onSubmit,
  isSubmitting,
}: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionCreatePayload>({
    name: "",
    description: "",
    amount: 0,
    type: "EXPENSE",
    date: new Date().toISOString(),
    categoryId: 0,
  });

  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useCategories();

  useEffect(() => {
    if (transaction) {
      setFormData({
        name: transaction.name,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        date: new Date(transaction.transactionDate).toISOString(),
        categoryId: transaction.transactionCategory.id,
      });
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md relative border border-zinc-800 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-zinc-100">
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                  name: e.target.value,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as TransactionType,
                  categoryId: 0,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={formData.date.split("T")[0]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: new Date(e.target.value).toISOString(),
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoryId: parseInt(e.target.value),
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting || isLoadingCategories}
            >
              <option value="">Select Category</option>
              {isLoadingCategories ? (
                <option value="" disabled>
                  Loading categories...
                </option>
              ) : categoriesError ? (
                <option value="" disabled>
                  Failed to load categories
                </option>
              ) : categories.length === 0 ? (
                <option value="" disabled>
                  No categories available
                </option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isSubmitting ||
                isLoadingCategories ||
                Boolean(categoriesError) ||
                categories.length === 0
              }
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {transaction ? "Updating..." : "Creating..."}
                </div>
              ) : transaction ? (
                "Update"
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
