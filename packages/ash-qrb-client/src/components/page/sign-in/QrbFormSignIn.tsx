import { typeboxResolver } from '@hookform/resolvers/typebox'
import QrbInput from '@root/components/ui/qrb-input/QrbInput'
import { Type as t } from '@sinclair/typebox'
import { useTranslate } from '@tolgee/react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

export default function QrbFormSignIn() {
  const { t: T } = useTranslate()
  const formSchema = t.Object({
    phone: t.String(),
    password: t.String({
      minLength: 6,
    }),
  })

  const defaultValues = {
    phone: '',
    password: '',
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: typeboxResolver(formSchema),
  })

  const registerWithMask = useHookFormMask(register)

  return (
    <>
      <form className="text-dark darkl">
        <QrbInput
          inputProps={{
            ...registerWithMask('phone', ['+ 7 (999) 999-99-99']),
            ...{
              type: 'text',
              placeholder: '+ 7 (___) ___-__-__',
              inputMode: 'numeric',
              autoComplete: 'tel',
              required: true,
            },
          }}
          label={T('form.phone')}
          error={errors.phone}
        />
        <QrbInput
          inputProps={{
            ...register('password'),
            ...{
              type: 'password',
              placeholder: '******',
              autoComplete: 'current-password',
              minLength: 6,
              required: true,
            },
          }}
          label={T('form.password')}
          error={errors.password}
        />
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
    </>
  )
}
