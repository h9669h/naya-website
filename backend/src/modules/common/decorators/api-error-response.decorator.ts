import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

export const ApiErrorResponse = (status = 400): MethodDecorator & ClassDecorator =>
  applyDecorators(
    ApiExtraModels(ErrorResponseDto),
    ApiResponse({ status, type: ErrorResponseDto }),
  );

export const ApiCommonErrors = (): MethodDecorator & ClassDecorator =>
  applyDecorators(
    ApiErrorResponse(400),
    ApiErrorResponse(404),
    ApiErrorResponse(429),
    ApiErrorResponse(500),
  );
