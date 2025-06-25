import type { operations } from '~/assets/schema.ts'

export type TQrbBody =
  operations['postSPrivateQrb']['requestBody']['content']['application/json']

export type TQrbItems =
  operations['getSPrivateQrb']['responses']['200']['content']['application/json']['items']

export type TQrbItem =
  operations['getSPrivateQrbById']['responses']['200']['content']['application/json']['item']
