import { RefObject } from 'react';
import { PrismicNextImage } from '@prismicio/next';
import clsx from 'clsx';
import { motion, useTransform } from 'framer-motion';

import { useDetectMobileDevice } from '@/lib/hooks/useDetectMobileDevice';
import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { ImageData, ItemWithId } from '@/types';

export type WorksGalleryItem = {
  image: ImageData;
};

export type WorksGalleryGridItem = ItemWithId<WorksGalleryItem>;

type Props = {
  items: WorksGalleryGridItem[];
  galleryRef: RefObject<HTMLDivElement>;
  columnIndex: number;
};

const getPoints = (index: number, isMobile: boolean) => {
  const points = [
    ['-5%', '10%'],
    ['-78%', '81%'],
    ['-10%', '20%'],
  ];

  const pointsMobile = [
    ['-5%', '10%'],
    ['-18%', '24%'],
    ['-10%', '20%'],
  ];

  return isMobile ? pointsMobile[index] : points[index];
};

export function WorksGalleryColumn({ galleryRef, items, columnIndex }: Props) {
  const { scrollYProgress } = useScrollProxy({
    target: galleryRef,
    offsetStart: 'top bottom',
    offsetEnd: 'bottom top',
  });

  const isMobile = useDetectMobileDevice();

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    getPoints(columnIndex, isMobile),
  );

  return (
    <motion.aside
      style={{ y }}
      className={clsx([
        'mx-4 h-full w-[44.5vw]',
        'shrink-0 grow-0 basis-[48.5vw]',
      ])}
    >
      <div className="flex h-full w-full flex-col justify-start">
        {items.map((shot) => (
          <div
            key={shot.id}
            className="my-4 h-1/4 w-full overflow-hidden rounded-main"
          >
            <PrismicNextImage
              className="h-full w-full object-cover"
              field={shot.image}
              loading="eager"
              imgixParams={{
                auto: ['compress', 'format'],
                q: 60,
                cs: 'strip',
              }}
            />
          </div>
        ))}
      </div>
    </motion.aside>
  );
}
