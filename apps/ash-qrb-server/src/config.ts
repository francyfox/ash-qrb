import env from 'env-var'

export const config = {
  NODE_ENV: env
    .get('NODE_ENV')
    .default('development')
    .asEnum(['production', 'test', 'development']),
  APP_VERSION: env.get('APP_VERSION').default('1.0.0').asString(),

  PORT: env.get('PORT').default(3000).asPortNumber(),
  API_URL: env
    .get('API_URL')
    .default(`https://${env.get('PUBLIC_DOMAIN').asString()}`)
    .asString(),

  DATABASE_URL: env.get('DATABASE_URL').required().asString(),
  POSTHOG_API_KEY: env
    .get('POSTHOG_API_KEY')
    .default("it's a secret")
    .asString(),
  POSTHOG_HOST: env.get('POSTHOG_HOST').default('localhost').asString(),
  LOCK_STORE: env.get('LOCK_STORE').default('memory').asEnum(['memory']),
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),

  CLIENT_APP_URL: env.get('CLIENT_APP_URL').required().asString(),

  // Redis
  REDIS_USER: env.get('REDIS_USER').default('default').asString(),
  REDIS_PASSWORD: env.get('REDIS_PASSWORD').required().asString(),
  REDIS_HOST: env.get('REDIS_HOST').default('0.0.0.0').asString(),
  REDIS_PORT: env.get('REDIS_PORT').default('6379').asString(),

  // AXIOM (opentelemetry)
  AXIOM_TOKEN: env.get('AXIOM_TOKEN').asString(),
  AXIOM_DATASET: env.get('AXIOM_DATASET').asString(),

  // Providers
  PROVIDER_GOOGLE_CLIENT_ID: env
    .get('PROVIDER_GOOGLE_CLIENT_ID')
    .required()
    .asString(),
  PROVIDER_GOOGLE_CLIENT_SECRET: env
    .get('PROVIDER_GOOGLE_CLIENT_SECRET')
    .required()
    .asString(),

  PROVIDER_YANDEX_CLIENT_ID: env
    .get('PROVIDER_YANDEX_CLIENT_ID')
    .required()
    .asString(),
  PROVIDER_YANDEX_CLIENT_SECRET: env
    .get('PROVIDER_YANDEX_CLIENT_SECRET')
    .required()
    .asString(),
}
