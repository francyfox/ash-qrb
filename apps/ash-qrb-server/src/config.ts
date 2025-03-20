import env from 'env-var'

export const config = {
  NODE_ENV: env
    .get('NODE_ENV')
    .default('development')
    .asEnum(['production', 'test', 'development']),

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

  WORKOS_CLIENT_ID: env.get('WORKOS_CLIENT_ID').required().asString(),
  WORKOS_API_KEY: env.get('WORKOS_API_KEY').required().asString(),

  CLIENT_APP_URL: env.get('CLIENT_APP_URL').required().asString(),

  CLOUD_NAME: env.get('CLOUD_NAME').required().asString(),
  CLOUDINARY_KEY: env.get('CLOUDINARY_KEY').required().asString(),
  CLOUDINARY_SECRET: env.get('CLOUDINARY_SECRET').required().asString(),
}
