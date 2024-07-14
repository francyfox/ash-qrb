import { parseArgs } from 'util'
import { openapiGenerate } from '@root/core/module/openapi/openapi.generate'
import { log } from '@root/core/module/plugin/plugin.logger'

let running = true

function killProcess() {
  running = false
}

function run() {
  setTimeout(() => {
    if (running) run()
  }, 10)
}

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    jsonUrl: {
      type: 'string',
    },
    dir: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
})

process.on('SIGTERM', killProcess)
process.on('SIGINT', killProcess)
process.on('uncaughtException', (error) => {
  log.error('[uncaughtException] app will be terminated: ', error.stack)
  killProcess()
})

if (typeof values.dir === 'string' && typeof values.jsonUrl === 'string') {
  await openapiGenerate({
    swaggerJsonUrl: new URL(values.jsonUrl),
    dir: values.dir,
  })
}

console.log('test')
run()
