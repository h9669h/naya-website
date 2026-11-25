import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const trim = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

const trimOptional = ({ value }: TransformFnParams): unknown => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export class CreateContactMessageDto {
  @ApiProperty({ example: '陈晨', minLength: 2, maxLength: 80 })
  @Transform(trim)
  @IsString()
  @Length(2, 80)
  name!: string;

  @ApiProperty({ example: 'chen.chen@example.com', format: 'email', maxLength: 254 })
  @Transform(trim)
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiPropertyOptional({ example: '+86 138 0000 2026', maxLength: 32 })
  @Transform(trimOptional)
  @IsOptional()
  @IsString()
  @Matches(/^[+()\d\s-]{7,32}$/, { message: 'phone 必须是有效的联系电话' })
  @MaxLength(32)
  phone?: string;

  @ApiPropertyOptional({ example: '远航科技有限公司', maxLength: 120 })
  @Transform(trimOptional)
  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  @ApiPropertyOptional({ example: '企业 AI 平台建设咨询', maxLength: 160 })
  @Transform(trimOptional)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  subject?: string;

  @ApiProperty({
    example: '我们希望搭建一套面向业务团队的 AI 知识助手。',
    minLength: 10,
    maxLength: 3000,
  })
  @Transform(trim)
  @IsString()
  @MinLength(10)
  @MaxLength(3000)
  message!: string;

  @ApiPropertyOptional({
    writeOnly: true,
    description: 'Honeypot field; leave this empty',
    maxLength: 200,
  })
  @Transform(trimOptional)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}
