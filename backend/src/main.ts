import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { normalizeApiPrefix } from './config/configuration';
import { validationExceptionFactory } from './modules/common/pipes/validation-exception.factory';

type AppLogLevel = 'error' | 'warn' | 'log' | 'debug' | 'verbose';
type StaticOrigin = boolean | string | RegExp | Array<string | RegExp>;
type CorsOrigin = (
  requestOrigin: string | undefined,
  callback: (error: Error | null, origin?: StaticOrigin) => void,
) => void;

const resolveLogLevels = (level: string): AppLogLevel[] => {
  switch (level) {
    case 'error':
      return ['error'];
    case 'warn':
      return ['error', 'warn'];
    case 'log':
      return ['error', 'warn', 'log'];
    case 'verbose':
      return ['error', 'warn', 'log', 'debug', 'verbose'];
    case 'debug':
    default:
      return ['error', 'warn', 'log', 'debug'];
  }
};

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const prefix = normalizeApiPrefix(config.getOrThrow<string>('apiPrefix'));
  const port = config.getOrThrow<number>('port');
  const origins = [
    ...new Set(
      [config.getOrThrow<string>('corsOrigin'), config.getOrThrow<string>('frontendUrl')]
        .flatMap((value) => value.split(','))
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  ];

  app.useLogger(resolveLogLevels(config.getOrThrow<string>('logLevel')));
  app.enableShutdownHooks();
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      validationError: { target: false, value: false },
      exceptionFactory: validationExceptionFactory,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': ["'self'", "'unsafe-inline'"],
          'style-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:', 'https:'],
          'connect-src': ["'self'"],
        },
      },
    }),
  );
  app.enableCors({
    origin: ((origin, callback) => {
      if (!origin || origins.includes('*') || origins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    }) satisfies CorsOrigin,
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Cache-Control', 'X-Request-Id'],
    exposedHeaders: ['X-Request-Id'],
    maxAge: 86_400,
  });

  if (config.getOrThrow<boolean>('swaggerEnabled')) {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
    const documentConfig = new DocumentBuilder()
      .setTitle('NAYA Corp API')
      .setDescription('NAYA Corp 企业官网公开 API')
      .setVersion('1.0.0')
      .addTag('home', '首页内容')
      .addTag('services', '解决方案')
      .addTag('cases', '客户案例')
      .addTag('team', '核心团队')
      .addTag('blog', '洞察文章')
      .addTag('contact', '联系表单')
      .addTag('health', '健康检查')
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup(`${prefix}/docs`, app, document);
  }
  // 解决跨域问题
  app.enableCors({
    origin: 'http://localhost:3003',
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');
  const logger = new Logger('Bootstrap');
  logger.log(`NAYA Corp API listening on http://localhost:${port}/${prefix}`);
};

void bootstrap();
