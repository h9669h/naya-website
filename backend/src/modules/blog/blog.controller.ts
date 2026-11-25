import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiCommonErrors } from '../common/decorators/api-error-response.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import {
  ApiSuccessResponse,
  createStringArrayResponseOptions,
} from '../common/decorators/api-success-response.decorator';
import { ParseSlugPipe } from '../common/pipes/parse-slug.pipe';
import type { PaginationResult } from '../common/dto/pagination-meta.dto';
import { BlogQueryDto } from './dto/blog-query.dto';
import { BlogPostDto, BlogPostSummaryDto } from './dto/blog-response.dto';
import { BlogService } from './blog.service';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @ResponseMessage('文章列表获取成功')
  @ApiOperation({ summary: '分页获取文章列表' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 6 })
  @ApiQuery({ name: 'category', required: false, type: String, example: 'AI 实践' })
  @ApiSuccessResponse(BlogPostSummaryDto, { isArray: true, paginated: true })
  @ApiCommonErrors()
  async findAll(@Query() query: BlogQueryDto): Promise<PaginationResult<BlogPostDto>> {
    return this.blogService.findAll(query);
  }

  @Get('categories')
  @ResponseMessage('文章分类获取成功')
  @ApiOperation({ summary: '获取已发布的文章分类' })
  @ApiResponse({ status: 200, ...createStringArrayResponseOptions('请求成功') })
  @ApiCommonErrors()
  async findCategories(): Promise<string[]> {
    return this.blogService.findCategories();
  }

  @Get(':slug')
  @ResponseMessage('文章详情获取成功')
  @ApiOperation({ summary: '获取文章详情' })
  @ApiParam({ name: 'slug', example: 'enterprise-ai-from-poc-to-production' })
  @ApiSuccessResponse(BlogPostDto)
  @ApiCommonErrors()
  async findBySlug(@Param('slug', ParseSlugPipe) slug: string): Promise<BlogPostDto> {
    return this.blogService.findBySlug(slug);
  }
}
