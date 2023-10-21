import { RefObject, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  AnimationSequence,
  motion,
  useAnimate,
  useTransform,
} from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { Title } from '@/ui/shared/Title';
import HandWavingIcon from '@/ui/svg/HandWavingIcon.svg';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
};

export function HeroTitle({ containerRef }: Props) {
  const t = useTranslations('Common.hero');

  const [isInit, setIsInit] = useState(false);

  const [scope, animate] = useAnimate();

  const { scrollYProgress } = useScrollProxy({
    target: containerRef,
    offsetStart: 'top top',
    offsetEnd: 'bottom bottom',
  });

  useEffect(() => {
    setIsInit(true);
  }, []);

  useEffect(() => {
    const sequence: AnimationSequence = [
      [
        '.greet-left',
        {
          x: isInit ? '-0.4em' : '0em',
        },
        {
          duration: 0.3,
          ease: 'easeInOut',
        },
      ],
      [
        '.greet-right',
        {
          x: isInit ? '0.4em' : '0em',
        },
        {
          duration: 0.3,
          ease: 'easeInOut',
          at: '-0.3',
        },
      ],
      [
        '.greet-icon',
        {
          transform: isInit ? 'scale(1)' : 'scale(0)',
          opacity: isInit ? 1 : 0,
        },
        {
          duration: 0.3,
          ease: 'easeIn',
          at: '-0.2',
          opacity: {
            duration: 0.1,
          },
        },
      ],
    ];

    animate(sequence, { delay: 1 });
  }, [animate, isInit]);

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const filter = useTransform(
    scrollYProgress,
    (value) => `blur(${value * 50}px)`,
  );

  return (
    <div className="text-adaptive">
      <motion.span
        className={clsx([
          'relative h-[80em] min-h-screen-2/3 md:min-h-screen-4/5',
          'flex h-full flex-col justify-center',
        ])}
        style={{
          opacity,
          scale,
          filter,
        }}
      >
        <Title className="text-center" component="h3" size="big">
          <span
            ref={scope}
            className="flex flex-row items-center justify-center gap-x-[0.1em]"
          >
            <span className="greet-left relative left-[0.4em]">
              {t('greet.1')}
            </span>
            <span className="greet-icon h-[0.8em] w-[0.8em] opacity-0">
              <HandWavingIcon
                className={clsx([
                  'h-[0.7em] w-[0.7em]',
                  'origin-bottom-right animate-waving-hand-loop',
                ])}
              />
            </span>
            <span className="greet-right relative right-[0.4em]">
              {t('greet.2')}
            </span>
          </span>
        </Title>
        <Title className="text-center" component="h1" size="hero">
          <span>
            <span className="text-title-2 font-normal">
              {t('title.1')}&nbsp;
            </span>
            {t('title.2')}
          </span>
        </Title>
      </motion.span>
    </div>
  );
}
