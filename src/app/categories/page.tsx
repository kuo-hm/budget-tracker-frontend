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
  return <CategoriesContent />;
} 