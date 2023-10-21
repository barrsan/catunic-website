import { withSectionParams } from '@/lib/hocs/withSectionParams';

import { Container } from '@/ui/shared/Container';
import { ImageContainer } from '@/ui/shared/ImageContainer';
import { BasicSectionProps, Section } from '@/ui/shared/Section';

import { ImageContainerData } from '@/types';

type Props = BasicSectionProps & ImageContainerData;

function SingleImageSection({
  spacingY,
  displayMode,
  caption,
  image,
  parallaxMode = true,
}: Props) {
  return (
    <Section spacingY={spacingY}>
      <Container size={displayMode === 'cover' ? 0 : 2}>
        <ImageContainer
          imageData={image}
          displayMode={displayMode}
          caption={caption}
          hasParallax={parallaxMode}
        />
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(SingleImageSection);

export { WithSectionParams as SingleImageSection };
