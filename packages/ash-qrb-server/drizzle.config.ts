import { defineConfig } from 'drizzle-kit'

const url = process.env.XATA_DB_PG_HOST?.replace("${XATA_API_KEY}", process.env.XATA_API_KEY ?? '') ?? ''

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/module/**/*.schema.ts',
  out: './drizzle',
  dbCredentials: {
    url
  },
})
