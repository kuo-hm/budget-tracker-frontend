"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { Category, CategoryType } from "@/app/categories/page";
import { categoriesApi, type GetCategoriesParams } from "@/services/api/categories";

interface CategoryListProps {
  onEdit: (category: Category) => void;
}

const ITEMS_PER_PAGE = 10;

const CategoryList = ({ onEdit }: CategoryListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedType, setSelectedType] = useState<CategoryType | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<string>("name");
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
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

      const response = await categoriesApi.getAll(params);
      setCategories(response.list);
      setTotalPages(response.metadata.totalPages);
    } catch (err) {
      setError("Failed to load categories");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, sortBy, orderBy, selectedType]);

  const handleDelete = async (id: string) => {
    try {
      await categoriesApi.delete(id);
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCategories();
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrderBy(orderBy === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrderBy("asc");
    }
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
        <p className="text-red-400">{error}</p>
        <button
          onClick={fetchCategories}
          className="mt-4 text-blue-400 hover:text-blue-300"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search categories..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
          </div>
        </form>

        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value as CategoryType | "");
            setCurrentPage(1);
          }}
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
                  onClick={() => onEdit(category)}
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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