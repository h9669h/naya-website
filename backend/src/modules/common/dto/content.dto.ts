import { ApiProperty } from '@nestjs/swagger';

export class StatItem {
  @ApiProperty({ example: '服务企业' })
  label!: string;

  @ApiProperty({ example: '180+' })
  value!: string;
}

export class ContactInfo {
  @ApiProperty({ example: '上海市浦东新区张江高科技园区科苑路 88 号' })
  address!: string;

  @ApiProperty({ example: 'Building 8, Keyuan Road, Zhangjiang, Shanghai' })
  addressEn!: string;

  @ApiProperty({ example: '400-860-2026' })
  phone!: string;

  @ApiProperty({ example: 'hello@novacorp.cn', format: 'email' })
  email!: string;

  @ApiProperty({ example: '周一至周五 09:00–18:00' })
  workingHours!: string;
}

export class SocialLink {
  @ApiProperty({ example: 'LinkedIn' })
  label!: string;

  @ApiProperty({ example: 'https://www.linkedin.com/company/nova-corp', format: 'uri' })
  href!: string;

  @ApiProperty({ example: 'linkedin' })
  icon!: string;
}
