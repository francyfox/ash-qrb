import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {
      pipeline: {
        dev: {
          cache: false
        }
      }
    }
  }
}

export default nextConfig