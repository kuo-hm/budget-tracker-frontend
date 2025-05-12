"use client";

import { Suspense } from "react";
import CategoriesContent from "@/components/categories/categories-content";

export type CategoryType =
  | "INCOME"
  | "EXPENSE"
  | "TRANSFER"
  | "SAVINGS"
  | "INVESTMENT"
  | "DEBT";

export interface Category {
  id: string;
  name: string;
  description: string;
  type: CategoryType;
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}
