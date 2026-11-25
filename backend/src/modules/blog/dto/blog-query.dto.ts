import { Transform, type TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

const trimOptional = ({ value }: TransformFnParams): unknown => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export class BlogQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'AI 实践', maxLength: 60 })
  @Transform(trimOptional)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  category?: string;
}
