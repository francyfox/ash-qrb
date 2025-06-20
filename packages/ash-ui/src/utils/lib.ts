import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { normalize } from 'pathe'

console.log()
export const runtimeDir = normalize(fileURLToPath(new URL('./lib', import.meta.url)))

export const componentPath = (name: string) => join(runtimeDir, 'lib', `${name}.vue`)