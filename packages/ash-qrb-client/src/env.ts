import { Static, Type as t } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import getConfig from 'next/config';

const envSchema = t.Object({
  NEXT_PUBLIC_TOLGEE_API_KEY: t.Readonly(t.String()),
  NEXT_PUBLIC_TOLGEE_API_URL: t.Readonly(t.String()),
});

export type schemaEnv = Static<typeof envSchema>;

export const validateEnvSchema = (parsed: schemaEnv) => {
  const isValid = Value.Check(envSchema, parsed);

  if (!isValid) {
    // @ts-ignore
    const errors = [...Value.Errors(envSchema, parsed)];
    const computedErrorMessages: Record<string, string[]> = {};
    errors.forEach(({ path, message }) => {
      const envVarName = path.replace(/^\//, '');
      if (!computedErrorMessages[envVarName]) {
        computedErrorMessages[envVarName] = [];
      }
      computedErrorMessages[envVarName].push(message);
    });

    const errorTextParts: string[] = [
      'Invalid environment variables',
      ...Object.entries(computedErrorMessages).map(
        ([varName, messages]) => `  ${varName} : ${messages.join(', ')}`
      ),
    ];

    throw new Error(errorTextParts.join('\n'));
  }

  return parsed;
};

export const parseENV = () => {
  const { publicRuntimeConfig } = getConfig();
  const config = publicRuntimeConfig ?? process.env;
  const parsed = Value.Convert(envSchema, config) as schemaEnv;

  return validateEnvSchema(parsed);
};

export const ENV = parseENV();
