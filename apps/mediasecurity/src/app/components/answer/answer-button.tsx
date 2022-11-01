import { ReactNode, useEffect, useState } from 'react';
import { Button } from '../button/button';
import styles from './answer-button.module.scss';

export function AnswerButton({
  children,
  isCorrect,
  onClick,
  onAnimationEnd
}: {
  children: ReactNode,
  isCorrect: boolean,
  onClick?: () => void,
  onAnimationEnd?: () => void
}) {
  const [shouldRunCorrectAnimation, setShouldRunCorrectAnimation] = useState<boolean>(false);
  const [shouldRunWrongAnimation, setShouldRunWrongAnimation] = useState<boolean>(false);

  useEffect(() => {
    console.log('Should run wrong animation', shouldRunWrongAnimation);
  }, [shouldRunWrongAnimation]);

  useEffect(() => {
    console.log('Should run correct animation', shouldRunCorrectAnimation);
  }, [shouldRunCorrectAnimation]);

  const handleClick = () => {
    if (isCorrect) {
      setShouldRunCorrectAnimation(true);
    } else {
      setShouldRunWrongAnimation(true);
    }

    if (onClick) {
      onClick();
    }
  };

  const handleAnimationEnd = () => {
    if (isCorrect) {
      setShouldRunCorrectAnimation(false);
    } else {
      setShouldRunWrongAnimation(false);
    }

    if (onAnimationEnd) {
      onAnimationEnd();
    }
  };

  return (
    <Button
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
      className={((shouldRunWrongAnimation) ? styles['answer-button__wrong'] : '') + ' ' + ((shouldRunCorrectAnimation) ? styles['answer-button__correct'] : '')}
    >
      {children}
    </Button>
  );
};
