import { writeFileSync } from 'node:fs'
import { Glob } from 'bun'

const Dirs = [
  {
    dir: './lib/components/',
    match: '**/*.vue',
    name: 'components',
  },
]

const ComponentNameRe = /(\w+)\.(\w+)$/

for (const { dir, match } of Dirs) {
  const files = new Glob(`${dir}${match}`).scan()
  const components = []
  let output = "import type { App } from 'vue'\n" +
    "import { defineAsyncComponent } from 'vue'\n" +
    "import type { ComponentResolverObject } from 'unplugin-vue-components'\n"
  let pluginComponents = ''

  for await (const file of files) {
    const [, componentName] = file.match(ComponentNameRe)
    const path = file.replace('./lib/', './').replace(/\\/g, '/')
    output += `export { default as ${componentName} } from '${path}'\n`
    pluginComponents += `   app.component('${componentName}', defineAsyncComponent(() => import('${path}')))\n`
    components.push(componentName)
  }
  

  output += `
export const components = [${components.map(i => `'${i}'`).join(',')}]
export const ashUIResolver: ComponentResolverObject = {
  type: 'component',
  resolve: (name: string) => {
    if (components.includes(name)) return { name, from: 'ash-ui' }
  }
}
export const AshUI = { 
  install: (app: App<Element>) => {
    ${pluginComponents}
  }
}
`

  writeFileSync('./lib/index.ts', output)
}
