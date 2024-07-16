import type { TObject } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { showEnvErrors } from 'ash-qrb-client/src/module/env/env.services'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const parseENV = (envSchema: TObject<any>) => {
  const config = Bun.env
  const parsed = Value.Convert(envSchema, config)

  const isValid = Value.Check(envSchema, parsed)

  if (!isValid) {
    showEnvErrors(envSchema, parsed)
  }

  return parsed
}
