import { config } from '@/config.ts'
import { db } from '@/core/db'
import { accountSchema } from '@/schema/account.ts'
import { sessionSchema } from '@/schema/session.ts'
import { usersSchema } from '@/schema/user.ts'
import { verificationSchema } from '@/schema/verification.ts'
import { customProviders } from '@/utils/auth/auth.providers.ts'
import { betterAuth } from 'better-auth'
// import { oAuthProxy } from 'better-auth/plugins'
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { socialProviders } from '@/utils/auth/auth.providers.ts'
import { Elysia } from 'elysia'

export const auth = betterAuth({
  plugins: [
    openAPI(),
    // oAuthProxy({
    //   productionURL: 'https://qrb.shalotts.site', // Optional - if the URL isn't inferred correctly
    //   currentURL: 'http://localhost:4000', // Optional - if the URL isn't inferred correctly
    // }),
    customProviders,
  ],
  advanced: {
    cookies: {
      sessionToken: {
        attributes: {
          sameSite: 'none',
        },
        secure: true,
        partitioned: true, // New browser standards will mandate this for foreign cookies
      },
    },
  },
  trustedOrigins: [
    config.CLIENT_APP_URL,
    'http://localhost',
    'https://localhost',
    'https://qrb.shalotts.site',
  ],
  database: drizzleAdapter(db, {
    // We're using Drizzle as our database
    provider: 'pg',
    /*
     * Map your schema into a better-auth schema
     */
    schema: {
      users: usersSchema,
      session: sessionSchema,
      verification: verificationSchema,
      account: accountSchema,
    },
  }),
  emailAndPassword: {
    enabled: true, // If you want to use email and password auth
  },
  socialProviders,
  user: {
    modelName: 'users',
    additionalFields: {
      companyName: {
        type: 'string',
        required: true,
        defaultValue: '',
      },
      status: {
        type: 'number',
        required: false,
        defaultValue: 0,
        input: false,
      },
      phoneVerified: {
        type: 'boolean',
        required: false,
        default: false,
        input: false,
      },
      emailVerified: {
        type: 'boolean',
        required: false,
        default: false,
        input: false,
      },
    },
  },
})

export const betterAuthPlugin = new Elysia({ name: 'better-auth' })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ error, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        })

        if (!session) return error(401)

        return {
          user: session.user,
          session: session.session,
        }
      },
    },
  })
