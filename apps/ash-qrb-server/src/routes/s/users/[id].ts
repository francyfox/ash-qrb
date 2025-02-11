import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.get('', ({ body, error }) => {
    // const users = await db.select
  })
