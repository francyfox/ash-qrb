import { createReadStream } from 'node:fs'
import { basename } from 'node:path'

export async function getFirstChunkOfFile(
  file: string,
  size: number,
): Promise<string> {
  const stream = createReadStream(file)
  const readableByteStream = new ReadableStream({
    // @ts-ignore
    type: 'bytes',
    async start(controller) {
      stream.on('data', (chunk) => {
        controller.enqueue(chunk)
      })
      stream.on('error', (err) => {
        controller.error(err)
      })
    },
  })
  const reader = readableByteStream.getReader({ mode: 'byob' })
  const buffer = new Uint8Array(size)
  const { value } = await reader.read(buffer)

  if (!value) throw new Error(`Unable to read ${file}`)
  const decompressed = Bun.gunzipSync(value)

  const decoder = new TextDecoder()
  const chunkContent = decoder.decode(decompressed, { stream: true })
  await reader.cancel()

  return chunkContent
}

export function getFilenameFromURL(url: string): string {
  return basename(url)
}
