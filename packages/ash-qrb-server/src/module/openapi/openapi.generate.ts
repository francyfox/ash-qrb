import { exists, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { log } from '@root/core/module/plugin/plugin.logger'
import { env } from '@root/env'
import openapiTS, { astToString } from 'openapi-typescript'

export const openapiGenerate = async () => {
  const url = new URL(`${env.CLIENT_URL}/api/swagger/json`)
  const dir = join(process.cwd(), '/openapi')
  const dtsFile = join(dir, 'api.d.ts')
  let created = false

  if (!(await exists(dir))) await mkdir(dir)
  if (!(await exists(dtsFile))) created = true

  if (created) {
    const ast = await openapiTS(url)
    const contents = astToString(ast)

    await Bun.write(dtsFile, contents)
    log.info('OpenAPI dts generated successfully.')
  }

  return dtsFile
}
