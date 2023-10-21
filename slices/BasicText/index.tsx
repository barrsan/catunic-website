import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { BasicTextSection } from '@/ui/shared/BasicTextSection';

/**
 * Props for `BasicTextBlock`.
 */
export type BasicTextBlockProps =
  SliceComponentProps<Content.BasicTextBlockSlice>;

/**
 * Component for "BasicTextBlock" Slices.
 */
function BasicTextBlock({ slice }: BasicTextBlockProps): JSX.Element {
  return (
    <BasicTextSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      text={slice.primary.text}
      position={slice.primary.position}
      isLargeText={slice.primary.largeText as boolean}
      isAnimatedHeadings={slice.primary.animateHeadings as boolean}
    />
  );
}

export default BasicTextBlock;
