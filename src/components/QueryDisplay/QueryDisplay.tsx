import React from 'react';
import * as styles from './styles.sass';

interface Props {
  query?: string;
}

export default function QueryDisplay({ query }: Props) {
  return (
    <div className={styles.wrapper}>
      {
        !query || (query && query.length === 0)
          ? (
            <div className={styles.placeholder}>
              Your SQL statement goes here:
            </div>
          )
          : (
            <div className={styles.content}>
              { query }
            </div>
          )
      }
    </div>
  );
}
