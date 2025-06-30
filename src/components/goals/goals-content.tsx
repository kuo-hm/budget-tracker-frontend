"use client";

import { GoalsCard } from "@/components/goals/goals-card";
import { GoalsFilters as Filters } from "@/components/goals/goals-filters";
import type { Goals, GoalsFilters } from "@/lib/types/goals";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { GoalsForm } from "./goals-form";

export default function GoalsContent() {
  const [filters, setFilters] = useState<GoalsFilters>({
    page: 1,
    limit: 10,
  });

  const goals: Goals[] = [
    {
      id: 1,
      name: "Emergency Fund",
      goalAmount: 1000,
      currentAmount: 650,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 2,
      name: "Vacation to Japan",
      goalAmount: 3000,
      currentAmount: 1200,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 3,
      name: "New Laptop",
      goalAmount: 1500,
      currentAmount: 1500,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 4,
      name: "Car Down Payment",
      goalAmount: 5000,
      currentAmount: 2000,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 5,
      name: "Wedding Budget",
      goalAmount: 8000,
      currentAmount: 3000,
      isActive: true,
      approximateDays: 10,
    },
    {
      id: 6,
      name: "Home Office Setup",
      goalAmount: 1000,
      currentAmount: 950,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 7,
      name: "Education Fund",
      goalAmount: 10000,
      currentAmount: 4000,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 8,
      name: "New Smartphone",
      goalAmount: 1200,
      currentAmount: 1200,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 9,
      name: "Camera Gear",
      goalAmount: 2000,
      currentAmount: 300,
      isActive: false,
      approximateDays: 10,
    },
    {
      id: 10,
      name: "Startup Capital",
      goalAmount: 25000,
      currentAmount: 5000,
      isActive: false,
      approximateDays: 10,
    },
  ];
  const [selectedGoals, setSelectedGoals] = useState<Goals | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddClick = () => {
    setSelectedGoals(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedGoals(null);
  };

  const handleFormSubmit = (data: Omit<Goals, "id" | "approximateDays">) => {
    console.log(data);
  };

  const handleEdit = (goal: Goals) => {
    setIsFormOpen(true);
    setSelectedGoals(goal);
  };

  const totalPages = 10;
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
        <h1 className="text-2xl font-semibold text-zinc-100">Goals</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Add Goal
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Filters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {goals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-zinc-400">No goals found</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {goals.map((goals) => (
              <motion.div
                key={goals.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <GoalsCard
                  goals={goals}
                  onEdit={handleEdit}
                  onDelete={() => {}}
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
            <GoalsForm
              goals={selectedGoals}
              onClose={handleFormClose}
              onSubmit={handleFormSubmit}
              isSubmitting={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
