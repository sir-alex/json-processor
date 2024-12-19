export interface PaginatedRequest<T extends object> {
  page?: number;
  limit?: number;
  filters?: T;
}
