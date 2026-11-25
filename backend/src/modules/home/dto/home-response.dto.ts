import { ApiProperty } from '@nestjs/swagger';
import { ContactInfo, SocialLink, StatItem } from '../../common/dto/content.dto';
import { CaseStudyDto } from '../../case/dto/case-response.dto';
import { BlogPostDto } from '../../blog/dto/blog-response.dto';
import { ServiceDto } from '../../service/dto/service-response.dto';
import { TeamMemberDto } from '../../team/dto/team-response.dto';

export class HomeContentDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'home' })
  key!: string;

  @ApiProperty({ example: 'NOVA CORP · 企业数字化伙伴' })
  eyebrow!: string;

  @ApiProperty({ example: '让复杂业务，' })
  headline!: string;

  @ApiProperty({ example: '进化得更简单。' })
  highlightedHeadline!: string;

  @ApiProperty({ example: '以云、数据与 AI 重塑企业增长方式。' })
  subheadline!: string;

  @ApiProperty({ example: '预约技术咨询' })
  primaryCtaLabel!: string;

  @ApiProperty({ example: '/contact' })
  primaryCtaHref!: string;

  @ApiProperty({ example: '探索解决方案' })
  secondaryCtaLabel!: string;

  @ApiProperty({ example: '/services' })
  secondaryCtaHref!: string;

  @ApiProperty({ example: '以工程确定性，交付业务增长' })
  introTitle!: string;

  @ApiProperty({ description: 'Company introduction' })
  introBody!: string;

  @ApiProperty({ description: 'Company mission' })
  mission!: string;

  @ApiProperty({ description: 'Company vision' })
  vision!: string;

  @ApiProperty({ type: [StatItem] })
  stats!: StatItem[];

  @ApiProperty({ type: ContactInfo })
  contactInfo!: ContactInfo;

  @ApiProperty({ type: [SocialLink] })
  socialLinks!: SocialLink[];

  @ApiProperty({ example: '技术驱动增长，合作成就长期价值。' })
  footerTagline!: string;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}

export class HomeDashboardDto {
  @ApiProperty({ type: HomeContentDto })
  content!: HomeContentDto;

  @ApiProperty({ type: [ServiceDto] })
  services!: ServiceDto[];

  @ApiProperty({ type: [CaseStudyDto] })
  cases!: CaseStudyDto[];

  @ApiProperty({ type: [TeamMemberDto] })
  team!: TeamMemberDto[];

  @ApiProperty({ type: [BlogPostDto] })
  posts!: BlogPostDto[];
}
