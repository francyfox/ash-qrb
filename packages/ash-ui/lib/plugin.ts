import { copyFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { glob } from 'glob'
import { resolve } from 'node:path'

export const copyVueFilesPlugin = () => {
  return {
    name: 'copy-vue-files',
    writeBundle() {
      const vueFiles = glob.sync('lib/**/*.vue')
      const components = []
      let indexContent = "import type { App } from 'vue'\n" +
        "import { defineAsyncComponent } from 'vue'\n" +
        "import type { ComponentResolverObject } from 'unplugin-vue-components'\n"
      let pluginComponents = ''

      const componentNameRegex = /([^/]+)\.vue$/

      for (const file of vueFiles) {
        const distPath = file.replace('lib/', 'dist/')
        const distDir = distPath.substring(0, distPath.lastIndexOf('/'))

        if (!existsSync(distDir)) {
          mkdirSync(distDir, { recursive: true })
        }

        copyFileSync(file, distPath)

        const match = file.match(componentNameRegex)
        if (match) {
          const componentName = match[1]
          const relativePath = './' + file.replace('lib/', '')

          indexContent += `export { default as ${componentName} } from '${relativePath}'\n`
          pluginComponents += `   app.component('${componentName}', defineAsyncComponent(() => import('${relativePath}')))\n`
          components.push(componentName)
        }
      }

      indexContent += `\nexport const components = [${components.map(name => `'${name}'`).join(',')}]\n`
      indexContent += `export const ashUIResolver: ComponentResolverObject = {\n`
      indexContent += `  type: 'component',\n`
      indexContent += `  resolve: (name: string) => {\n`
      indexContent += `    if (components.includes(name)) return { name, from: 'ash-ui' }\n`
      indexContent += `  }\n`
      indexContent += `}\n`
      indexContent += `export const AshUI = { \n`
      indexContent += `  install: (app: App<Element>) => {\n`
      indexContent += pluginComponents
      indexContent += `  }\n`
      indexContent += `}\n`

      writeFileSync(resolve(__dirname, 'dist/index.js'), indexContent)
    }
  }
}