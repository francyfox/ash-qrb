import { resolve } from 'node:path'
import { config as configDotenv } from 'dotenv'
import { type InferType, mixed, number, object, string } from 'yup'

const configSchema = object({
  NODE_ENV: mixed()
    .oneOf(['production', 'test', 'development'])
    .default('development'),
  PORT: number().default(4000),
  API_URL: string().required(),
  APP_VERSION: string().required(),
  CLOUDINARY_CLOUD_NAME: string().required(),
})

export type TConfig = InferType<typeof configSchema>

export const config = await configSchema.validate(
  configDotenv({
    path: resolve(__dirname, '.env'),
  }).parsed,
)
