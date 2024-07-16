import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/module/**/*.schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.XATA_DB_PG_HOST ?? '',
  },
})
