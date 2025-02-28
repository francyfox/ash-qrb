import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.post('/', async ({ redirect, oauth2 }) => {
    const url = oauth2.createURL('WorkOS')

    return redirect(url.toString())
  })
