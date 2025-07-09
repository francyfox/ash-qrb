import { config } from '@/config.ts'
import { v2 as cloudinary } from 'cloudinary'

export const storage = () => {
  const { CLOUD_NAME, CLOUDINARY_SECRET, CLOUDINARY_KEY } = config

  cloudinary.config({
    api_secret: CLOUDINARY_SECRET,
    api_key: CLOUDINARY_KEY,
    cloud_name: CLOUD_NAME,
  })

  return cloudinary
}
