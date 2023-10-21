import { ReactNode } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { withSectionParams } from '@/lib/hocs/withSectionParams';

import { Container } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';

import { RichTextData } from '@/types';

import { BasicTextHeading } from './BasicTextHeading';

const contentPosition = cva('col-span-4', {
  variants: {
    position: {
      left: 'col-start-1',
      right: 'col-start-3',
      center: 'col-start-2',
    },
  },
  defaultVariants: {
    position: 'left',
  },
});

type Props = BasicSectionProps<{
  isLargeText: boolean;
  text: RichTextData;
  isAnimatedHeadings?: boolean;
}> &
  VariantProps<typeof contentPosition>;

const createDefaultComponents = (isAnimated: boolean) => ({
  heading1: ({ children }: { children: ReactNode }) => (
    <BasicTextHeading component="h1" isAnimated={isAnimated}>
      {children}
    </BasicTextHeading>
  ),
  heading2: ({ children }: { children: ReactNode }) => (
    <BasicTextHeading component="h3" isAnimated={isAnimated}>
      {children}
    </BasicTextHeading>
  ),
  heading3: ({ children }: { children: ReactNode }) => (
    <BasicTextHeading component="h3" isAnimated={isAnimated}>
      {children}
    </BasicTextHeading>
  ),
});

function BasicTextSection({
  spacingY,
  position,
  text,
  isLargeText,
  isAnimatedHeadings = true,
}: Props) {
  return (
    <Section spacingY={spacingY}>
      <Container size={2}>
        <div className="grid-cols-6 md:grid">
          <div
            className={contentPosition({
              className: clsx([
                'mx-auto',
                isLargeText ? 'prose-lg' : 'prose',
                position === 'center' && 'text-center',
              ]),
              position,
            })}
          >
            <PrismicRichText
              field={text}
              components={createDefaultComponents(isAnimatedHeadings)}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(BasicTextSection);

export { WithSectionParams as BasicTextSection };
