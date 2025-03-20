import { type InferType, object, string } from 'yup'

export const LoginSchema = object({
  phone: string().min(7).max(20),
  email: string().email(),
  password: string().min(8).max(80).required(),
})

export type TLoginSchema = InferType<typeof LoginSchema>
