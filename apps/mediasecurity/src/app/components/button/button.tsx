import { ReactNode } from 'react';
import styles from './button.module.scss';

export function Button({
  children,
  className,
  onClick,
  onAnimationEnd
}: {
  children: ReactNode,
  className?: string,
  onClick?: () => void,
  onAnimationEnd?: () => void
}) {
  return (
    <button
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
      className={styles['button'] + ' ' + (className || '')}
    >
      {children}
    </button>
  );
};
