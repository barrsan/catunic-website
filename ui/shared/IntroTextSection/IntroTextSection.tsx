import { useId } from 'react';
import { PrismicRichText } from '@prismicio/react';

import { withSectionParams } from '@/lib/hocs/withSectionParams';
import { useAnimatedTextContent } from '@/lib/hooks/useAnimatedTextContent';

import { Container } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';
import { TextContent } from '@/ui/shared/TextContent';
import { Title, TitleSize } from '@/ui/shared/Title';

import { RichTextData } from '@/types';

type Props = BasicSectionProps<{
  title: RichTextData;
  text: RichTextData;
  titleSize: TitleSize;
  isLargeText: boolean;
}>;

function IntroTextSection({
  spacingY,
  title,
  titleSize,
  text,
  isLargeText,
}: Props) {
  const uniqId = useId();
  const { textContainerRef } = useAnimatedTextContent({
    dataSelector: `[data-text-content="${uniqId}"]`,
  });

  return (
    <Section spacingY={spacingY}>
      <Container
        className="grid-cols-1 gap-x-main md:grid md:grid-cols-6"
        size={2}
      >
        <div className="col-span-2 col-start-1">
          <Title className="mb-10" component="div" size={titleSize} isAnimated>
            <PrismicRichText field={title} />
          </Title>
        </div>
        <div className="col-span-4 col-start-3">
          <div
            ref={textContainerRef}
            className={isLargeText ? 'prose-lg' : 'prose'}
            data-text-content={uniqId}
          >
            <TextContent text={text} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(IntroTextSection);

export { WithSectionParams as IntroTextSection };
