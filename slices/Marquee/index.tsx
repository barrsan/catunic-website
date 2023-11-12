import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { createMarqueeList } from '@/lib/dataProcessing/createMarqueeList';
import { useReadySlice } from '@/lib/hooks/useReadySlice';

import { MarqueeSection } from '@/ui/shared/MarqueeSection';

/**
 * Props for `MarqueeBlock`.
 */
export type MarqueeBlockProps = SliceComponentProps<Content.MarqueeBlockSlice>;

/**
 * Component for "MarqueeBlock" Slices.
 */
function MarqueeBlock({ slice }: MarqueeBlockProps): JSX.Element {
  useReadySlice();

  const items = createMarqueeList(slice.items);

  return (
    <MarqueeSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      items={items}
      isDouble={slice.primary.doubleMarquee}
      speedMain={slice.primary.speedMain ?? 7}
      speedSecondary={slice.primary.speedSecondary ?? 7}
      startOffsetMain={slice.primary.startOffsetMain ?? 0}
      startOffsetSecondary={slice.primary.startOffsetSecondary ?? 0}
    />
  );
}

export default MarqueeBlock;
