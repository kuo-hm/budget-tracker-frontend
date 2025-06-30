export type GoalsType = 'INCOME' | 'EXPENSE';

export interface Goals {
  id: number;
  name: string;
  goalAmount: number;
  currentAmount:number;
  isActive:boolean;
  approximateDays:number;
}

export interface GoalsCreatePayload {
  name: string;
  description: string;
  amount: number;
  type: GoalsType;
  date: string;
  categoryId: number;
}

export interface GoalsFilters {
  keyword?: string;
  type?: GoalsType;
  sortBy?: 'goalsDate';
  orderBy?: 'ASC' | 'DESC';
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
}

export interface GoalsResponse {
  list: Goals[];
  metadata: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
} 