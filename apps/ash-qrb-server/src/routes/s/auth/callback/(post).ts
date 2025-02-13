import { config } from '@/config.ts'
import type { ElysiaApp } from '@/server.ts'

export default (app: ElysiaApp) =>
  app.post('/', async ({ redirect, oauth2, cookie: { userRefreshToken } }) => {
    const tokens = await oauth2.authorize('WorkOS')

    if (tokens.hasRefreshToken() && userRefreshToken) {
      userRefreshToken.set({
        value: tokens.refreshToken(),
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
      })
    }

    return redirect(config.CLIENT_APP_URL)
  })
