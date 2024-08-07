import { typeboxResolver } from '@hookform/resolvers/typebox'
import QrbInput from '@root/components/ui/qrb-input/QrbInput'
import QrbModal from '@root/components/ui/qrb-modal/QrbModal'
import QrbMultiSelect from '@root/components/ui/qrb-multi-select/QrbMultiSelect'
import type { QrbMultiSelectOption } from '@root/components/ui/qrb-multi-select/QrbMultiSelect'
import ApiClient from '@root/module/repository/repository.client'
import ArrowBack from '@sicons/ionicons5/ArrowBack.svg'
import { Type as t } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'
import { useTranslate } from '@tolgee/react'
import { usersRoles } from 'ash-qrb-server/src/module/users/users.enum'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

const schemaSignUp = t.Object({
  phone: t.String(),
  fullName: t.String({
    pattern: '^\\D+$',
  }),
  password: t.String({
    minLength: 6,
  }),
  hasMessenger: t.Array(
    t.Object({
      value: t.String(),
    }),
    {
      minItems: 1,
      maxItems: 2,
    },
  ),
})

export type TSchemaSignUp = Static<typeof schemaSignUp>

export default function QrbFormSignUp({
  role,
  back,
}: { role: number | undefined; back: () => void }) {
  const router = useRouter()
  const { t: T } = useTranslate()

  const [showModal, setModal] = useState<boolean>(false)
  const [formTitle, setFormTitle] = useState<string>('')
  const [formMessage, setFormMessage] = useState<string>('')

  const excludedFieldsByRoles = new Map()
  excludedFieldsByRoles.set(usersRoles.client, ['companyId', 'tags'])
  excludedFieldsByRoles.set(usersRoles.costumer, [])
  excludedFieldsByRoles.set(usersRoles.manager, [])

  const isVisibleField = (field: string): boolean =>
    role ? !excludedFieldsByRoles.get(role).includes(field) : false

  const defaultValues = {
    role: '',
    fullName: '',
    password: '',
    phone: '',
    hasMessenger: [],
    tags: [],
    hideContacts: true,
    // companyId: '',
  }
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: typeboxResolver(schemaSignUp),
  })

  const registerWithMask = useHookFormMask(register)

  const MessengerOptions = [
    {
      label: T('messenger.telegram'),
      value: 'telegram',
      attrs: { className: 'icon-telegram' },
    },
    {
      label: T('messenger.whatsapp'),
      value: 'whatsapp',
      attrs: { className: 'icon-square-whatsapp' },
    },
  ] as QrbMultiSelectOption[]

  const onSubmit = async (formData: TSchemaSignUp) => {
    const formDataExtended = {
      ...formData,
      ...{
        role,
        hasMessenger: formData.hasMessenger.map((i) => i.value),
      },
    }

    const { data, error } = await ApiClient.POST('/api/auth/sign-up', {
      body: formDataExtended,
    })

    if (!error) {
      const { phone, password } = data.item
      const authResponse = await ApiClient.POST('/api/auth/sign-in', {
        body: {
          phone,
          // @ts-ignore
          password,
        },
      })

      if (!authResponse.error)
        await router.push(`/s/users/${data.item.publicId}`)
    } else {
      console.log(error)
      setFormTitle(T('form.error'))
      setFormMessage(error?.message)
      setModal(true)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex">
        <button
          type="button"
          className="button-primary opacity-40 flex gap-2"
          onClick={back}
        >
          <ArrowBack className="icon" />
          {T('form.back')}
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="qrb-form flex flex-col gap-4"
      >
        {isVisibleField('fullName') && (
          <QrbInput
            inputProps={{
              ...register('fullName'),
              ...{
                type: 'text',
                placeholder: 'John Doe',
                autoComplete: 'name',
                pattern: '^\\D+$',
                required: true,
              },
            }}
            label={T('form.fullName')}
            error={errors.fullName}
          />
        )}

        {isVisibleField('phone') && (
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
        )}

        {isVisibleField('hasMessenger') && (
          <QrbMultiSelect
            control={control}
            label={T('form.hasMessager')}
            options={MessengerOptions}
            attributes={{ ...register('hasMessenger') }}
            isMulti={true}
          />
        )}

        {isVisibleField('hasMessenger') && (
          <QrbInput
            inputProps={{
              ...register('password'),
              ...{
                type: 'password',
                placeholder: '******',
                autoComplete: 'new-password',
                minLength: 6,
                required: true,
              },
            }}
            label={T('form.password')}
            error={errors.password}
          />
        )}

        <button type="submit" className="button-secondary">
          Submit
        </button>
      </form>
      <QrbModal
        show={showModal}
        title={formTitle}
        onClose={() => setModal(false)}
      >
        {formMessage}
      </QrbModal>
    </div>
  )
}
