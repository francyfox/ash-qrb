import { parseENV } from '@root/module/env/env.services'
import type { Static } from '@sinclair/typebox'
import { t } from 'elysia'

const envVariables = t.Object({
  NODE_ENV: t.Union([
    t.Literal('development'),
    t.Literal('production'),
    t.Literal('test'),
  ]),
  RUNTIME: t.Union([t.Literal('bun'), t.Literal('edge')], { default: 'bun' }),
  NODE_DEBUG: t.String({ default: '' }),
  XATA_DB_PG_HOST: t.String(),
  JWT_SECRET_KEY: t.String(),
  CLIENT_URL: t.String({ format: 'uri' }),
})
//
export type schemaEnv = Static<typeof envVariables>
export const env = parseENV(envVariables) as schemaEnv
