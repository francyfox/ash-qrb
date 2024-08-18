import { Type as t } from '@sinclair/typebox';
import type { Static } from '@sinclair/typebox';
import { parseENV } from '@root/module/env/env.services';

const envSchema = t.Object({
  NEXT_API_URL: t.Readonly(t.String()),
});

export type schemaEnv = Static<typeof envSchema>;
export const ENV = parseENV(envSchema) as schemaEnv;
