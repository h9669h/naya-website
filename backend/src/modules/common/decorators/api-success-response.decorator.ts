import { applyDecorators, type Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationMetaDto } from '../dto/pagination-meta.dto';

interface SuccessSchemaOptions {
  isArray?: boolean;
  paginated?: boolean;
  description?: string;
}

interface SuccessSchemaProperty {
  type?: string;
  format?: string;
  example?: unknown;
  $ref?: string;
  items?: { $ref: string };
}

export const createSuccessResponseOptions = <T>(
  model: Type<T>,
  options: SuccessSchemaOptions = {},
): { description: string; schema: Record<string, unknown> } => {
  const reference = { $ref: getSchemaPath(model) };
  const properties: Record<string, SuccessSchemaProperty> = {
    success: { type: 'boolean', example: true },
    message: { type: 'string', example: '请求成功' },
    data: options.isArray ? { type: 'array', items: reference } : reference,
    timestamp: { type: 'string', format: 'date-time' },
  };

  if (options.paginated) {
    properties.meta = { $ref: getSchemaPath(PaginationMetaDto) };
  }

  return {
    description: options.description ?? '请求成功',
    schema: {
      type: 'object',
      required: ['success', 'message', 'data', 'timestamp'],
      properties,
    },
  };
};

export const ApiSuccessResponse = <T>(
  model: Type<T>,
  options: SuccessSchemaOptions = {},
): MethodDecorator =>
  applyDecorators(
    ApiExtraModels(model, ...(options.paginated ? [PaginationMetaDto] : [])),
    ApiResponse({
      status: 200,
      ...createSuccessResponseOptions(model, options),
    }),
  );

export const createStringArrayResponseOptions = (
  description = '请求成功',
): { description: string; schema: Record<string, unknown> } => ({
  description,
  schema: {
    type: 'object',
    required: ['success', 'message', 'data', 'timestamp'],
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string', example: '请求成功' },
      data: { type: 'array', items: { type: 'string' } },
      timestamp: { type: 'string', format: 'date-time' },
    },
  },
});
