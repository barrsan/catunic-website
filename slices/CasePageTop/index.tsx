import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { useReadySlice } from '@/lib/hooks/useReadySlice';

import { CasePageTopSection } from '@/ui/case/CasePageTopSection';

/**
 * Props for `CasePageTopBlock`.
 */
export type CasePageTopBlockProps =
  SliceComponentProps<Content.CasePageTopBlockSlice>;

/**
 * Component for "CasePageTopBlock" Slices.
 */
function CasePageTopBlock({ slice }: CasePageTopBlockProps): JSX.Element {
  useReadySlice();

  return (
    <CasePageTopSection
      title={slice.primary.title as string}
      subtitle={slice.primary.subtitle as string}
    />
  );
}

export default CasePageTopBlock;
