export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateResult<T = any> {
  success: true;
  data: T;
}

export interface ErrorResult {
  success: false;
  error: string;
}

export type ActionResult<T = any> = CreateResult<T> | ErrorResult;

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
