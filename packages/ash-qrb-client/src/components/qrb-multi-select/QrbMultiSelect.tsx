import React, { SelectHTMLAttributes, OptionHTMLAttributes, useEffect, useRef } from 'react';
import styles from '@root/assets/postcss/helpers.module.css';

export type QrbMultiSelectOption = { key: string; value: string; glyph?: string; attrs?: OptionHTMLAttributes<object> };
interface QrbMultiSelectProps {
  label: string;
  options: QrbMultiSelectOption[];
  attributes?: SelectHTMLAttributes<object>;
}

export default function QrbMultiSelect({ label, options, attributes = {} }: QrbMultiSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const options = selectRef.current?.querySelectorAll('option');

    if (options) {
      for (const option of options) {
        option.addEventListener('mousedown',
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
      <select
        {...{ ...attributes, ...{ multiple: true, ref: selectRef, size: options.length } }}
      >
        { options.map((option, index) => (
          <option key={index} value={option.value} {...option.attrs}>
            { option.key }
          </option>
        )) }
      </select>
    </div>
  );
}
