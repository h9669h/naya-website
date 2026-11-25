import { ApiProperty } from '@nestjs/swagger';
import { StatItem } from '../../common/dto/content.dto';

export class CaseStudyDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'smart-manufacturing-data-platform' })
  slug!: string;

  @ApiProperty({ example: '全球制造集团智能运营数据平台' })
  title!: string;

  @ApiProperty({ example: '远航制造集团' })
  client!: string;

  @ApiProperty({ example: '智能制造' })
  industry!: string;

  @ApiProperty({ example: 2026 })
  year!: number;

  @ApiProperty({ example: '打通 12 个工厂的数据孤岛，建立实时运营与智能决策体系。' })
  summary!: string;

  @ApiProperty({ description: 'Markdown case description' })
  description!: string;

  @ApiProperty({ example: 'https://picsum.photos/seed/nova-case-manufacturing/1200/800' })
  coverImage!: string;

  @ApiProperty({ type: [String] })
  techStack!: string[];

  @ApiProperty({ type: [String] })
  highlights!: string[];

  @ApiProperty({ type: [StatItem] })
  results!: StatItem[];

  @ApiProperty({ example: true })
  featured!: boolean;

  @ApiProperty({ example: 1 })
  order!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}
