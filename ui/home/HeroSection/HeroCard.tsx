import { RefObject } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import clsx from 'clsx';
import { motion, useTransform } from 'framer-motion';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { ImageData } from '@/types';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  frontSideImage: ImageData;
  backSideImage: ImageData;
};

export function HeroCard({
  containerRef,
  frontSideImage,
  backSideImage,
}: Props) {
  const { scrollYProgress } = useScrollProxy({
    target: containerRef,
    offsetStart: 'top top',
    offsetEnd: 'bottom bottom',
  });

  const rotateY = useTransform(scrollYProgress, [0.3, 0.8], ['0deg', '180deg']);

  return (
    <motion.div
      className="relative h-full w-full transform-style-3d"
      style={{
        rotateY,
      }}
    >
      <div
        className={clsx([
          'absolute',
          'h-full w-full',
          'flex items-center justify-center',
          'transform-style-3d',
          'translate-x-0 translate-y-0 translate-z-px',
          'bg-ds-pink overflow-hidden rounded-main',
        ])}
      >
        <PrismicNextImage
          className="h-full w-full object-cover"
          field={frontSideImage}
        />
      </div>
      <div className="absolute h-full w-full overflow-hidden rounded-main">
        <PrismicNextImage
          className="h-full w-full object-cover -scale-x-100"
          field={backSideImage}
        />
      </div>
    </motion.div>
  );
}
