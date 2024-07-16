import { existsSync, mkdir } from 'node:fs'
import { join } from 'node:path'
import openapiValidate from '@root/module/openapi/openapi-validate'
import openapiTS, { astToString } from 'openapi-typescript'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>

;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
//
interface IOpenapiGenerateParams {
  swaggerJsonUrl: URL
  dir: string
}
//
// // export const spawnOpenapiDtsUpdater = async () => {
// //   const proc = Bun.spawn(
// //     ['bun', 'run', './src/core/module/openapi/openapi.cli.ts'],
// //     {
// //       cwd: process.cwd(),
// //     },
// //   )
// //   // process.on('SIGINT', () => proc.kill())
// // }
//
/**
 * Generate openapi from http json to dts file for typescript. Use function for auto-update types. Regenerate only if
 * checksum old openapi dts mismatches with current.
 * * @param {Object} param
 * @param { URL } param.swaggerJsonUrl http api with json api
 * @param { string } param.dir - save to path (dts, checksum)
 * @return { Promise<void> }
 */
export const openapiGenerate = async (
  { swaggerJsonUrl, dir }: IOpenapiGenerateParams = {
    swaggerJsonUrl: new URL('http://localhost:3000/api/swagger/json'),
    dir: join(process.cwd(), '/openapi'),
  },
): Promise<void> => {
  const outputDtsFile = join(dir, 'api.d.ts')
  const checksumFile = join(dir, 'checksum.txt')

  await openapiValidate(swaggerJsonUrl.toString())

  if (!existsSync(dir))
    mkdir(dir, (error) => {
      throw new Error(error?.stack)
    })

  await writeDtsFile({
    swaggerJsonUrl,
    outputDtsFile,
    checksumFile,
  })
}

const writeDtsFile = async ({
  swaggerJsonUrl,
  outputDtsFile,
  checksumFile,
}: Omit<IOpenapiGenerateParams, 'dir'> & {
  outputDtsFile: string
  checksumFile: string
}) => {
  const checksumFileExists = existsSync(checksumFile)
  const created = existsSync(outputDtsFile) || checksumFileExists
  const contents = await getContents(swaggerJsonUrl)
  const currentChecksum = getChecksum(contents)
  const isDiffChecksum =
    checksumFileExists &&
    (await Bun.file(checksumFile).text()) === currentChecksum

  await Bun.write(checksumFile, currentChecksum)

  if (!created) {
    await Bun.write(outputDtsFile, contents)
    console.log('OpenAPI dts generated successfully.')
  }
  if (!isDiffChecksum && created) {
    await Bun.write(outputDtsFile, contents)
    console.log('OpenAPI dts updated.')
  }
}

const getContents = async (swaggerJsonUrl: URL) => {
  try {
    const ast = await openapiTS(swaggerJsonUrl)

    return astToString(ast)
  } catch (error) {
    throw new Error(`Invalid OpenAPI schema: \n${(error as Error).message}`)
  }
}

const getChecksum = (text: string): string => checksum(text).toString()

const checksum = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed

  for (let i = 0, ch: number; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
