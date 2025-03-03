import env from 'env-var'

export const config = {
  NODE_ENV: env
    .get('NODE_ENV')
    .default('development')
    .asEnum(['production', 'test', 'development']),

  PORT: env.get('PORT').default(4000).asPortNumber(),
  API_URL: env.get('API_URL').required().asUrlString(),
  APP_VERSION: env.get('APP_VERSION').required().asString(),
  CLOUDINARY_CLOUD_NAME: env.get('CLOUDINARY_CLOUD_NAME').required().asString(),
}
