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
// for (const { dir, match } of Dirs) {
//   const files = new Glob(`${dir}${match}`).scan()
//
//   for await (const file of files) {
//     let output = ''
//     const [, componentName] = file.match(ComponentNameRe)
//     console.log(file)
//     output = `export { default as ${componentName} } from "${file.replace('./src', '..').replace(/\\/g, '/')}";`
//     writeFileSync(`${dir}${componentName}.ts`, output)
//   }
// }

for (const { dir, match } of Dirs) {
  const files = new Glob(`${dir}${match}`).scan()
  let output = "import { App } from 'vue'\n"
  let pluginComponents = ''

  for await (const file of files) {
    const [, componentName] = file.match(ComponentNameRe)
    output += `export { default as ${componentName} } from '${file.replace('./lib/', './').replace(/\\/g, '/')}'\n`
    pluginComponents += `   app.component('Ash${componentName}', ${componentName})\n`
  }
  output += `
export const AshUI = { 
  install: (app: App<Element>) => {
  ${pluginComponents}
  }
}`

  writeFileSync('./lib/index.ts', output)
}
