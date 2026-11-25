export interface AppConfiguration {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  frontendUrl: string;
  corsOrigin: string;
  databaseUrl: string;
  swaggerEnabled: boolean;
  throttleTtl: number;
  throttleLimit: number;
  logLevel: string;
  mailEnabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  mailFrom: string;
  mailTo: string;
}

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) {
    return fallback;
  }

  return ['true', '1'].includes(value.trim().toLowerCase());
};

export const configuration = (): AppConfiguration => {
  const env = process.env;

  return {
    nodeEnv: env.NODE_ENV ?? 'development',
    port: Number(env.PORT ?? 3001),
    apiPrefix: env.API_PREFIX ?? 'api',
    frontendUrl: env.FRONTEND_URL ?? 'http://localhost:3000',
    corsOrigin: env.CORS_ORIGIN ?? 'http://localhost:3000',
    databaseUrl: env.DATABASE_URL ?? '',
    swaggerEnabled: parseBoolean(env.SWAGGER_ENABLED, true),
    throttleTtl: Number(env.THROTTLE_TTL ?? 60_000),
    throttleLimit: Number(env.THROTTLE_LIMIT ?? 120),
    logLevel: env.LOG_LEVEL ?? 'debug',
    mailEnabled: parseBoolean(env.MAIL_ENABLED, false),
    smtpHost: env.SMTP_HOST ?? '',
    smtpPort: Number(env.SMTP_PORT ?? 587),
    smtpSecure: parseBoolean(env.SMTP_SECURE, false),
    smtpUser: env.SMTP_USER ?? '',
    smtpPass: env.SMTP_PASS ?? '',
    mailFrom: env.MAIL_FROM ?? '',
    mailTo: env.MAIL_TO ?? '',
  };
};

export const normalizeApiPrefix = (value: string): string =>
  value.trim().replace(/^\/+|\/+$/g, '') || 'api';
