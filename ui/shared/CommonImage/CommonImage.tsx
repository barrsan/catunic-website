import { useCallback, useEffect, useRef, useState } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { motion, useTransform } from 'framer-motion';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { ImageData } from '@/types';

const imageContainerVariants = cva(['relative w-full overflow-hidden'], {
  variants: {
    mode: {
      cover: 'aspect-square md:aspect-video',
      square: 'aspect-square rounded-main',
      auto: 'aspect-auto rounded-main',
    },
  },
  defaultVariants: {
    mode: 'auto',
  },
});

const imageVariants = cva(['scale-105'], {
  variants: {
    mode: {
      cover: 'absolute inset-0 h-full object-cover',
      square: 'absolute left-0 top-0 rounded-main object-cover',
      auto: 'relative rounded-main',
    },
  },
  defaultVariants: {
    mode: 'auto',
  },
});

const imageContainerMotionVariants = {
  initial: {
    opacity: 0,
    scale: 1,
  },
  animate: (custom: boolean) => ({
    opacity: custom ? 1 : 0,
    scale: custom ? 1 : 1.2,
    transition: {
      duration: 0.6,
    },
  }),
};

export type CommonImageMode = VariantProps<
  typeof imageContainerVariants
>['mode'];

type Props = {
  className?: ClassValue;
  imageData: ImageData;
  hasParallax?: boolean;
  isFill?: boolean;
  isLazy?: boolean;
} & VariantProps<typeof imageContainerVariants>;

export function CommonImage({
  className,
  imageData,
  mode,
  hasParallax = true,
  isFill = false,
  isLazy = true,
}: Props) {
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScrollProxy({
    target: imageContainerRef,
    offsetStart: 'top bottom',
    offsetEnd: 'bottom top',
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const handleOnLoad = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInit(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isVisible && isInit) {
      setIsAnimated(true);
    }
  }, [isVisible, isInit]);

  return (
    <div
      ref={imageContainerRef}
      className={imageContainerVariants({ className: 'bg-ds-grey-200', mode })}
    >
      <motion.div
        className="relative h-full w-full"
        style={{
          y: hasParallax ? y : 0,
        }}
        variants={imageContainerMotionVariants}
        custom={isAnimated}
        initial="initial"
        animate="animate"
      >
        <PrismicNextImage
          className={imageVariants({
            className,
            mode,
          })}
          field={imageData}
          fill={mode === 'cover' || isFill}
          fallbackAlt=""
          loading={isLazy ? 'lazy' : 'eager'}
          imgixParams={{
            auto: ['format'],
          }}
          onLoad={handleOnLoad}
        />
      </motion.div>
    </div>
  );
}
