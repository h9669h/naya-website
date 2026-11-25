import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { HttpResponse } from '../types/http';
import { map, type Observable } from 'rxjs';
import { normalizeApiPrefix } from '../../../config/configuration';
import { SKIP_RESPONSE_WRAP_KEY } from '../decorators/skip-response-wrap.decorator';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import type { ApiResponse } from '../dto/api-response.dto';
import type { PaginationResult } from '../dto/pagination-meta.dto';
import type { RequestWithId } from '../types/request';
import { getRequestPath } from '../utils/http';

const isPaginationResult = (value: unknown): value is PaginationResult<unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    Array.isArray(candidate.data) && typeof candidate.meta === 'object' && candidate.meta !== null
  );
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly docsPath: string;

  constructor(
    private readonly reflector: Reflector,
    config: ConfigService,
  ) {
    const prefix = normalizeApiPrefix(config.getOrThrow<string>('apiPrefix'));
    this.docsPath = `/${prefix}/docs`;
  }

  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestWithId>();
    const response = context.switchToHttp().getResponse<HttpResponse>();
    const path = getRequestPath(request);
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_RESPONSE_WRAP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (
      skip ||
      path === this.docsPath ||
      path.startsWith(`${this.docsPath}/`) ||
      path.startsWith(`${this.docsPath}-`) ||
      response.statusCode === 204
    ) {
      return next.handle();
    }

    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ?? '请求成功';

    return next.handle().pipe(
      map((value: unknown): ApiResponse<unknown> => {
        if (isPaginationResult(value)) {
          return {
            success: true,
            message,
            data: value.data,
            meta: value.meta,
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: true,
          message,
          data: value,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
