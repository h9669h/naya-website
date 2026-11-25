import { ContactStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ContactResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ enum: ContactStatus, example: ContactStatus.NEW })
  status!: ContactStatus;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;
}
