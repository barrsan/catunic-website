import { ReactNode, useRef } from 'react';
import clsx from 'clsx';
import { motion, useTransform } from 'framer-motion';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { Title } from '@/ui/shared/Title';

type Props = {
  text: ReactNode[] | ReactNode | string;
  isLast?: boolean;
};

export function HeroTagline({ text, isLast = false }: Props) {
  const taglineRef = useRef(null);
  const { scrollYProgress } = useScrollProxy({
    target: taglineRef,
    offsetStart: 'top bottom',
    offsetEnd: 'bottom top',
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div
      className={clsx([
        'flex h-full flex-col justify-center',
        isLast ? 'h-[160em] md:h-[74em]' : 'md:h-screen-1.4x h-screen',
      ])}
    >
      <motion.div
        ref={taglineRef}
        className="mx-auto px-4"
        style={{
          scale,
        }}
      >
        <Title className="text-center" isDark component="div" size={1}>
          {text}
        </Title>
      </motion.div>
    </div>
  );
}
