import { nanoid } from 'nanoid'

export const generateId = () => nanoid()

export async function calculateFileChecksum(
  file: File,
): Promise<string | null> {
  try {
    const hasher = new Bun.CryptoHasher('md5')
    return hasher.update(file).digest('hex')
  } catch (error) {
    console.error('Error hashing file:', error)
    return null
  }
}
