import { Static, Type as t } from '@sinclair/typebox';
import { parseENV } from '@root/module/env/env.services';

const envSchema = t.Object({
  NEXT_PUBLIC_TOLGEE_API_KEY: t.Readonly(t.String()),
  NEXT_PUBLIC_TOLGEE_API_URL: t.Readonly(t.String()),
});

export type schemaEnv = Static<typeof envSchema>;
export const ENV = parseENV(envSchema) as schemaEnv;
