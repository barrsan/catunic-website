import { useMemo } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { v4 as uuidv4 } from 'uuid';

import { getRelatedDocument } from '@/lib/prismicio/getRelatedDocument';

import {
  WorksGallery,
  WorksGalleryGridItem,
  WorksGallerySection,
} from '@/ui/shared/WorksGallerySection';

/**
 * Props for `WorksGalleryBlock`.
 */
export type WorksGalleryBlockProps =
  SliceComponentProps<Content.WorksGalleryBlockSlice>;

/**
 * Component for "WorksGalleryBlock" Slices.
 */
function WorksGalleryBlock({ slice }: WorksGalleryBlockProps): JSX.Element {
  const { gallery } = slice.primary;

  const shots = useMemo<WorksGalleryGridItem[]>(() => {
    const galleryDocument = getRelatedDocument<WorksGallery, 'worksGallery'>(
      gallery,
    );

    if (!galleryDocument?.data?.images) {
      return [];
    }

    return galleryDocument.data.images.map((image) => ({
      id: uuidv4(),
      ...image,
    }));
  }, [gallery]);

  return <WorksGallerySection shots={shots} />;
}

export default WorksGalleryBlock;
