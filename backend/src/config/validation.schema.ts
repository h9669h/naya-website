import Joi from 'joi';

const pathSegment = /[a-zA-Z0-9_-]+/;

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().integer().min(1).max(65_535).default(3001),
  API_PREFIX: Joi.string()
    .pattern(new RegExp(`^${pathSegment.source}(?:/${pathSegment.source})*$`))
    .default('api'),
  FRONTEND_URL: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .default('http://localhost:3000'),
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgresql', 'postgres'] })
    .required(),
  SWAGGER_ENABLED: Joi.boolean().default(true),
  THROTTLE_TTL: Joi.number().integer().min(1_000).max(3_600_000).default(60_000),
  THROTTLE_LIMIT: Joi.number().integer().min(1).max(100_000).default(120),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'log', 'debug', 'verbose').default('debug'),
  MAIL_ENABLED: Joi.boolean().default(false),
  SMTP_HOST: Joi.string()
    .trim()
    .when('MAIL_ENABLED', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow('').default(''),
    }),
  SMTP_PORT: Joi.number().integer().min(1).max(65_535).default(587),
  SMTP_SECURE: Joi.boolean().default(false),
  SMTP_USER: Joi.string().allow('').default(''),
  SMTP_PASS: Joi.string().allow('').default(''),
  MAIL_FROM: Joi.string()
    .trim()
    .when('MAIL_ENABLED', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.allow('').default(''),
    }),
  MAIL_TO: Joi.string().when('MAIL_ENABLED', {
    is: true,
    then: Joi.string().email().required(),
    otherwise: Joi.allow('').default(''),
  }),
});

export const validateEnvironment = (config: Record<string, unknown>): Record<string, unknown> => {
  const { error, value } = validationSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    const details = error.details
      .map((detail) => `${detail.path.join('.') || 'environment'}: ${detail.type}`)
      .join(', ');
    throw new Error(`Config validation error: ${details}`);
  }

  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Config validation error: environment must be an object');
  }

  return value as Record<string, unknown>;
};
