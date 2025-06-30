"use client";

import type { Goals } from "@/lib/types/goals";
import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

interface GoalsFormProps {
  goals?: Goals | null;
  onClose: () => void;
  onSubmit: (data: Omit<Goals, "id"|"approximateDays">) => void;
  isSubmitting: boolean;
}

export function GoalsForm({
  goals,
  onClose,
  onSubmit,
  isSubmitting,
}: GoalsFormProps) {
  const [formData, setFormData] = useState<Omit<Goals, "id"|"approximateDays">>({
    name: "",
    goalAmount: 0,
    currentAmount: 0,
    isActive: false,
  });

  useEffect(() => {
    if (goals) {
      setFormData({
        name: goals.name,
        goalAmount: goals.goalAmount,
        currentAmount: goals.currentAmount,
        isActive: goals.isActive,
      });
    }
  }, [goals]);

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
          {goals ? "Edit Goal" : "Add Goal"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Goal Name
            </label>
            <input
              id="name"
              type="text"
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
              htmlFor="goalAmount"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Goal Amount
            </label>
            <input
              id="goalAmount"
              type="number"
              step="0.01"
              min="0"
              value={formData.goalAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goalAmount: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="currentAmount"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Current Amount
            </label>
            <input
              id="currentAmount"
              type="number"
              step="0.01"
              min="0"
              value={formData.currentAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentAmount: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch 
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
              disabled={isSubmitting}
              className="text-blue-500 bg-zinc-800 border-zinc-600  focus:ring-2 focus:ring-blue-500"
            />
            
            <label htmlFor="isActive" className="text-sm text-zinc-300">
              Set as active goal
            </label>
            <div className="relative group cursor-pointer">
              <Info size={16} className="text-zinc-400" />
              <div className="absolute left-6 top-1 text-xs px-3 py-2 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-lg w-60 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Only one goal can be active at a time. Setting this goal as active will deactivate any other active goals.
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {goals ? "Updating..." : "Creating..."}
                </div>
              ) : goals ? (
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
