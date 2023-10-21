import { useRef, useState } from 'react';
import clsx from 'clsx';
import { motion, useAnimationFrame } from 'framer-motion';
import gsap, { Sine } from 'gsap';
import { useEventListener } from 'usehooks-ts';

import { cubicBezierEasing } from '@/constants';

const transitionContent = {
  duration: 0.5,
  ease: cubicBezierEasing.MAIN,
};

export function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState('');

  const cursorRef = useRef(null);
  const pointsRef = useRef([0, 0]);

  useAnimationFrame(() => {
    const [x, y] = pointsRef.current;

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.5,
      ease: Sine.easeOut,
    });
  });

  const handleMouseMove = (e: MouseEvent) => {
    const mfTrigger = (e.target as HTMLElement)?.closest('[data-mf]');

    if (mfTrigger) {
      setLabel(mfTrigger.getAttribute('data-mf') ?? '');
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    pointsRef.current = [e.clientX, e.clientY];
  };

  const handleLinksClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement)?.closest('a');

    if (link) {
      setIsVisible(false);
    }
  };

  useEventListener('mousemove', handleMouseMove);

  useEventListener('click', handleLinksClick);

  return (
    <div
      ref={cursorRef}
      className={clsx([
        'fixed left-0 top-0 z-50',
        'rounded-full',
        'pointer-events-none',
      ])}
    >
      <motion.div
        className={clsx([
          'flex items-center justify-center',
          'h-20 w-20',
          'rounded-full',
          'bg-black bg-opacity-30',
          'backdrop-blur-md backdrop-saturate-200',
          'pointer-events-none',
        ])}
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
        transition={transitionContent}
      >
        <div className="text-secondary text-white">{label}</div>
      </motion.div>
    </div>
  );
}
