import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  status!: 'ok';

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', format: 'date-time' })
  timestamp!: string;

  @ApiProperty({ example: 120, description: 'Process uptime in seconds' })
  uptime!: number;
}
