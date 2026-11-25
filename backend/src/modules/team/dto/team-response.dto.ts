import { ApiProperty } from '@nestjs/swagger';
import { SocialLink } from '../../common/dto/content.dto';

export class TeamMemberDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'lin-zhiyuan' })
  slug!: string;

  @ApiProperty({ example: '林知远' })
  name!: string;

  @ApiProperty({ example: '首席技术官' })
  role!: string;

  @ApiProperty({ example: '拥有 16 年企业架构经验，专注云原生与复杂业务系统演进。' })
  bio!: string;

  @ApiProperty({ example: 'https://picsum.photos/seed/nova-team-lin/800/800' })
  avatar!: string;

  @ApiProperty({ type: [String], example: ['企业架构', '云原生'] })
  expertise!: string[];

  @ApiProperty({ type: [SocialLink] })
  socialLinks!: SocialLink[];

  @ApiProperty({ example: true })
  featured!: boolean;

  @ApiProperty({ example: 1 })
  order!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}
