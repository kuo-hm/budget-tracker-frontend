export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  type: TransactionType;
  transactionCategory: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    type: TransactionType;
  };
  transactionDate: string;
}

export interface TransactionCreatePayload {
  name: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: number;
}

export interface TransactionFilters {
  keyword?: string;
  type?: TransactionType;
  sortBy?: 'transactionDate';
  orderBy?: 'ASC' | 'DESC';
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
}

export interface TransactionResponse {
  list: Transaction[];
  metadata: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
} 