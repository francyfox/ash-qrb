import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.get('', 'ok', {
    detail: { tags: ['App'] },
  })
