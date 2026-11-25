import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { CaseModule } from '../case/case.module';
import { ServiceModule } from '../service/service.module';
import { TeamModule } from '../team/team.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [ServiceModule, CaseModule, TeamModule, BlogModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
