import { BadRequestException } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

export interface ValidationDetail {
  field: string;
  constraints: Record<string, string>;
}

const collectDetails = (errors: ValidationError[], parent = ''): ValidationDetail[] =>
  errors.flatMap((error) => {
    const field = parent ? `${parent}.${error.property}` : error.property;
    if (error.children?.length) {
      return collectDetails(error.children, field);
    }

    return [{ field, constraints: error.constraints ?? {} }];
  });

export const validationExceptionFactory = (errors: ValidationError[]): BadRequestException =>
  new BadRequestException({
    code: 'VALIDATION_ERROR',
    message: '请求参数校验失败',
    details: collectDetails(errors),
  });
