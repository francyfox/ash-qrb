import { config } from '@/config.ts'
import { client } from '@/core/db/index.ts'
import { posthog } from '@/core/services/posthog.ts'
import { app } from '@/server.ts'

const signals = ['SIGINT', 'SIGTERM']

for (const signal of signals) {
  process.on(signal, async () => {
    console.log(`Received ${signal}. Initiating graceful shutdown...`)
    await app.stop()
    await posthog.shutdown()
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

app.listen(config.PORT, () => {
  console.log(
    `🕮  Swagger is active at: http://${app.server?.hostname}:${app.server?.port}/swagger`,
  )
  console.log(`🦊 Server started at ${app.server?.url.origin}`)
})
