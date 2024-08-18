import { type HTMLAttributes, useEffect, useRef } from 'react';
import type { FieldError } from 'react-hook-form';
import styles from '@root/assets/postcss/helpers.module.css';
import { localeError } from '@root/module/form/form.locale-error';
import { useTranslation } from 'next-i18next';

interface QrbInputProps {
  inputProps: HTMLAttributes<object>;
  label: string;
  error?: FieldError;
}
export default function QrbInput({ inputProps, label, error }: QrbInputProps) {
  const { t } = useTranslation()
  const withDefaultProps = { ...inputProps, ...{ className: 'w-full px-2 py-1 outline-none bg-yellow-100 dark:bg-gray-700' } };
  return (
    <div
      className={`${styles['qrb-input']} qrb-input`}
    >
      { label
      && (
        <label htmlFor={inputProps.id}>
          {label}
        </label>
      )}
      <div className={`${styles['qrb-input-wrap']} qrb-input-wrap-status`}>
        <input {...withDefaultProps} />
      </div>

      {error && <div className="relative top-[-0.5em] px-2 py-1 bg-red-500 text-white">{ localeError(t, error.type) }</div>}
    </div>
  );
}
