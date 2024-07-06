import type { HTMLAttributes } from 'react';
import styles from '@root/assets/postcss/helpers.module.css';
interface QrbInputProps {
  inputProps: HTMLAttributes<object>;
  label: string;
}
export default function QrbInput({ inputProps, label }: QrbInputProps) {
  return (
    <div className={`${styles['qrb-input']} qrb-input`}>
      { label
      && (
        <label htmlFor={inputProps.id}>
          {label}
        </label>
      )}
      <div className={`${styles['qrb-input-wrap']} qrb-input-wrap-status`}>
        <input {...inputProps} />
      </div>
    </div>
  );
}
