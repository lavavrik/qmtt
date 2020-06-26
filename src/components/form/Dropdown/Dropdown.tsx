import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import * as styles from './styles.sass';

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: { key: string, label: string }[];
  width?: number;
}

export default function Dropdown({
  value,
  onChange,
  options,
  width,
}: Props) {
  const [isListShown, setListShown] = useState(false);

  useEffect(() => {
    const hideListEvent = () => { setListShown(false); };

    document.addEventListener('click', hideListEvent);

    return () => {
      document.removeEventListener('click', hideListEvent);
    };
  });

  return (
    <div
      className={styles.wrapper}
      style={width ? {
        width: `${width}px`,
        flexGrow: 0,
      } : {}}
    >
      <div
        className={styles.view}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          setListShown(!isListShown);
        }}
      >
        <div className={styles.title}>
          {
            options.find((option) => option.key === value)?.label || ''
          }
        </div>
        <div className={styles.handle}>
          <FontAwesomeIcon icon={isListShown ? faChevronUp : faChevronDown} />
        </div>
      </div>
      <div className={[styles.list, isListShown ? styles.shown : ''].join(' ')}>
        {
          options.map((option, i) => (
            <div
              key={String(i)}
              className={[styles.option, value === option.key ? styles.active : ''].join(' ')}
              onClick={() => {
                onChange(option.key);
              }}
            >
              {option.label}
            </div>
          ))
        }
      </div>
    </div>
  );
}
