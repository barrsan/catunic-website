import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { useReadySlice } from '@/lib/hooks/useReadySlice';

import { AllCases } from '@/ui/work/AllCases';

import { PreviewCase } from '@/types';

/**
 * Props for `AllCasesBlock`.
 */
export type AllCasesBlockProps = SliceComponentProps<
  Content.AllCasesBlockSlice,
  {
    cases: PreviewCase[];
  }
>;

/**
 * Component for "AllCasesBlock" Slices.
 */
function AllCasesBlock({ slice, context }: AllCasesBlockProps): JSX.Element {
  useReadySlice();

  return (
    <AllCases
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      cases={context.cases}
    />
  );
}

export default AllCasesBlock;
