import { Value } from '@sinclair/typebox/value';
import getConfig from 'next/config';
import { TObject } from '@sinclair/typebox';

export const showEnvErrors = (envSchema: TObject<any>, parsed: unknown) => {
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
};
export const parseENV = (envSchema: TObject<any>) => {
  const { publicRuntimeConfig } = getConfig();
  const config = publicRuntimeConfig ?? process.env;
  const parsed = Value.Convert(envSchema, config);

  const isValid = Value.Check(envSchema, parsed);

  if (!isValid) {
    showEnvErrors(envSchema, parsed);
  }

  return parsed;
};
