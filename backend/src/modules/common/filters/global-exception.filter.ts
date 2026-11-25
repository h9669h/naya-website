import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { HttpResponse } from '../types/http';
import { getRequestPath } from '../utils/http';
import { isRecord } from '../utils/json';
import type { ErrorPayloadDto, ErrorResponseDto } from '../dto/error-response.dto';
import type { RequestWithId } from '../types/request';

const statusMessages: Partial<Record<number, string>> = {
  [HttpStatus.BAD_REQUEST]: '请求参数错误',
  [HttpStatus.UNAUTHORIZED]: '身份认证失败',
  [HttpStatus.FORBIDDEN]: '无权访问该资源',
  [HttpStatus.NOT_FOUND]: '请求的资源不存在',
  [HttpStatus.CONFLICT]: '资源状态冲突',
  [HttpStatus.PAYLOAD_TOO_LARGE]: '请求内容过大',
  [HttpStatus.UNPROCESSABLE_ENTITY]: '请求内容无法处理',
  [HttpStatus.TOO_MANY_REQUESTS]: '请求过于频繁，请稍后再试',
};

const defaultCodes: Partial<Record<number, string>> = {
  [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
  [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
  [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
  [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
  [HttpStatus.CONFLICT]: 'CONFLICT',
  [HttpStatus.PAYLOAD_TOO_LARGE]: 'PAYLOAD_TOO_LARGE',
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'UNPROCESSABLE_ENTITY',
  [HttpStatus.TOO_MANY_REQUESTS]: 'RATE_LIMIT_EXCEEDED',
};

const prismaErrorMap: Record<string, { status: number; code: string; message: string }> = {
  P2002: { status: 409, code: 'RESOURCE_CONFLICT', message: '资源已存在' },
  P2003: { status: 409, code: 'FOREIGN_KEY_CONFLICT', message: '关联资源不存在' },
  P2014: { status: 400, code: 'INVALID_RELATION', message: '关联关系无效' },
  P2015: { status: 404, code: 'NOT_FOUND', message: '请求的资源不存在' },
  P2016: { status: 400, code: 'INVALID_ARGUMENT', message: '请求参数错误' },
  P2025: { status: 404, code: 'NOT_FOUND', message: '请求的资源不存在' },
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<RequestWithId>();
    const response = http.getResponse<HttpResponse>();
    const path = getRequestPath(request);
    const requestId = request.requestId ?? 'unknown';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let payload: ErrorPayloadDto = {
      code: 'INTERNAL_ERROR',
      message: '服务器内部错误',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body: unknown = exception.getResponse();
      payload = {
        code: defaultCodes[status] ?? 'HTTP_ERROR',
        message: statusMessages[status] ?? exception.message,
      };

      if (isRecord(body)) {
        if (typeof body.code === 'string') {
          payload.code = body.code;
        }
        if (typeof body.message === 'string') {
          payload.message = body.message;
        }
        if ('details' in body && body.details !== undefined) {
          payload.details = body.details;
        }
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = prismaErrorMap[exception.code];
      status = mapped?.status ?? 500;
      payload = mapped ?? { code: 'DATABASE_ERROR', message: '数据库操作失败' };
      this.logDatabaseError(exception.code, requestId, path);
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      payload = { code: 'DATABASE_VALIDATION_ERROR', message: '服务器数据配置错误' };
      this.logger.error(JSON.stringify({ event: 'database_validation_error', requestId, path }));
    } else if (exception instanceof Error) {
      this.logger.error(
        JSON.stringify({
          event: 'unhandled_error',
          requestId,
          method: request.method,
          path,
          errorName: exception.name,
          stack: exception.stack,
        }),
      );
    } else {
      this.logger.error(
        JSON.stringify({ event: 'unhandled_error', requestId, method: request.method, path }),
      );
    }

    const errorResponse: ErrorResponseDto = {
      success: false,
      error: payload,
      timestamp: new Date().toISOString(),
      path,
    };

    if (response.headersSent) {
      response.end();
      return;
    }

    response.status(status).json(errorResponse);
  }

  private logDatabaseError(code: string, requestId: string, path: string): void {
    this.logger.error(JSON.stringify({ event: 'database_error', code, requestId, path }));
  }
}
