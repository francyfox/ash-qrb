import type { InferType, Schema } from "yup";
import { object, string, ref } from "yup";
import { LoginSchema } from "~/components/forms/login/login.schema";

const { t } = useI18n()
export const registerSchema = object({
  phone: string()
    .min(7)
    .max(20)
    .required(),
  email: string()
    .email()
    .required(),
  password: string()
    .min(8)
    .max(80)
    .required(),
  passwordRepeat: string()
    .oneOf([ref('password'), null], t('formRegisterErrorPasswordRepeat')),
  avatar: string()
    .url(),
  position: string()
})
export type TRegisterSchema = InferType<typeof registerSchema>
