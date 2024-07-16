#!/bin/env node
import { parseArgs } from 'node:util'
import { openapiGenerate } from '@root/module/openapi/openapi.generate'

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
  console.log('[uncaughtException] app will be terminated: ', error.stack)
  killProcess()
})

if (typeof values.dir === 'string' && typeof values.jsonUrl === 'string') {
  await openapiGenerate({
    swaggerJsonUrl: new URL(values.jsonUrl),
    dir: values.dir,
  })
} else {
  await openapiGenerate()
}
// run()
