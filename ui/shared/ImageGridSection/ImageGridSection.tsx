import clsx from 'clsx';

import { splitIntoColumns } from '@/lib/dataProcessing/splitIntoColumns';
import { withSectionParams } from '@/lib/hocs/withSectionParams';

import { Container } from '@/ui/shared//Container';
import { ImageContainer } from '@/ui/shared/ImageContainer';
import { BasicSectionProps, Section } from '@/ui/shared/Section';

import { ImageContainerData, ItemWithId } from '@/types';

export type GridImage = ItemWithId<ImageContainerData>;

export type GridSize = 1 | 2;

type Props = BasicSectionProps<{
  size?: GridSize;
  images: GridImage[];
}>;

function ImageGridSection({ spacingY, size = 2, images }: Props) {
  const imageColumns = splitIntoColumns<GridImage>(images, 2);

  const renderGridItem = (imageData: GridImage, col: 0 | 1) => (
    <div
      className={clsx('mb-10 md:mb-24', {
        'md:last:mb-0': col === 0,
        'last:mb-0': col === 1,
      })}
      key={imageData.id}
    >
      <ImageContainer
        imageData={imageData.image}
        caption={imageData.caption}
        captionAlign={imageData.captionAlign}
        displayMode={imageData.displayMode}
        hasParallax={imageData.parallaxMode}
      />
    </div>
  );

  return (
    <Section spacingY={spacingY}>
      <Container size={size}>
        <div className="grid-cols-2 gap-main md:grid">
          <div className="col-span-1 col-start-1">
            {imageColumns[0].map((imageData) => renderGridItem(imageData, 0))}
          </div>
          <div className="col-span-1 col-start-2 md:pt-30">
            {imageColumns[1].map((imageData) => renderGridItem(imageData, 1))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(ImageGridSection);

export { WithSectionParams as ImageGridSection };
