import { autoDetectFormat, safeString } from '@/utils/ipx.ts'
import type { IPX } from 'ipx'
import { Elysia, t } from 'elysia'
import { decode } from 'ufo'
import getEtag from 'etag'

const MODIFIER_SEP = /[&,]/g
const MODIFIER_VAL_SEP = /[:=_]/

export const createElysiaIpx = (ipx: IPX) => {
  return new Elysia({ name: 'elysia-ipx-plugin' }).get(
    '/ipx*',
    async ({ path, headers, set, error }) => {
      const [modifiersString = '', ...idSegments] = path
        .slice(1 /* leading slash */)
        .split('/')

      const id = safeString(decode(idSegments.join('/')))

      console.log(id, modifiersString)
      if (!modifiersString) {
        set.status = 400
        throw new Error(`Modifiers are missing: ${id}`)
      }
      if (!id || id === '/') {
        set.status = 400
        throw new Error(`Resource id is missing: ${path}`)
      }

      const modifiers: Record<string, string> = Object.create(null)

      // Read modifiers from first segment
      if (modifiersString !== '_') {
        for (const p of modifiersString.split(MODIFIER_SEP)) {
          const [key, ...values] = p.split(MODIFIER_VAL_SEP)
          modifiers[safeString(key || '')] = values
            .map((v) => safeString(decode(v)))
            .join('_')
        }
      }

      const mFormat = modifiers.f || modifiers.format
      if (mFormat === 'auto') {
        const acceptHeader = headers.accept || ''
        const animated = modifiers.animated ?? modifiers.a
        const autoFormat = autoDetectFormat(
          acceptHeader,
          // TODO: fix modifiers to normalized to boolean
          !!animated || animated === '',
        )
        // biome-ignore lint/performance/noDelete: <explanation>
        delete modifiers.f
        // biome-ignore lint/performance/noDelete: <explanation>
        delete modifiers.format
        if (autoFormat) {
          modifiers.format = autoFormat
          set.headers.vary = 'Accept'
        }
      }

      // Create request
      const img = ipx(id, modifiers)

      // Get image meta from source
      const sourceMeta = await img.getSourceMeta()

      set.headers['content-security-policy'] = "default-src 'none'"

      // Handle modified time if available
      if (sourceMeta.mtime) {
        // Send Last-Modified header
        set.headers['last-modified'] = sourceMeta.mtime.toUTCString()

        // Check for last-modified request header
        const _ifModifiedSince = headers['if-modified-since']

        if (
          _ifModifiedSince &&
          new Date(_ifModifiedSince) >= sourceMeta.mtime
        ) {
          error('Not Modified')
        }
      }

      // Process image
      const { data, format } = await img.process()

      // Send Cache-Control header
      if (typeof sourceMeta.maxAge === 'number') {
        set.headers['cache-control'] =
          `max-age=${+sourceMeta.maxAge}, public, s-maxage=${+sourceMeta.maxAge}`
      }

      // Generate and send ETag header
      const etag = getEtag(data)
      set.headers.etag = etag

      if (etag && headers['if-none-match'] === etag) {
        error('Not Modified')
      }

      if (format) {
        set.headers['content-type'] = `image/${format}`
      }

      return data
    },
    {
      detail: {
        tags: ['IPX'],
      },
      headers: t.Partial(
        t.Object({
          'content-type': t.String(),
          'if-none-match': t.String(),
          etag: t.String(),
          'cache-control': t.String(),
          'if-modified-since': t.String(),
          'last-modified': t.String(),
          'content-security-policy': t.String(),
          accept: t.String(),
          vary: t.String(),
        }),
      ),
    },
  )
}
