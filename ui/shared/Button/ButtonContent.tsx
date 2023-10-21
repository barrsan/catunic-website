import { memo, PropsWithChildren, useEffect } from 'react';
import clsx from 'clsx';
import { AnimationSequence, useAnimate } from 'framer-motion';
import { useIsFirstRender } from 'usehooks-ts';

import ArrowRightIcon from '@/ui/svg/ArrowRightIcon.svg';

import { ButtonBackdrop } from './ButtonBackdrop';

type Props = PropsWithChildren<{
  hasHover: boolean;
  hasArrowIcon: boolean;
  isSquare: boolean;
}>;

const MAIN_COLOR = '#1C1D20';
const HIGHLIGHT_COLOR = '#ffffff';

function ButtonContent({ hasHover, hasArrowIcon, isSquare, children }: Props) {
  const [animationScope, animate] = useAnimate();
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    const sequence: AnimationSequence = [
      [
        animationScope.current,
        {
          color: hasHover ? HIGHLIGHT_COLOR : MAIN_COLOR,
        },
        { duration: 0.2 },
      ],
      [
        '.button-content svg',
        {
          fill: hasHover ? HIGHLIGHT_COLOR : MAIN_COLOR,
        },
        { duration: 0.2 },
      ],
      [
        'svg.arrow-icon',
        {
          fill: hasHover ? HIGHLIGHT_COLOR : MAIN_COLOR,
        },
        {
          duration: 0.2,
        },
      ],
      [
        'svg.arrow-icon',
        {
          x: hasHover ? '100%' : '-100%',
        },
        {
          duration: 0.2,
          at: '-0.5',
        },
      ],
      [
        'svg.arrow-icon',
        {
          x: hasHover ? '-100%' : '100%',
        },
        {
          duration: 0,
        },
      ],
      [
        'svg.arrow-icon',
        {
          x: 0,
        },
        {
          duration: 0.2,
        },
      ],
    ];

    animate(sequence);
  }, [animate, hasHover, isFirstRender, animationScope]);

  return (
    <>
      <span
        ref={animationScope}
        className={clsx([
          'relative z-10',
          'flex flex-row items-center justify-center gap-4',
          'text-base text-ds-grey-900 sm:text-base-lg',
        ])}
      >
        <span className="button-content">{children}</span>
        {hasArrowIcon && (
          <span className="relative z-10 block aspect-square w-7 overflow-hidden">
            <ArrowRightIcon className="arrow-icon h-full w-full fill-ds-grey-900" />
          </span>
        )}
      </span>
      <ButtonBackdrop isSquare={isSquare} isShow={hasHover} />
    </>
  );
}

const MemoizedButtonContent = memo(ButtonContent);

export { MemoizedButtonContent as ButtonContent };
