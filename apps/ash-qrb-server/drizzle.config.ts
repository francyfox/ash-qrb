import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config
