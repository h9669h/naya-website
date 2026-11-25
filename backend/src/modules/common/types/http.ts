import type { IncomingMessage, ServerResponse } from 'node:http';

export interface HttpRequest extends IncomingMessage {
  originalUrl?: string;
  ip?: string;
  get(name: string): string | undefined;
}

export interface HttpResponse extends ServerResponse {
  status(statusCode: number): this;
  json(body: unknown): this;
}
