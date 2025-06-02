import { writeFileSync } from 'node:fs'
import { Glob } from 'bun'

const Dirs = [
  {
    dir: './src/components/',
    exports: './src/exports/',
    match: '**/*.vue',
    name: 'components',
  },
]

const ComponentNameRe = /(\w+)\.(\w+)$/
for (const { dir, match, exports } of Dirs) {
  const files = new Glob(`${dir}${match}`).scan()

  for await (const file of files) {
    let output = ''
    const [, componentName] = file.match(ComponentNameRe)
    console.log(file)
    output = `export { default as ${componentName} } from "${file.replace('./src', '..').replace(/\\/g, '/')}";`
    writeFileSync(`${exports}${componentName}.ts`, output)
  }
}
