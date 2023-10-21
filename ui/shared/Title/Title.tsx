import { PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useAnimatedShowing } from '@/lib/hooks/useAnimatedShowing';

const titleVariants = cva('', {
  variants: {
    size: {
      1: 'text-title-1',
      2: 'text-title-2',
      3: 'text-title-3',
      4: 'text-title-4',
      5: 'text-title-5',
      6: 'text-title-6',
      big: 'text-title-big',
      hero: 'text-title-hero',
    },
    fontWeight: {
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
      800: 'font-extrabold',
    },
    whitespace: {
      nowrap: 'whitespace-nowrap',
      preLine: 'whitespace-pre-line',
    },
  },
  defaultVariants: {
    size: 2,
    fontWeight: 700,
    whitespace: 'preLine',
  },
});

type Props = PropsWithChildren<
  {
    className?: string;
    isDark?: boolean;
    isAnimated?: boolean;
    component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  } & VariantProps<typeof titleVariants>
>;

export type TitleSize = Props['size'];

export function Title({
  className = '',
  component = 'h2',
  size,
  fontWeight,
  whitespace,
  isDark = false,
  isAnimated = false,
  children,
}: Props) {
  const { animationScope } = useAnimatedShowing(isAnimated);

  const TitleTag = component;

  const textColorClassName = twMerge(
    isDark ? 'text-white' : 'text-ds-grey-900',
    className,
  );

  return (
    <div ref={animationScope}>
      <TitleTag
        className={clsx([
          titleVariants({ size, fontWeight, whitespace }),
          textColorClassName,
        ])}
      >
        {children}
      </TitleTag>
    </div>
  );
}
