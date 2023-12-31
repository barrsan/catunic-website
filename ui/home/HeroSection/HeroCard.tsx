import { RefObject, useCallback, useState } from 'react';
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

const motionVariants = {
  animate: (custom: boolean) => ({
    y: custom ? '0%' : '50%',
    transition: {
      duration: 0.5,
    },
  }),
};

export function HeroCard({
  containerRef,
  frontSideImage,
  backSideImage,
}: Props) {
  const [isFrontImageLoaded, setIsFrontImageLoaded] = useState(false);
  const [isBackImageLoaded, setIsBackImageLoaded] = useState(false);

  const { scrollYProgress } = useScrollProxy({
    target: containerRef,
    offsetStart: 'top top',
    offsetEnd: 'bottom bottom',
  });

  const rotateY = useTransform(
    scrollYProgress,
    [0.25, 0.6],
    ['0deg', '180deg'],
  );

  const handleFrontImageLoadingComplete = useCallback(() => {
    setIsFrontImageLoaded(true);
  }, []);

  const handleBackImageLoadingComplete = useCallback(() => {
    setIsBackImageLoaded(true);
  }, []);

  return (
    <motion.div
      className={clsx('relative h-full w-full transform-style-3d', {
        'opacity-0': !(isFrontImageLoaded && isBackImageLoaded),
      })}
      style={{
        rotateY,
      }}
      variants={motionVariants}
      animate="animate"
      custom={isFrontImageLoaded && isBackImageLoaded}
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
          loading="eager"
          onLoadingComplete={handleFrontImageLoadingComplete}
          imgixParams={{
            auto: ['compress', 'format'],
            q: 60,
            cs: 'strip',
          }}
        />
      </div>
      <div className="absolute h-full w-full overflow-hidden rounded-main">
        <PrismicNextImage
          className="h-full w-full object-cover -scale-x-100"
          field={backSideImage}
          loading="eager"
          onLoadingComplete={handleBackImageLoadingComplete}
        />
      </div>
    </motion.div>
  );
}
