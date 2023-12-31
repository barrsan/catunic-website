import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { useReadySlice } from '@/lib/hooks/useReadySlice';

import { SingleImageSection } from '@/ui/shared/SingleImageSection';

/**
 * Props for `SingleImageBlock`.
 */
export type SingleImageBlockProps =
  SliceComponentProps<Content.SingleImageBlockSlice>;

/**
 * Component for "SingleImageBlock" Slices.
 */
function SingleImageBlock({ slice }: SingleImageBlockProps): JSX.Element {
  useReadySlice();

  return (
    <SingleImageSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      image={slice.primary.image}
      displayMode={slice.primary.displayMode}
      caption={slice.primary.caption}
    />
  );
}

export default SingleImageBlock;
