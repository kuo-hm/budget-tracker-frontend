'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { transactionsApi } from '@/api/transactions';
import { categoriesApi } from '@/api/categories';
import type { Category } from '@/app/categories/page';
import { Transaction, TransactionCreatePayload, TransactionFilters, TransactionType } from '@/lib/types/transaction';
import { format } from 'date-fns';
import { Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md relative border border-zinc-800 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-100"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 10,

  });
  const [formData, setFormData] = useState<TransactionCreatePayload>({
    name: '',
    description: '',
    amount: 0,
    type: 'EXPENSE',
    date: new Date().toISOString(),
    categoryId: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await transactionsApi.getAll(filters);
      setTransactions(response.list);
      setTotalPages(response.metadata.totalPages);
    } catch (err) {
      console.error('Error loading transactions:', err);
      setError('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, [filters, loadTransactions]);

  const loadCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.list);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({
      name: '',
      description: '',
      amount: 0,
      type: 'EXPENSE',
      date: new Date().toISOString(),
      categoryId: 0
    });
    setModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    setEditId(transaction.id);
    setFormData({
      name: '',
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      date: new Date(transaction.transactionDate).toISOString(),
      categoryId: transaction.transactionCategory.id,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setFormData({
      name: '',
      description: '',
      amount: 0,
      type: 'EXPENSE',
      date: new Date().toISOString(),
      categoryId: 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await transactionsApi.update(editId, formData);
      } else {
        await transactionsApi.create(formData);
      }
      loadTransactions();
      closeModal();
    } catch (err) {
      console.error('Error submitting transaction:', err);
      setError(editId ? 'Failed to update transaction' : 'Failed to create transaction');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await transactionsApi.delete(id);
      loadTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Failed to delete transaction');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
  };

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
          onClick={loadTransactions}
          className="mt-4 text-blue-400 hover:text-blue-300"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">Transactions</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Add Transaction"
        >
          <span className="text-2xl font-bold">+</span>
        </button>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={filters.keyword || ''}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              placeholder="Search transactions..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
          </div>
        </form>
        <select
          value={filters.type || ''}
          onChange={(e) => setFilters({ ...filters, type: e.target.value as TransactionType })}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
        <div className="flex gap-2">
          <input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Transaction Cards Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-400">{error}</p>
          <button
            onClick={loadTransactions}
            className="mt-4 text-blue-400 hover:text-blue-300"
          >
            Try again
          </button>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zinc-400">No transactions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow flex flex-col gap-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${transaction.type === 'INCOME' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{transaction.type}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(transaction)}
                    className="p-1 text-zinc-400 hover:text-blue-400 transition-colors"
                    aria-label="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="p-1 text-zinc-400 hover:text-red-400 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-lg font-semibold text-zinc-100">{transaction.description}</div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <span>{transaction.transactionCategory.name}</span>
                <span>•</span>
                <span>{format(new Date(transaction.transactionDate), 'MMM dd, yyyy')}</span>
              </div>
              <div className="text-2xl font-bold mt-2 {transaction.type === 'INCOME' ? 'text-green-400' : 'text-red-400' }">
                {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center pt-8 gap-4">
        <button
          onClick={() => setFilters(prev => ({ ...prev, page: Math.max((prev.page || 1) - 1, 1) }))}
          disabled={filters.page === 1}
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
          Previous
        </button>
        <span className="text-zinc-400">
          Page {filters.page} of {totalPages}
        </span>
        <button
          onClick={() => setFilters(prev => ({ ...prev, page: Math.min((prev.page || 1) + 1, totalPages) }))}
          disabled={filters.page === totalPages}
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Modal for Add/Edit Transaction */}
      <Modal open={modalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4 text-zinc-100">{editId ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-zinc-400 mb-1">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-zinc-400 mb-1">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-zinc-400 mb-1">
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType, categoryId: 0 })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-zinc-400 mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={formData.date.split('T')[0]}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-400 mb-1">
              Category
            </label>
            <select
              id="category"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.filter(cat => cat.type === formData.type).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 