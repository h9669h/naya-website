import type { HttpRequest } from '../types/http';

export const getRequestPath = (request: HttpRequest): string => {
  const requestUrl = request.originalUrl ?? request.url ?? '/';
  return requestUrl.split('?')[0] ?? '/';
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);
