import { join } from 'node:path'

export const ROOT_DIR = join(process.cwd(), '../../')
export const CERT_DIR = join(ROOT_DIR, './docker/certs')
export const REDIS_DIR = join(ROOT_DIR, './docker/certs/redis')
export const PROJECT_DIR = process.cwd()
export const PUBLIC_DIR = join(PROJECT_DIR, './public')
