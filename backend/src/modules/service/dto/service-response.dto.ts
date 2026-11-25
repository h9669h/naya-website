import { ApiProperty } from '@nestjs/swagger';

export const SERVICE_ICONS = ['code', 'cloud', 'data', 'shield', 'smartphone', 'workflow'] as const;
export type ServiceIcon = (typeof SERVICE_ICONS)[number];

export class ServiceDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'cloud-native' })
  slug!: string;

  @ApiProperty({ example: '云原生架构升级' })
  title!: string;

  @ApiProperty({ example: '构建弹性、可观测、可持续演进的企业技术底座。' })
  shortDescription!: string;

  @ApiProperty({ description: 'Markdown service description' })
  description!: string;

  @ApiProperty({ enum: SERVICE_ICONS, example: 'cloud' })
  icon!: ServiceIcon;

  @ApiProperty({ example: 'https://picsum.photos/seed/nova-service-cloud/1200/800' })
  coverImage!: string;

  @ApiProperty({ type: [String] })
  capabilities!: string[];

  @ApiProperty({ type: [String] })
  deliverables!: string[];

  @ApiProperty({ example: true })
  featured!: boolean;

  @ApiProperty({ example: 1 })
  order!: number;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}
