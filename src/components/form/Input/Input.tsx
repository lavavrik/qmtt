import React from 'react';
import * as styles from './styles.sass';

type ValueType = string | number;

interface Props {
  type?: 'text' | 'number';
  placeholder: string;
  value: ValueType;
  setValue: (value: string) => void;
}

export default function Input({
  type,
  placeholder,
  value,
  setValue,
}: Props) {
  return (
    <input
      type={type}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
