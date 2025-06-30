"use client";

import { Search } from "lucide-react";
import type {
  GoalsFilters,
  GoalsType,
} from "@/lib/types/goals";

interface GoalsFiltersProps {
  filters: GoalsFilters;
  onFiltersChange: (filters: GoalsFilters) => void;
}

export function GoalsFilters({
  filters,
  onFiltersChange,
}: GoalsFiltersProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, page: 1 });
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={filters.keyword || ""}
            onChange={(e) =>
              onFiltersChange({ ...filters, keyword: e.target.value })
            }
            placeholder="Search goalss..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
        </div>
      </form>

      <select
        value={filters.type || ""}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            type: e.target.value as GoalsType,
          })
        }
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Types</option>
        <option value="active">Active</option>
        <option value="in-active">In-Active</option>
      </select>
    
    </div>
  );
}
