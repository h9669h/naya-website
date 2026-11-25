import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiCommonErrors } from '../common/decorators/api-error-response.decorator';
import { ApiSuccessResponse } from '../common/decorators/api-success-response.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ParseSlugPipe } from '../common/pipes/parse-slug.pipe';
import { CaseStudyDto } from './dto/case-response.dto';
import { CaseService } from './case.service';

@ApiTags('cases')
@Controller('cases')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Get()
  @ResponseMessage('案例列表获取成功')
  @ApiOperation({ summary: '获取案例列表' })
  @ApiSuccessResponse(CaseStudyDto, { isArray: true })
  @ApiCommonErrors()
  async findAll(): Promise<CaseStudyDto[]> {
    return this.caseService.findAll();
  }

  @Get(':slug')
  @ResponseMessage('案例详情获取成功')
  @ApiOperation({ summary: '获取案例详情' })
  @ApiParam({ name: 'slug', example: 'smart-manufacturing-data-platform' })
  @ApiSuccessResponse(CaseStudyDto)
  @ApiCommonErrors()
  async findBySlug(@Param('slug', ParseSlugPipe) slug: string): Promise<CaseStudyDto> {
    return this.caseService.findBySlug(slug);
  }
}
