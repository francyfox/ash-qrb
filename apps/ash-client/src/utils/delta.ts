import { sanitizeUrl } from '@braintree/sanitize-url'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'

export const DeltaConverterConfig = {
  // urlSanitizer: (url: string) => sanitizeUrl(url),
  linkRel: 'noopener noreferrer',
  inlineStyles: true,
}

export function deltaToHtml(delta: any[]) {
  const converter = new QuillDeltaToHtmlConverter(delta, DeltaConverterConfig)

  return converter.convert()
}
