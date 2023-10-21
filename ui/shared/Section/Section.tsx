import { CSSProperties, forwardRef, PropsWithChildren, Ref } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

const sectionVariants = cva('whitespace-pre-line', {
  variants: {
    paddingTop: {
      0: 'pt-0',
      1: 'pt-8 md:pt-15',
      2: 'pt-16 md:pt-30',
      3: 'pt-32 md:pt-60',
    },
    paddingBottom: {
      0: 'pb-0',
      1: 'pb-8 md:pb-15',
      2: 'pb-16 md:pb-30',
      3: 'pb-32 md:pb-60',
    },
  },
  defaultVariants: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export type PaddingValue = 0 | 1 | 2 | 3;

export type SectionPadding =
  | PaddingValue
  | [PaddingValue, PaddingValue]
  | [PaddingValue];

export type BasicSectionProps<P = {}> = P & {
  spacingY?: SectionPadding;
};

type Props = BasicSectionProps<
  PropsWithChildren<{
    className?: string;
    style?: CSSProperties;
  }>
>;

function Section(
  { className = '', spacingY = [0, 0], style = {}, children }: Props,
  ref: Ref<HTMLElement>,
) {
  let top: PaddingValue = 0;
  let bottom: PaddingValue = 0;

  if (Array.isArray(spacingY)) {
    [top] = spacingY;
    bottom = spacingY[1] ?? top;
  } else {
    top = spacingY;
    bottom = spacingY;
  }

  const topClassName = sectionVariants({ paddingTop: top });
  const bottomClassName = sectionVariants({ paddingBottom: bottom ?? top });

  return (
    <section
      ref={ref}
      className={clsx([className, topClassName, bottomClassName])}
      style={style}
    >
      {children}
    </section>
  );
}

const SectionWithRef = forwardRef<HTMLElement, Props>(Section);

export { SectionWithRef as Section };
