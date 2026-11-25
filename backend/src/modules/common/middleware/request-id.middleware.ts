import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { HttpRequest, HttpResponse } from '../types/http';
import type { RequestWithId } from '../types/request';
import { getRequestPath } from '../utils/http';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestIdMiddleware.name);

  use(request: HttpRequest, response: HttpResponse, next: () => void): void {
    const incomingId = request.get('x-request-id');
    const requestId =
      incomingId && /^[a-zA-Z0-9._:-]{8,128}$/.test(incomingId) ? incomingId : randomUUID();
    const startedAt = performance.now();
    let completed = false;

    (request as RequestWithId).requestId = requestId;
    response.setHeader('x-request-id', requestId);

    const finish = (): void => {
      if (completed) {
        return;
      }
      completed = true;

      const entry = {
        event: 'http_request',
        requestId,
        method: request.method,
        path: getRequestPath(request),
        status: response.statusCode,
        durationMs: Number((performance.now() - startedAt).toFixed(1)),
      };
      const line = JSON.stringify(entry);

      if (response.statusCode >= 500) {
        this.logger.error(line);
      } else {
        this.logger.log(line);
      }
    };

    response.once('finish', finish);
    response.once('close', finish);
    next();
  }
}
