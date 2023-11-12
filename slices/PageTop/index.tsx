import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { useReadySlice } from '@/lib/hooks/useReadySlice';

import { PageTopSection } from '@/ui/shared/PageTopSection';

/**
 * Props for `PageTopBlock`.
 */
export type PageTopBlockProps = SliceComponentProps<Content.PageTopBlockSlice>;

/**
 * Component for "PageTopBlock" Slices.
 */
function PageTopBlock({ slice }: PageTopBlockProps): JSX.Element {
  useReadySlice();

  return (
    <PageTopSection
      title={slice.primary.title as string}
      subtitle={slice.primary.subtitle as string}
      iconType={slice.primary.icon}
    />
  );
}

export default PageTopBlock;
