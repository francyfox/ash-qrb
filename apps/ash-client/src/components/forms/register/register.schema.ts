import type { InferType } from 'yup'
import { object, string, ref } from 'yup'

export const registerSchema = () => {
  const { t } = useI18n()

  return object({
    phone: string().min(7).max(20).required(),
    email: string().email().required(),
    password: string().min(8).max(80).required(),
    passwordRepeat: string().oneOf(
      [ref('password'), null],
      t('formRegisterErrorPasswordRepeat'),
    ),
    avatar: string().url(),
    position: string(),
  })
}

type TRegisterFn = ReturnType<typeof registerSchema>
export type TRegisterSchema = InferType<TRegisterFn>
