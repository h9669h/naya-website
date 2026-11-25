import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ContactMessage } from '@prisma/client';
import { createTransport, type Transporter } from 'nodemailer';

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character] ?? character;
  });

const cleanHeader = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim();

@Injectable()
export class MailService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MailService.name);
  private readonly enabled: boolean;
  private readonly from: string;
  private readonly to: string;
  private readonly frontendUrl: string;
  private readonly smtpHost: string;
  private readonly smtpPort: number;
  private readonly smtpSecure: boolean;
  private readonly smtpUser: string;
  private readonly smtpPass: string;
  private transporter?: Transporter;

  constructor(config: ConfigService) {
    this.enabled = config.getOrThrow<boolean>('mailEnabled');
    this.from = config.getOrThrow<string>('mailFrom');
    this.to = config.getOrThrow<string>('mailTo');
    this.frontendUrl = config.getOrThrow<string>('frontendUrl');
    this.smtpHost = config.getOrThrow<string>('smtpHost');
    this.smtpPort = config.getOrThrow<number>('smtpPort');
    this.smtpSecure = config.getOrThrow<boolean>('smtpSecure');
    this.smtpUser = config.getOrThrow<string>('smtpUser');
    this.smtpPass = config.getOrThrow<string>('smtpPass');
  }

  onModuleInit(): void {
    if (!this.enabled) {
      return;
    }

    this.transporter = createTransport({
      host: this.smtpHost,
      port: this.smtpPort,
      secure: this.smtpSecure,
      auth:
        this.smtpUser && this.smtpPass ? { user: this.smtpUser, pass: this.smtpPass } : undefined,
      connectionTimeout: 5_000,
      greetingTimeout: 5_000,
      socketTimeout: 10_000,
    });
  }

  async notifyContactMessage(message: ContactMessage): Promise<void> {
    if (!this.enabled) {
      this.logger.log(
        JSON.stringify({ event: 'contact_notification_mock', messageId: message.id }),
      );
      return;
    }

    try {
      if (!this.transporter) {
        throw new Error('SMTP transporter is not initialized');
      }

      const name = escapeHtml(message.name);
      const email = escapeHtml(message.email);
      const phone = escapeHtml(message.phone ?? '未提供');
      const company = escapeHtml(message.company ?? '未提供');
      const subject = escapeHtml(message.subject ?? '新的联系请求');
      const body = escapeHtml(message.message);

      await this.transporter.sendMail({
        from: this.from,
        to: this.to,
        replyTo: message.email,
        subject: `【Naya Corp 官网咨询】${cleanHeader(message.subject ?? '新的联系请求')}`,
        text: [
          `姓名：${message.name}`,
          `邮箱：${message.email}`,
          `电话：${message.phone ?? '未提供'}`,
          `公司：${message.company ?? '未提供'}`,
          `留言：\n${message.message}`,
          `官网：${this.frontendUrl}`,
        ].join('\n'),
        html: `
          <div style="font-family:Arial,sans-serif;color:#172033;line-height:1.7">
            <h2>Naya Corp 官网联系请求</h2>
            <p><strong>姓名：</strong>${name}</p>
            <p><strong>邮箱：</strong>${email}</p>
            <p><strong>电话：</strong>${phone}</p>
            <p><strong>公司：</strong>${company}</p>
            <p><strong>主题：</strong>${subject}</p>
            <p><strong>留言：</strong></p>
            <div style="white-space:pre-wrap;padding:16px;background:#f5f7fb;border-radius:8px">${body}</div>
          </div>
        `,
      });
      this.logger.log(
        JSON.stringify({ event: 'contact_notification_sent', messageId: message.id }),
      );
    } catch (error: unknown) {
      this.logger.error(
        JSON.stringify({
          event: 'contact_notification_failed',
          messageId: message.id,
          errorName: error instanceof Error ? error.name : 'UnknownError',
        }),
      );
    }
  }

  onModuleDestroy(): void {
    this.transporter?.close();
  }
}
