import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.post('/', async ({ oauth2, cookie: { userRefreshToken } }) => {
    if (userRefreshToken?.value !== undefined) {
      // @ts-ignore
      const tokens = await oauth2.refresh('WorkOS', userRefreshToken.value)
      // @ts-ignore
      await oauth2.revoke('WorkOS', tokens.accessToken())
      userRefreshToken.remove()

      return new Response('', { status: 204 })
    }
  })
