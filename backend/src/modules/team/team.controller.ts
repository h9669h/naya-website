import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCommonErrors } from '../common/decorators/api-error-response.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ApiSuccessResponse } from '../common/decorators/api-success-response.decorator';
import { TeamMemberDto } from './dto/team-response.dto';
import { TeamService } from './team.service';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ResponseMessage('团队成员获取成功')
  @ApiOperation({ summary: '获取团队成员' })
  @ApiSuccessResponse(TeamMemberDto, { isArray: true })
  @ApiCommonErrors()
  async findAll(): Promise<TeamMemberDto[]> {
    return this.teamService.findAll();
  }
}
