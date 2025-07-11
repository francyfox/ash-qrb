import { config } from '@/config.ts'
import type { ElysiaApp } from '@/server.ts'
import { cors } from '@elysiajs/cors'

export default (app: ElysiaApp) =>
  app.use(
    cors({
      origin: [
        config.CLIENT_APP_URL,
        'http://localhost',
        'https://localhost',
        'https://qrb.shalotts.site',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
