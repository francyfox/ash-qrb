import { z } from 'zod'

const toggle = z
  .enum(['true', 'false', '0', '1'])
  .transform((v) => v === 'true' || v === '1')

const envVariables = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  RUNTIME: z.enum(['bun', 'edge']).default('bun'),
  NODE_DEBUG: z.string().default(''),
  XATA_DB_HTTP_HOST: z.string(),
  XATA_DB_PG_HOST: z.string(),
})

console.log(process.env)

export const env = envVariables.parse(process.env)
