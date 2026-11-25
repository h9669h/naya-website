import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, type BlogPost } from '@prisma/client';
import type { PaginationResult } from '../common/dto/pagination-meta.dto';
import { PrismaService } from '../common/services/prisma.service';
import { createPaginationMeta } from '../common/utils/pagination';
import { BlogQueryDto } from './dto/blog-query.dto';
import type { BlogPostDto } from './dto/blog-response.dto';

const publicPostWhere = { deletedAt: null, published: true } as const;

const toBlogPostDto = (post: BlogPost): BlogPostDto => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  coverImage: post.coverImage,
  author: post.author,
  category: post.category,
  tags: post.tags,
  content: post.content,
  readingMinutes: post.readingMinutes,
  publishedAt: post.publishedAt,
  featured: post.featured,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: BlogQueryDto): Promise<PaginationResult<BlogPostDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 6;
    const where: Prisma.BlogPostWhereInput = {
      ...publicPostWhere,
      ...(query.category ? { category: query.category } : {}),
    };

    const [total, posts] = await Promise.all([
      this.prisma.blogPost.count({ where }),
      this.prisma.blogPost.findMany({
        where,
        orderBy: [{ publishedAt: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      data: posts.map(toBlogPostDto),
      meta: createPaginationMeta(page, limit, total),
    };
  }

  async findCategories(): Promise<string[]> {
    const categories = await this.prisma.blogPost.findMany({
      where: publicPostWhere,
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    });
    return categories.map((entry) => entry.category);
  }

  async findBySlug(slug: string): Promise<BlogPostDto> {
    const post = await this.prisma.blogPost.findFirst({
      where: { slug, ...publicPostWhere },
    });
    if (!post) {
      throw new NotFoundException({ code: 'BLOG_POST_NOT_FOUND', message: '文章不存在' });
    }

    return toBlogPostDto(post);
  }

  async findRecent(limit: number): Promise<BlogPostDto[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: publicPostWhere,
      orderBy: [{ publishedAt: 'desc' }, { order: 'asc' }],
      take: limit,
    });
    return posts.map(toBlogPostDto);
  }
}
