import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCommonErrors } from '../common/decorators/api-error-response.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { createSuccessResponseOptions } from '../common/decorators/api-success-response.decorator';
import type { RequestWithId } from '../common/types/request';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { ContactResponseDto } from './dto/contact-response.dto';
import { ContactService } from './contact.service';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ResponseMessage('留言提交成功')
  @ApiOperation({ summary: '提交联系表单' })
  @ApiExtraModels(ContactResponseDto)
  @ApiCreatedResponse(createSuccessResponseOptions(ContactResponseDto))
  @ApiCommonErrors()
  async create(
    @Body() input: CreateContactMessageDto,
    @Req() request: RequestWithId,
  ): Promise<ContactResponseDto & { createdAt: Date }> {
    return this.contactService.create(input, {
      ipAddress: request.ip ?? request.socket.remoteAddress,
      userAgent: request.get('user-agent'),
    });
  }
}
