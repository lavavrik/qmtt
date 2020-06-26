import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as styles from './styles.sass';

interface Props {
  icon?: IconDefinition;
  title: string;
  onClick: () => void;
  size?: 'm' | 'l';
  color?: 'primary' | 'secondary';
}

export default function Button({
  icon,
  title,
  onClick,
  size,
  color,
}: Props) {
  return (
    <button
      type="button"
      className={[
        styles.button,
        styles[`size${size || 'm'}`],
        styles[`color${color || 'primary'}`],
      ].join(' ')}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
      {title}
    </button>
  );
}
