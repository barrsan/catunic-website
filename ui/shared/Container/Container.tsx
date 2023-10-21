import { PropsWithChildren } from 'react';
import { cva } from 'class-variance-authority';

const containerVariants = cva(['w-full'], {
  variants: {
    size: {
      0: 'px-0',
      1: 'lg:px-container-1',
      2: 'lg:px-container-2',
      3: 'lg:px-container-3',
    },
  },
  compoundVariants: [
    {
      size: [1, 2, 3],
      class: 'mx-auto max-w-[100em] px-container-4',
    },
  ],
  defaultVariants: {
    size: 0,
  },
});

export type ContainerSize = 0 | 1 | 2 | 3;

type Props = PropsWithChildren<{
  className?: string;
  size: 0 | 1 | 2 | 3;
}>;

export function Container({ size, className = '', children }: Props) {
  return (
    <div className={containerVariants({ className, size })}>{children}</div>
  );
}
