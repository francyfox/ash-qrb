import { config } from '@/config.ts'
import { db } from '@/core/db/index.ts'
import { accountSchema } from '@/schema/account'
import { sessionSchema } from '@/schema/session'
import { usersSchema } from '@/schema/user'
import { verificationSchema } from '@/schema/verification'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { Elysia } from 'elysia'

export const auth = betterAuth({
  trustedOrigins: [config.CLIENT_APP_URL],
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
  socialProviders: {
    google: {
      clientId: config.PROVIDER_GOOGLE_CLIENT_ID,
      clientSecret: config.PROVIDER_GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    modelName: 'users',
    additionalFields: {
      companyName: {
        type: 'string',
        required: false,
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
