import { negotiate } from '@fastify/accept-negotiator'

export function safeString(input: string) {
  return JSON.stringify(input)
    .replace(/^"|"$/g, '')
    .replace(/\\+/g, '\\')
    .replace(/\\"/g, '"')
}

export function autoDetectFormat(acceptHeader: string, animated: boolean) {
  if (animated) {
    const acceptMime = negotiate(acceptHeader, ['image/webp', 'image/gif'])
    return acceptMime?.split('/')[1] || 'gif'
  }
  const acceptMime = negotiate(acceptHeader, [
    'image/avif',
    'image/webp',
    'image/jpeg',
    'image/png',
    'image/tiff',
    'image/heif',
    'image/gif',
  ])
  return acceptMime?.split('/')[1] || 'jpeg'
}
