import styles from './content.module.scss';
import Typist from 'react-typist-component';
import { ReactNode, useState } from 'react';

const TYPING_DELAY = 50;

export function Content({ children, onTypingDone }: { children: ReactNode, onTypingDone: () => void }) {
  const [shouldShowCursor, setShouldShowCursor] = useState<boolean>(true);

  const handleTypingDone = () => {
    setShouldShowCursor(false);
    onTypingDone();
  };

  return (
    <div className={styles['content']}>
      <Typist
        typingDelay={TYPING_DELAY}
        cursor={(shouldShowCursor) ? <span className={styles['cursor']}>█</span> : ''}
        onTypingDone={handleTypingDone}
      >
        {children}
      </Typist>
    </div>
  );
};
