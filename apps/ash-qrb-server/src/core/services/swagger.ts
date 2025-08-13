import { config } from '@/config.ts'
import { auth } from '@/utils/auth/auth.ts'

const { info, openapi, ...authSwagger } = await auth.api.generateOpenAPISchema()

export const swaggerOptions = {
  scalarConfig: {
    servers: [
      {
        url: config.API_URL,
      },
    ],
  },
  documentation: {
    info: {
      title: 'ASH-QRB Documentation',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'App',
        description: 'General endpoits',
      },
    ],
    ...authSwagger,
  },
}
