import { useEffect, useRef } from 'react';
import styles from './background.module.scss';

export function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backgroundRef.current) {
      const colors = ['#3CC157', '#2AA7FF', '#FCBC0F', '#F85F36'];
      const numBalls = 50;
      const balls = [];

      for (let i = 0; i < numBalls; i++) {
        const ball = document.createElement('div');
        ball.classList.add(styles['ball']);
        ball.style.background = colors[Math.floor(Math.random() * colors.length)];
        ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
        ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${Math.random()}em`;
        ball.style.height = ball.style.width;

        balls.push(ball);
        backgroundRef.current.appendChild(ball);

        const toX = Math.random() * (i % 2 === 0 ? -11 : 11);
        const toY = Math.random() * 12;

        ball.animate(
          [
            { transform: 'translate(0, 0)' },
            { transform: `translate(${toX}rem, ${toY}rem)` }
          ],
          {
            duration: (Math.random() + 1) * 2000,
            direction: 'alternate',
            fill: 'both',
            iterations: Infinity,
            easing: 'ease-in-out'
          }
        );
      }
    }
  }, [backgroundRef]);

  return (
    <div ref={backgroundRef} className={styles['background']}></div>
  );
};
