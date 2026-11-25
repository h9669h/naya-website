import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { configuration } from './config/configuration';
import { validateEnvironment } from './config/validation.schema';
import { CommonModule } from './modules/common/common.module';
import { GlobalExceptionFilter } from './modules/common/filters/global-exception.filter';
import { ClientIpThrottlerGuard } from './modules/common/guards/client-ip-throttler.guard';
import { ResponseInterceptor } from './modules/common/interceptors/response.interceptor';
import { HomeModule } from './modules/home/home.module';
import { ServiceModule } from './modules/service/service.module';
import { CaseModule } from './modules/case/case.module';
import { TeamModule } from './modules/team/team.module';
import { BlogModule } from './modules/blog/blog.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validate: validateEnvironment,
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'default',
            ttl: config.getOrThrow<number>('throttleTtl'),
            limit: config.getOrThrow<number>('throttleLimit'),
          },
        ],
        errorMessage: '请求过于频繁，请稍后再试',
      }),
    }),
    CommonModule,
    HomeModule,
    ServiceModule,
    CaseModule,
    TeamModule,
    BlogModule,
    ContactModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_GUARD, useClass: ClientIpThrottlerGuard },
  ],
})
export class AppModule {}
