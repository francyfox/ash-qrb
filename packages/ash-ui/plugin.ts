import {  mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { glob } from 'glob'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const copyVueFilesPlugin = () => {
  return {
    name: 'ash-ui:resolver-generator',
    buildStart() {
      const vueFiles = glob.sync('lib/**/*.vue')
      const componentNameRegex = /([^/]+)\.vue$/

      let mainContent = ''
      for (const file of vueFiles) {
        const match = file.match(componentNameRegex)
        if (match) {
          const componentName = match[1]
          const relativePath = '../lib/' + file.replace('lib/', '')
          mainContent += `export { default as ${componentName} } from '${relativePath}'\n`
        }
      }

      writeFileSync(resolve(__dirname, 'src/lib.ts'), mainContent)
    },
    writeBundle() {
      const vueFiles = glob.sync('lib/**/*.vue')
      const components = []
      const componentNameRegex = /([^/]+)\.vue$/

      for (const file of vueFiles) {
        const match = file.match(componentNameRegex)
        if (match) {
          const componentName = match[1]
          components.push(componentName)
        }
      }

      const distDir = resolve(__dirname, 'dist')
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true })
      }

      let resolverContent = `export const components = [${components.map(name => `'${name}'`).join(',')}]\n`
      resolverContent += `export function ashUIResolver() {\n`
      resolverContent += `  return {\n`
      resolverContent += `    type: 'component',\n`
      resolverContent += `    resolve: (name) => {\n`
      resolverContent += `      const componentNames = [${components.map(name => `'${name}'`).join(',')}]\n`
      resolverContent += `      if (componentNames.includes(name)) {\n`
      resolverContent += `        return { name, from: 'ash-ui' }\n`
      resolverContent += `      }\n`
      resolverContent += `    }\n`
      resolverContent += `  }\n`
      resolverContent += `}\n\n`
      
      resolverContent += `export function generateComponentsDeclaration() {\n`
      resolverContent += `  return \`declare module 'vue' {\n`
      resolverContent += `  export interface GlobalComponents {\n`
      for (const componentName of components) {
        resolverContent += `    ${componentName}: typeof import('ash-ui')['${componentName}']\n`
      }
      resolverContent += `  }\n`
      resolverContent += `}\n`
      resolverContent += `export {}\`\n`
      resolverContent += `}\n`

      writeFileSync(resolve(__dirname, 'dist/resolver.js'), resolverContent)
      
      let dtsContent = "import type { ComponentResolverObject } from 'unplugin-vue-components'\n\n"
      
      dtsContent += "export declare const components: string[]\n"
      dtsContent += "export declare function ashUIResolver(): ComponentResolverObject\n"
      
      writeFileSync(resolve(__dirname, 'dist/resolver.d.ts'), dtsContent)
    }
  }
}
