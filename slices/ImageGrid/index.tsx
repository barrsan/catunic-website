import { useMemo } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { v4 as uuidv4 } from 'uuid';

import {
  GridImage,
  GridSize,
  ImageGridSection,
} from '@/ui/shared/ImageGridSection';

/**
 * Props for `ImageGridBlock`.
 */
export type ImageGridBlockProps =
  SliceComponentProps<Content.ImageGridBlockSlice>;

/**
 * Component for "ImageGridBlock" Slices.
 */
function ImageGridBlock({ slice }: ImageGridBlockProps): JSX.Element {
  const itemsWithId = useMemo<GridImage[]>(
    () =>
      slice.items.map((item) => ({
        id: uuidv4(),
        ...item,
      })),
    [slice.items],
  );

  const size = parseInt(slice.primary.size || 1, 10) as GridSize;

  return (
    <ImageGridSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      size={size}
      images={itemsWithId}
    />
  );
}

export default ImageGridBlock;
