import { config } from '@/config.ts'
import { db } from '@/core/db/index.ts'
import { accountSchema } from '@/schema/account'
import { sessionSchema } from '@/schema/session'
import { usersSchema } from '@/schema/user'
import { verificationSchema } from '@/schema/verification'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    // We're using Drizzle as our database
    provider: 'pg',
    /*
     * Map your schema into a better-auth schema
     */
    schema: {
      usersSchema,
      sessionSchema,
      verificationSchema,
      accountSchema,
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
})
