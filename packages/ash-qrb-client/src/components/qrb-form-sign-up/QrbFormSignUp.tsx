import { useForm, SubmitHandler } from 'react-hook-form';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { Type as t } from '@sinclair/typebox';
import QrbInput from '@root/components/qrb-input/QrbInput';
import { useTranslate } from '@tolgee/react';
import QrbMultiSelect, {
  QrbMultiSelectOption,
} from '@root/components/qrb-multi-select/QrbMultiSelect';
export default function QrbFormSignUp() {
  const { t: T } = useTranslate();
  const schemaSignUp = t.Object({
    phone: t.String(),
    fullName: t.String(),
    password: t.String({
      minLength: 6,
      pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/',
    }),
    passwordRepeat: t.String(),
  });

  const defaultValues = {
    role: '',
    fullName: '',
    password: '',
    passwordRepeat: '',
    phone: '',
    hasMessenger: [],
    tags: [],
    hideContacts: true,
    qr: '',
    companyId: '',
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: typeboxResolver(schemaSignUp),
  });

  const MessengerOptions = [
    {
      key: T('messenger.telegram'),
      value: 'telegram',
      attrs: { className: 'icon-telegram' },
    },
    {
      key: T('messenger.whatsapp'),
      value: 'whatsapp',
      attrs: { className: 'icon-square-whatsapp' },
    },
  ] as QrbMultiSelectOption[];
  function submitHandler() {

  }

  return (
    <form onSubmit={submitHandler} className="qrb-form">
      <QrbInput
        inputProps={{
          ...register('fullName'),
          ...{ type: 'text', placeholder: 'John Doe', autoComplete: 'name', pattern: '^\\D+$' },
        }}
        label={T('form.fullName')}
      />
      <QrbInput
        inputProps={{
          ...register('phone'),
          ...{ type: 'tel', placeholder: '+ 7 (XXX) XXX-XX', inputMode: 'numeric', autoComplete: 'tel', pattern: '(\+7\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2})' },
        }}
        label={T('form.phone')}
      />
      <QrbMultiSelect
        label={T('form.hasMessager')}
        options={MessengerOptions}
        attributes={{ ...register('hasMessenger') }}
      />
      <QrbInput
        inputProps={{
          ...register('password'),
          ...{ type: 'password', placeholder: '******', autoComplete: 'new-password', minLength: 6 },
        }}
        label={T('form.password')}
      />

      <button type="submit" className="button-primary">
        Submit
      </button>
    </form>
  );
}
