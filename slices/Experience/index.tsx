import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { ExperienceSection } from '@/ui/about/ExperienceSection';

/**
 * Props for `ExperienceBlock`.
 */
export type ExperienceBlockProps =
  SliceComponentProps<Content.ExperienceBlockSlice>;

/**
 * Component for "ExperienceBlock" Slices.
 */
function ExperienceBlock({ slice }: ExperienceBlockProps): JSX.Element {
  return (
    <ExperienceSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      title={slice.primary.title as string}
      projects={slice.items}
    />
  );
}

export default ExperienceBlock;
