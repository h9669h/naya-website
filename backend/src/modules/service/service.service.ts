import { Injectable, NotFoundException } from '@nestjs/common';
import type { Service } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { SERVICE_ICONS, type ServiceDto, type ServiceIcon } from './dto/service-response.dto';

const publicServiceWhere = { deletedAt: null, published: true } as const;

const toServiceDto = (service: Service): ServiceDto => ({
  id: service.id,
  slug: service.slug,
  title: service.title,
  shortDescription: service.shortDescription,
  description: service.description,
  icon: (SERVICE_ICONS as readonly string[]).includes(service.icon)
    ? (service.icon as ServiceIcon)
    : 'code',
  coverImage: service.coverImage,
  capabilities: service.capabilities,
  deliverables: service.deliverables,
  featured: service.featured,
  order: service.order,
  createdAt: service.createdAt,
  updatedAt: service.updatedAt,
});

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ServiceDto[]> {
    const services = await this.prisma.service.findMany({
      where: publicServiceWhere,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return services.map(toServiceDto);
  }

  async findFeatured(limit: number): Promise<ServiceDto[]> {
    const services = await this.prisma.service.findMany({
      where: { ...publicServiceWhere, featured: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: limit,
    });
    return services.map(toServiceDto);
  }

  async findBySlug(slug: string): Promise<ServiceDto> {
    const service = await this.prisma.service.findFirst({
      where: { slug, ...publicServiceWhere },
    });
    if (!service) {
      throw new NotFoundException({ code: 'SERVICE_NOT_FOUND', message: '服务不存在' });
    }

    return toServiceDto(service);
  }
}
