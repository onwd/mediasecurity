import styles from './content.module.scss';
import Typist from 'react-typist-component';
import { ReactNode, useState } from 'react';

export function Content({ children, onTypingDone }: { children: ReactNode, onTypingDone: () => void }) {
  const [shouldShowCursor, setShouldShowCursor] = useState<boolean>(true);

  const handleTypingDone = () => {
    setShouldShowCursor(false);
    onTypingDone();
  };

  return (
    <div className={styles['content']}>
      {/* <Typist
        typingDelay={50}
        cursor={(shouldShowCursor) ? <span className={styles['cursor']}>█</span> : ''}
        onTypingDone={handleTypingDone}
      > */}
        {children}
      {/* </Typist> */}
    </div>
  );
};
