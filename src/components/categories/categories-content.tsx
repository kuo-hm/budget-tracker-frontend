"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { CategoryList } from "@/components/categories/category-list";
import CategoryForm from "@/components/categories/category-form";
import { Category } from "@/app/categories/page";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function CategoriesContent() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    toast.success("Successfully added category!", {
      description: "Category added successfully!",
      duration: 3000,
    });
    handleFormClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-zinc-100">Categories</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-900 rounded-xl border border-zinc-800 p-6"
      >
        <CategoryList onEdit={handleEditClick} />
      </motion.div>

      {isFormOpen && (
        <CategoryForm
          category={selectedCategory}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
