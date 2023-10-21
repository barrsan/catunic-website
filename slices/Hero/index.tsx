import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { HeroSection } from '@/ui/home/HeroSection';

/**
 * Props for `HeroBlock`.
 */
export type HeroBlockProps = SliceComponentProps<Content.HeroBlockSlice>;

/**
 * Component for "HeroBlock" Slices.
 */
function HeroBlock({ slice }: HeroBlockProps): JSX.Element {
  return (
    <HeroSection
      frontSideImage={slice.primary.frontSideImage}
      backSideImage={slice.primary.backSideImage}
    />
  );
}

export default HeroBlock;
