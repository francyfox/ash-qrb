import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { glob } from 'glob'

let updateTimeout: NodeJS.Timeout | null = null
let lastUpdateContent = ''

export function ashUITypesPlugin() {
  return {
    name: 'ash-ui:dts-updater',
    configResolved() {
      updateComponentsDeclaration()
    },
    handleHotUpdate(ctx: any) {
      if (ctx.file.includes('packages/ash-ui') && ctx.file.endsWith('.vue')) {
        debouncedUpdate()
      }
    },
  }
}

function debouncedUpdate() {
  if (updateTimeout) {
    clearTimeout(updateTimeout)
  }
  updateTimeout = setTimeout(() => {
    updateComponentsDeclaration()
  }, 1000)
}

export function updateComponentsDeclaration() {
  const componentsFilePath = resolve(process.cwd(), 'components.d.ts')

  if (!existsSync(componentsFilePath)) {
    console.warn('components.d.ts not found, skipping ash-ui types injection')
    return
  }

  const originalContent = readFileSync(componentsFilePath, 'utf-8')
  let content = originalContent

  content = content.replace(
    /\s*\/\/ ash-ui types injected[\s\S]*?\/\/ end ash-ui types/g,
    '',
  )

  content = content.replace(
    /^\s*[A-Za-z0-9]+:\s*typeof import\('\.\.\/\.\.\/packages\/ash-ui\/.*?'\)\['default'\]\s*$/gm,
    '',
  )

  content = content.replace(/\n\s*\n\s*\n/g, '\n\n')

  const ashUIPath = resolve(process.cwd(), '../../packages/ash-ui')
  const vueFiles = glob.sync('lib/**/*.vue', { cwd: ashUIPath })

  const ashUIDeclarations = vueFiles
    .map((file) => {
      const componentName = file.match(/([^/]+)\.vue$/)?.[1]
      if (componentName) {
        const relativePath = `../../packages/ash-ui/${file}`
        return `    ${componentName}: typeof import('${relativePath}')['default']`
      }
      return null
    })
    .filter(Boolean)
    .join('\n')

  if (ashUIDeclarations) {
    const newContent = content.replace(
      /export interface GlobalComponents \{(\n)/,
      `export interface GlobalComponents {\n    // ash-ui types injected\n${ashUIDeclarations}\n    // end ash-ui types\n`,
    )

    if (newContent !== originalContent && newContent !== lastUpdateContent) {
      writeFileSync(componentsFilePath, newContent)
      lastUpdateContent = newContent
      console.log('✨ Updated components.d.ts with ash-ui Vue file paths')
    }
  } else {
    if (content !== originalContent && content !== lastUpdateContent) {
      writeFileSync(componentsFilePath, content)
      lastUpdateContent = content
      console.log(
        '🧹 Cleaned up duplicate ash-ui components in components.d.ts',
      )
    }
  }
}
