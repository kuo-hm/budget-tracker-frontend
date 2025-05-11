"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Edit2, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { Category, CategoryType } from "@/app/categories/page";
import { categoriesApi, type GetCategoriesParams } from "@/api/categories";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CategoryListProps {
  onEdit: (category: Category) => void;
}

const ITEMS_PER_PAGE = 10;

const CategoryList = ({ onEdit }: CategoryListProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || "name";
  const orderBy = (searchParams.get("orderBy") as "asc" | "desc") || "asc";
  const selectedType = (searchParams.get("type") as CategoryType) || "";
  const searchKeyword = searchParams.get("keyword") || "";

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "categories",
      currentPage,
      sortBy,
      orderBy,
      selectedType,
      searchKeyword,
    ],
    queryFn: async () => {
      const params: GetCategoriesParams = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sortBy,
        orderBy,
      };

      if (searchKeyword) {
        params.keyword = searchKeyword;
      }

      if (selectedType) {
        params.type = selectedType;
      }

      return categoriesApi.getAll(params);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const updateSearchParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get("keyword") as string;
    updateSearchParams({ keyword, page: "1" });
  };

  const handleSort = (field: string) => {
    const newOrderBy = sortBy === field && orderBy === "asc" ? "desc" : "asc";
    updateSearchParams({ sortBy: field, orderBy: newOrderBy });
  };

  const handleTypeChange = (type: string) => {
    updateSearchParams({ type, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage.toString() });
  };

  const getTypeColor = (type: CategoryType) => {
    switch (type) {
      case "INCOME":
        return "text-green-400";
      case "EXPENSE":
        return "text-red-400";
      case "TRANSFER":
        return "text-blue-400";
      case "SAVINGS":
        return "text-purple-400";
      case "INVESTMENT":
        return "text-yellow-400";
      case "DEBT":
        return "text-orange-400";
      default:
        return "text-zinc-400";
    }
  };

  const categoryTypes: CategoryType[] = [
    "INCOME",
    "EXPENSE",
    "TRANSFER",
    "SAVINGS",
    "INVESTMENT",
    "DEBT",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Failed to load categories</p>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["categories"] })
          }
          className="mt-4 text-blue-400 hover:text-blue-300"
        >
          Try again
        </button>
      </div>
    );
  }

  const categories = data?.list ?? [];
  const totalPages = data?.metadata.totalPages ?? 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              name="keyword"
              defaultValue={searchKeyword}
              placeholder="Search categories..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
          </div>
        </form>

        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {categoryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 text-sm text-zinc-400 border-b border-zinc-800 pb-2">
        <button
          onClick={() => handleSort("name")}
          className="text-left hover:text-zinc-100 transition-colors"
        >
          Name {sortBy === "name" && (orderBy === "asc" ? "↑" : "↓")}
        </button>
        <div>Description</div>
        <button
          onClick={() => handleSort("type")}
          className="text-left hover:text-zinc-100 transition-colors"
        >
          Type {sortBy === "type" && (orderBy === "asc" ? "↑" : "↓")}
        </button>
        <div>Actions</div>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zinc-400">No categories found</p>
        </div>
      ) : (
        <>
          {categories.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-4 py-3 text-sm border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
            >
              <div className="text-zinc-100">{category.name}</div>
              <div className="text-zinc-400">{category.description}</div>
              <div className={getTypeColor(category.type)}>{category.type}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(category as Category)}
                  className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span className="text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryList;
