import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { IntroTextSection } from '@/ui/shared/IntroTextSection';
import { TitleSize } from '@/ui/shared/Title';

/**
 * Props for `IntroTextBlock`.
 */
export type IntroTextBlockProps =
  SliceComponentProps<Content.IntroTextBlockSlice>;

/**
 * Component for "IntroTextBlock" Slices.
 */
function IntroTextBlock({ slice }: IntroTextBlockProps): JSX.Element {
  return (
    <IntroTextSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      title={slice.primary.title}
      titleSize={slice.primary.titleSize as TitleSize}
      text={slice.primary.text}
      isLargeText={slice.primary.largeText as boolean}
    />
  );
}

export default IntroTextBlock;
