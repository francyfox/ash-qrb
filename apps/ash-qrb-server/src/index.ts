import { CERT_DIR } from '@/consts.ts'
import { redisClient } from '@/core/services/redis.ts'
import { join } from 'node:path'
import { config } from '@/config.ts'
import { client } from '@/core/db/index.ts'
import { posthog } from '@/core/services/posthog.ts'
import { app } from '@/server.ts'

const signals = ['SIGINT', 'SIGTERM']

for (const signal of signals) {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Initiating graceful shutdown...`)
    // await app.stop()
    await posthog.shutdown()
    redisClient.close()
    process.exit(0)
  })
}

process.on('uncaughtException', (error) => {
  console.error(error)
})

process.on('unhandledRejection', (error) => {
  console.error(error)
})

await client.connect()
console.log('🗄  Database was connected!')

await redisClient.connect()

app.listen(
  {
    port: config.PORT,
    tls: {
      key: Bun.file(join(CERT_DIR, './private.pem')),
      cert: Bun.file(join(CERT_DIR, './cert.pem')),
    },
  },
  () => {
    console.log(`🕮  Swagger is active at: ${app.server?.url.origin}/swagger`)
    console.log(`😋  Server started at: ${app.server?.url.origin}`)
  },
)
