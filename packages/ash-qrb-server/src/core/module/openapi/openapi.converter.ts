import { getOpenApiWriter, getTypeScriptReader, makeConverter } from 'typeconv'

const reader = getTypeScriptReader()
const writer = getOpenApiWriter({
  format: 'json',
  title: 'My API',
  version: 'v1',
})
export const { convert } = makeConverter(reader, writer)
