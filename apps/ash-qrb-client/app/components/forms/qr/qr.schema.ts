import { type InferType, object, string } from 'yup'

export const QRB_STATUS = {
  DISABLED: 0,
  ACTIVE: 1,
}

export const qrSchema = () => {
  const { t } = useI18n()

  return object({
    status: object(),
    name: string().min(3).max(70).required(t('formNameRequired')),
    description: string().max(255),
    qrCode: string(),
  })
}

type TQrbFn = ReturnType<typeof qrSchema>
export type TQrbSchema = InferType<TQrbFn>
