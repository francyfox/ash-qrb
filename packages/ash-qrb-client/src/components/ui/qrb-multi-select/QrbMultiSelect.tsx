import styles from '@root/assets/postcss/helpers.module.css';
import { localeError } from '@root/module/form/form.locale-error';
import { useTranslations } from 'next-intl';
import React, { type OptionHTMLAttributes, type SelectHTMLAttributes, useEffect, useId, useRef } from 'react';
import type { Control, FieldError, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { OptionsOrGroups } from 'react-select';
import Select from 'react-select';

export type QrbMultiSelectOption = { label: string; value: string; glyph?: string; attrs?: OptionHTMLAttributes<object> };
interface QrbMultiSelectProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  control: any | Control<FieldValues> | undefined;
  label: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  options: OptionsOrGroups<any, any>;
  attributes?: SelectHTMLAttributes<object>;
  error?: FieldError;
  isMulti?: boolean;
}

export default function QrbMultiSelect({ control, label, options, attributes = {}, error, isMulti }: QrbMultiSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const t = useTranslations();
  const id = useId();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const options = selectRef.current?.querySelectorAll('option');

    if (options) {
      for (const option of options) {
        option.addEventListener('mousedown',
          // biome-ignore lint/complexity/useArrowFunction: <explanation>
          function (e: MouseEvent) {
            e.preventDefault();
            option.parentElement?.focus();
            option.selected = !option.selected;
            return false;
          }, false);
      }
    }
  }, [selectRef.current]);

  return (
    <div
      className={styles['qrb-multi-select']}
    >
      { label
      && <label htmlFor={attributes?.name}>{label}</label>}
      <Controller
        control={control}
        name={attributes?.name ?? id}
        render={({
          field: { onChange, onBlur, value, name, ref },
        }) => (
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder={t('qrb-multi-select-placeholder')}
            instanceId={id}
            options={options}
            isLoading={false}
            isMulti={isMulti ?? false}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            ref={ref}
          />
        )}
      />

      {error && <div className="relative top-[-0.5em] px-2 py-1 bg-red-500 text-white">{ localeError(t, error.type) }</div>}
    </div>
  );
}
