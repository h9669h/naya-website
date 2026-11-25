import { Injectable, NotFoundException } from '@nestjs/common';
import type { HomeContent } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { parseContactInfo, parseSocialLinks, parseStatItems } from '../common/utils/json';
import { BlogService } from '../blog/blog.service';
import { CaseService } from '../case/case.service';
import { ServiceService } from '../service/service.service';
import { TeamService } from '../team/team.service';
import type { HomeContentDto, HomeDashboardDto } from './dto/home-response.dto';

const publicContentWhere = { deletedAt: null, published: true } as const;

const toHomeContentDto = (content: HomeContent): HomeContentDto => ({
  id: content.id,
  key: content.key,
  eyebrow: content.eyebrow,
  headline: content.headline,
  highlightedHeadline: content.highlightedHeadline,
  subheadline: content.subheadline,
  primaryCtaLabel: content.primaryCtaLabel,
  primaryCtaHref: content.primaryCtaHref,
  secondaryCtaLabel: content.secondaryCtaLabel,
  secondaryCtaHref: content.secondaryCtaHref,
  introTitle: content.introTitle,
  introBody: content.introBody,
  mission: content.mission,
  vision: content.vision,
  stats: parseStatItems(content.stats),
  contactInfo: parseContactInfo(content.contactInfo),
  socialLinks: parseSocialLinks(content.socialLinks),
  footerTagline: content.footerTagline,
  createdAt: content.createdAt,
  updatedAt: content.updatedAt,
});

@Injectable()
export class HomeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceService: ServiceService,
    private readonly caseService: CaseService,
    private readonly teamService: TeamService,
    private readonly blogService: BlogService,
  ) {}

  async getDashboard(): Promise<HomeDashboardDto> {
    const [content, services, cases, team, posts] = await Promise.all([
      this.prisma.homeContent.findFirst({
        where: { key: 'home', ...publicContentWhere },
      }),
      this.serviceService.findFeatured(6),
      this.caseService.findFeatured(3),
      this.teamService.findFeatured(4),
      this.blogService.findRecent(3),
    ]);

    if (!content) {
      throw new NotFoundException({ code: 'HOME_CONTENT_NOT_FOUND', message: '首页内容尚未配置' });
    }

    return {
      content: toHomeContentDto(content),
      services,
      cases,
      team,
      posts,
    };
  }
}
