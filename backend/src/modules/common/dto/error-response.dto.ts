import { ApiProperty } from '@nestjs/swagger';

export class ErrorPayloadDto {
  @ApiProperty({ example: 'VALIDATION_ERROR' })
  code!: string;

  @ApiProperty({ example: '请求参数校验失败' })
  message!: string;

  @ApiProperty({ required: false, description: 'Safe validation or conflict details' })
  details?: unknown;
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success!: false;

  @ApiProperty({ type: ErrorPayloadDto })
  error!: ErrorPayloadDto;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', format: 'date-time' })
  timestamp!: string;

  @ApiProperty({ example: '/api/contact' })
  path!: string;
}
