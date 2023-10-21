import { useEffect } from 'react';
import { useAnimate, useInView } from 'framer-motion';

export function useAnimatedShowing(isAnimated: boolean) {
  const [animationScope, animate] = useAnimate();
  const isInView = useInView(animationScope, {
    once: true,
    amount: 0.2,
  });

  useEffect(() => {
    if (isAnimated) {
      animate(
        animationScope.current,
        {
          filter: isInView ? 'blur(0px)' : 'blur(8px)',
          opacity: isInView ? 1 : 0,
        },
        {
          delay: 0.2,
          duration: 0.6,
          ease: 'easeOut',
        },
      );
    }
  }, [isInView, isAnimated, animate, animationScope]);

  return {
    animationScope,
  };
}
