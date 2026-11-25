import { Injectable, NotFoundException } from '@nestjs/common';
import type { Case } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { parseStatItems } from '../common/utils/json';
import type { CaseStudyDto } from './dto/case-response.dto';

const publicCaseWhere = { deletedAt: null, published: true } as const;

const toCaseStudyDto = (record: Case): CaseStudyDto => ({
  id: record.id,
  slug: record.slug,
  title: record.title,
  client: record.client,
  industry: record.industry,
  year: record.year,
  summary: record.summary,
  description: record.description,
  coverImage: record.coverImage,
  techStack: record.techStack,
  highlights: record.highlights,
  results: parseStatItems(record.results),
  featured: record.featured,
  order: record.order,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt,
});

@Injectable()
export class CaseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CaseStudyDto[]> {
    const records = await this.prisma.case.findMany({
      where: publicCaseWhere,
      orderBy: [{ order: 'asc' }, { year: 'desc' }, { createdAt: 'desc' }],
    });
    return records.map(toCaseStudyDto);
  }

  async findFeatured(limit: number): Promise<CaseStudyDto[]> {
    const records = await this.prisma.case.findMany({
      where: { ...publicCaseWhere, featured: true },
      orderBy: [{ order: 'asc' }, { year: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return records.map(toCaseStudyDto);
  }

  async findBySlug(slug: string): Promise<CaseStudyDto> {
    const record = await this.prisma.case.findFirst({
      where: { slug, ...publicCaseWhere },
    });
    if (!record) {
      throw new NotFoundException({ code: 'CASE_NOT_FOUND', message: '案例不存在' });
    }

    return toCaseStudyDto(record);
  }
}
