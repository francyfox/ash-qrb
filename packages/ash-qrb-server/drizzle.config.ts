import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/module/**/*.schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgresql://oddvjb:xau_tubjnzw7epVbvzBGS8qlmVOi0mhaLVuP2@eu-west-1.sql.xata.sh/ashqrb:main?sslmode=require',
  },
})
