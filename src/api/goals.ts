import { api } from './index';
import { Goals, GoalsCreatePayload, GoalsFilters, GoalsResponse } from '@/lib/types/goals';

export const goalsApi = {
  async getAll(filters: GoalsFilters): Promise<GoalsResponse> {
    const { data } = await api.get('/goals', { params: filters });
    return data;
  },

  async create(payload: GoalsCreatePayload): Promise<Goals> {
    const { data } = await api.post('/goals', payload);
    return data;
  },

  async update(id: number, payload: Partial<GoalsCreatePayload>): Promise<Goals> {
    const { data } = await api.put(`/goals/${id}`, payload);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/goals/${id}`);
  },

  async getById(id: number): Promise<Goals> {
    const { data } = await api.get(`/goals/${id}`);
    return data;
  }
}; 