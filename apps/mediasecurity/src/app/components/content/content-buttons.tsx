import styles from './content-buttons.module.scss';
import { ReactNode } from 'react';

export function ContentButtons({ children }: { children: ReactNode }) {
  return (
    <div className={styles['content-buttons']}>
      {children}
    </div>
  );
};
