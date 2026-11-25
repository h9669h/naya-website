import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCommonErrors } from '../common/decorators/api-error-response.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ApiSuccessResponse } from '../common/decorators/api-success-response.decorator';
import { HomeDashboardDto } from './dto/home-response.dto';
import { HomeService } from './home.service';

@ApiTags('home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ResponseMessage('首页内容获取成功')
  @ApiOperation({ summary: '获取首页聚合内容' })
  @ApiSuccessResponse(HomeDashboardDto)
  @ApiCommonErrors()
  async getDashboard(): Promise<HomeDashboardDto> {
    return this.homeService.getDashboard();
  }
}
