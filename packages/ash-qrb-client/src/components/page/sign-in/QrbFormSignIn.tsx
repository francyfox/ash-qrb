import { typeboxResolver } from '@hookform/resolvers/typebox'
import QrbInput from '@root/components/ui/qrb-input/QrbInput'
import ApiClient from '@root/module/repository/repository.client'
import { type Static, Type as t } from '@sinclair/typebox'
import { useTranslate } from '@tolgee/react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

const schemaSignIn = t.Object({
  phone: t.String(),
  password: t.String({
    minLength: 6,
  }),
})

export type TSchemaSignIn = Static<typeof schemaSignIn>

export default function QrbFormSignIn() {
  const { t: T } = useTranslate()

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
    resolver: typeboxResolver(schemaSignIn),
  })

  const registerWithMask = useHookFormMask(register)

  const onSubmit = async (formData: TSchemaSignIn) => {
    const { data, error } = await ApiClient.POST('/api/auth/sign-in', {
      body: formData,
    })

    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
        <div className="w-full grid grid-cols-2 gap-2 mt-5">
          <button type="button" className="button-primary">
            {T('form.forgot')}
          </button>
          <button type="submit" className="button-secondary">
            {T('form.send')}
          </button>
        </div>
      </form>
    </>
  )
}
