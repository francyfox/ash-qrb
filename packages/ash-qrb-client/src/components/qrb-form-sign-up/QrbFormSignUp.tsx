import { useForm } from 'react-hook-form';

import { typeboxResolver } from '@hookform/resolvers/typebox';
import { Static, Type as t } from '@sinclair/typebox';
import QrbInput from '@root/components/qrb-input/QrbInput';
import { useTranslate } from '@tolgee/react';
import QrbMultiSelect, {
  QrbMultiSelectOption,
} from '@root/components/qrb-multi-select/QrbMultiSelect';
import { useHookFormMask } from 'use-mask-input';

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
    }
  ),
});

export type TSchemaSignUp = Static<typeof schemaSignUp>;

export default function QrbFormSignUp() {
  const { t: T } = useTranslate();

  const defaultValues = {
    role: '',
    fullName: '',
    password: '',
    phone: '',
    hasMessenger: [],
    tags: [],
    hideContacts: true,
    companyId: '',
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: typeboxResolver(schemaSignUp),
  });

  const registerWithMask = useHookFormMask(register);

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
  ] as QrbMultiSelectOption[];

  const onSubmit = (data: TSchemaSignUp) => {
    const formData = {
      ...data,
      ...{
        hasMessenger: data.hasMessenger.map(i => i.value),
      },
    };

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="qrb-form flex flex-col gap-4">
      <p>{errors.fullName?.message}</p>
      <QrbInput
        inputProps={{
          ...register('fullName'),
          ...{ type: 'text', placeholder: 'John Doe', autoComplete: 'name', pattern: '^\\D+$', required: true },
        }}
        label={T('form.fullName')}
        error={errors.fullName}
      />
      <QrbInput
        inputProps={{
          ...registerWithMask('phone', ['+ 7 (999) 999-99']),
          ...{
            type: 'text',
            placeholder: '+ 7 (___) ___-__',
            inputMode: 'numeric',
            autoComplete: 'tel',
            required: true,
          },
        }}
        label={T('form.phone')}
        error={errors.phone}
      />
      <QrbMultiSelect
        control={control}
        label={T('form.hasMessager')}
        options={MessengerOptions}
        attributes={{ ...register('hasMessenger') }}
      />
      <QrbInput
        inputProps={{
          ...register('password'),
          ...{ type: 'password', placeholder: '******', autoComplete: 'new-password', minLength: 6, required: true },
        }}
        label={T('form.password')}
        error={errors.password}
      />

      <button type="submit" className="button-primary">
        Submit
      </button>
    </form>
  );
}
