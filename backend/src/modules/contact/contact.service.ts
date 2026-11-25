import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ContactStatus } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import type { ContactRequestMetadata } from './dto/contact-request-metadata.dto';
import type { ContactResponseDto } from './dto/contact-response.dto';
import { MailService } from './mail.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(
    input: CreateContactMessageDto,
    metadata: ContactRequestMetadata,
  ): Promise<ContactResponseDto & { createdAt: Date }> {
    if (input.website) {
      // Match the normal response shape without persisting or notifying bot submissions.
      return {
        id: randomUUID(),
        status: ContactStatus.NEW,
        createdAt: new Date(),
      };
    }

    const message = await this.prisma.contactMessage.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        subject: input.subject,
        message: input.message,
        ipAddress: metadata.ipAddress?.slice(0, 64),
        userAgent: metadata.userAgent?.slice(0, 512),
        status: ContactStatus.NEW,
      },
    });

    void this.mailService.notifyContactMessage(message);
    return { id: message.id, status: message.status, createdAt: message.createdAt };
  }
}
