import { useMemo } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { getRelatedDocument } from '@/lib/prismicio/getRelatedDocument';

import { RecentCasesSection } from '@/ui/home/RecentCasesSection';

import { PageCaseData, PreviewCase } from '@/types';

/**
 * Props for `RecentCasesBlock`.
 */
export type RecentCasesBlockProps =
  SliceComponentProps<Content.RecentCasesBlockSlice>;

/**
 * Component for "RecentCasesBlock" Slices.
 */
function RecentCasesBlock({ slice }: RecentCasesBlockProps): JSX.Element {
  const cases = useMemo<PreviewCase[]>(
    () =>
      slice.items.map((item) => {
        const caseDocument = getRelatedDocument<PageCaseData, 'case'>(
          item.case,
        );

        const caseData = caseDocument?.data as PageCaseData;

        return {
          id: caseDocument?.id as string,
          url: caseDocument?.url ?? '#',
          name: caseData.name,
          overview: caseData.overview,
          coverImage: caseData.coverImage,
        };
      }),
    [slice.items],
  );

  return (
    <RecentCasesSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      title={slice.primary.title as string}
      description={slice.primary.description as string}
      cases={cases}
    />
  );
}

export default RecentCasesBlock;
