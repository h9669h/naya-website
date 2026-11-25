import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonErrors } from '../common/decorators/api-error-response.decorator';
import { ApiSuccessResponse } from '../common/decorators/api-success-response.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ParseSlugPipe } from '../common/pipes/parse-slug.pipe';
import { ServiceDto } from './dto/service-response.dto';
import { ServiceService } from './service.service';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ResponseMessage('服务列表获取成功')
  @ApiOperation({ summary: '获取服务列表' })
  @ApiSuccessResponse(ServiceDto, { isArray: true })
  @ApiCommonErrors()
  async findAll(): Promise<ServiceDto[]> {
    return this.serviceService.findAll();
  }

  @Get(':slug')
  @ResponseMessage('服务详情获取成功')
  @ApiOperation({ summary: '获取服务详情' })
  @ApiParam({ name: 'slug', example: 'cloud-native' })
  @ApiSuccessResponse(ServiceDto)
  @ApiCommonErrors()
  async findBySlug(@Param('slug', ParseSlugPipe) slug: string): Promise<ServiceDto> {
    return this.serviceService.findBySlug(slug);
  }
}
