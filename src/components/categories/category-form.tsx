"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Category, CategoryType } from "@/app/categories/page";
import { categoriesApi } from "@/api/categories";
import { useMutation } from "@tanstack/react-query";

interface CategoryFormProps {
  category?: Category | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const CategoryForm = ({ category, onClose, onSuccess }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "INCOME" as CategoryType,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        type: category.type,
      });
    }
  }, [category]);

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => categoriesApi.create(data),
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: typeof formData & { id: string }) =>
      categoriesApi.update(data),
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (category) {
      updateMutation.mutate({ id: category.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  const categoryTypes: CategoryType[] = [
    "INCOME",
    "EXPENSE",
    "TRANSFER",
    "SAVINGS",
    "INVESTMENT",
    "DEBT",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-zinc-100">
            {category ? "Edit Category" : "Add Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">Failed to save category</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
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
                  type: e.target.value as CategoryType,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            >
              {categoryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-zinc-100 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {category ? "Updating..." : "Creating..."}
                </div>
              ) : category ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
