import type { HttpRequest } from './http';

export type RequestWithId = HttpRequest & { requestId?: string };
