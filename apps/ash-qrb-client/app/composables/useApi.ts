import { treaty } from '@elysiajs/eden'
import type { ElysiaApp } from 'ash-qrb-server'

export default function () {
  const config = useRuntimeConfig()
  return treaty<ElysiaApp>(config.public.API_URL)
}
