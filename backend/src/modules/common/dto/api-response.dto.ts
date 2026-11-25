import type { PaginationMeta } from './pagination-meta.dto';

export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}
