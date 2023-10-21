import { memo, useRef } from 'react';
import clsx from 'clsx';

import { splitIntoColumns } from '@/lib/dataProcessing/splitIntoColumns';

import { Container } from '@/ui/shared/Container';
import { Section } from '@/ui/shared/Section';

import {
  WorksGalleryColumn,
  WorksGalleryGridItem,
  WorksGalleryItem,
} from './WorksGalleryColumn';

export type WorksGallery = {
  images: WorksGalleryItem[];
};

type Props = {
  shots: WorksGalleryGridItem[];
};

function WorksGallerySection({ shots }: Props) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const columns = splitIntoColumns<WorksGalleryGridItem>(shots, 3);

  return (
    <Section>
      <Container size={0}>
        <div
          ref={galleryRef}
          className={clsx([
            'relative',
            'h-screen w-full md:h-[176vh]',
            'overflow-hidden bg-ds-grey-900',
          ])}
        >
          <div className="relative -top-[12vh] h-[124vh] w-full md:h-screen-2x">
            <div
              className={clsx([
                'h-full w-full',
                'flex flex-row flex-nowrap justify-center',
              ])}
            >
              {columns.map((column, index) => (
                <WorksGalleryColumn
                  key={column[0].id}
                  galleryRef={galleryRef}
                  items={column}
                  columnIndex={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const MemoizedWorksGallerySection = memo(WorksGallerySection);

export { MemoizedWorksGallerySection as WorksGallerySection };
