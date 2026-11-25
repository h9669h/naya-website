import { ApiProperty } from '@nestjs/swagger';

export class BlogPostDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'enterprise-ai-from-poc-to-production' })
  slug!: string;

  @ApiProperty({ example: '企业 AI 如何从概念验证走向规模化生产' })
  title!: string;

  @ApiProperty({ example: '以业务价值为起点，建立可评估、可治理、可持续的 AI 工程体系。' })
  excerpt!: string;

  @ApiProperty({ example: 'https://picsum.photos/seed/nova-blog-ai-production/1200/675' })
  coverImage!: string;

  @ApiProperty({ example: '林知远' })
  author!: string;

  @ApiProperty({ example: 'AI 实践' })
  category!: string;

  @ApiProperty({ type: [String], example: ['生成式 AI', 'MLOps'] })
  tags!: string[];

  @ApiProperty({ description: 'Markdown article content' })
  content!: string;

  @ApiProperty({ example: 8, minimum: 1 })
  readingMinutes!: number;

  @ApiProperty({ format: 'date-time' })
  publishedAt!: Date;

  @ApiProperty({ example: true })
  featured!: boolean;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}

export class BlogPostSummaryDto extends BlogPostDto {}
