export interface PaginatedRequest<T extends object> {
  fields?: string[];
  page?: number;
  limit?: number;
  filters?: T;
}
