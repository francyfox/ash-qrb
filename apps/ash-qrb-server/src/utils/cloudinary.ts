import { config } from '@/config.ts'
import { v2 as cloudinary } from 'cloudinary'

export const storage = () => {
  const { CLOUD_NAME, CLOUDINARY_SECRET, CLOUDINARY_KEY } = config
  cloudinary.config({
    CLOUDINARY_SECRET,
    CLOUDINARY_KEY,
    CLOUD_NAME,
  })

  return cloudinary
}
