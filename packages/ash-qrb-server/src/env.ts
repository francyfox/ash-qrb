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

// export const env = envVariables.parse(process.env)

export const env = {
  RUNTIME: 'edge',
  NODE_ENV: 'production',
  XATA_DB_HTTP_HOST:
    'https://Danil-Golota-s-workspace-oddvjb.eu-west-1.xata.sh/db/ashqrb:main',
  XATA_DB_PG_HOST:
    'postgresql://oddvjb:xau_tubjnzw7epVbvzBGS8qlmVOi0mhaLVuP2@eu-west-1.sql.xata.sh/ashqrb:main?sslmode=require',
}
