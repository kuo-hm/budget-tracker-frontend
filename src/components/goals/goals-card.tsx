"use client";

import type { Goals } from "@/lib/types/goals";
import { Edit2, Trash2 } from "lucide-react";

interface GoalsCardProps {
  goals: Goals;
  onEdit: (goals: Goals) => void;
  onDelete: (id: number) => void;
}

export function GoalsCard({ goals, onEdit, onDelete }: GoalsCardProps) {
  const progress = Math.min(
    (goals.currentAmount / goals.goalAmount) * 100,
    100
  );

  const isInactive = !goals.isActive;

  return (
    <div
      className={`relative border rounded-xl p-6 shadow transition-shadow flex flex-col gap-4 
        ${isInactive ? "bg-zinc-800/60 border-zinc-700 text-zinc-500 opacity-60 grayscale" : "bg-zinc-900 border-zinc-800 text-zinc-100"}
      `}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isInactive
              ? "bg-zinc-700 text-zinc-400"
              : "bg-blue-500/10 text-blue-400"
          }`}
        >
          {isInactive ? "Disabled" : "Active"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(goals)}
            className={`p-1 transition-colors cursor-pointer text-zinc-400 hover:text-blue-400`}
            aria-label="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(goals.id)}
            className={`p-1 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer `}
            aria-label="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="text-xl font-semibold">{goals.name}</div>

      <div className="w-full bg-zinc-800 rounded-full h-3 mt-2 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
            isInactive ? "bg-green-700/30" : "bg-green-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-sm mt-1">
        <span>{goals.currentAmount} saved</span>
        <span>{goals.goalAmount} goal</span>
      </div>

      <div>
        <div className="text-xs italic mt-1">
          {isInactive ? (
            "Goal canceled"
          ) : (
            <div className="flex justify-between">
              <span className="text-xs font-semibold">
                {goals.approximateDays} Days
              </span>
              <span className="text-xs font-semibold">
                {goals.approximateDays * 5} Hours
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
