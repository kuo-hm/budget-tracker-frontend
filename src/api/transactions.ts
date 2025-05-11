import { api } from './index';
import { Transaction, TransactionCreatePayload, TransactionFilters, TransactionResponse } from '@/lib/types/transaction';

export const transactionsApi = {
  async getAll(filters: TransactionFilters): Promise<TransactionResponse> {
    const { data } = await api.get('/transactions', { params: filters });
    return data;
  },

  async create(payload: TransactionCreatePayload): Promise<Transaction> {
    const { data } = await api.post('/transactions', payload);
    return data;
  },

  async update(id: number, payload: Partial<TransactionCreatePayload>): Promise<Transaction> {
    const { data } = await api.put(`/transactions/${id}`, payload);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },

  async getById(id: number): Promise<Transaction> {
    const { data } = await api.get(`/transactions/${id}`);
    return data;
  }
}; 