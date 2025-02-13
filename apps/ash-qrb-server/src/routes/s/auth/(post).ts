import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.post('/', async ({ oauth2, redirect }) => {
    const url = oauth2.createURL('WorkOS', ['email'])
    url.searchParams.set('access_type', 'offline')

    return {
      urlRedirect: url.toString(),
    }
  })
