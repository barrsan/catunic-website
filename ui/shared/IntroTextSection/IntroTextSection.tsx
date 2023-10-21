import { PrismicRichText } from '@prismicio/react';

import { withSectionParams } from '@/lib/hocs/withSectionParams';

import { Container } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';
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
          <div className={isLargeText ? 'prose-lg' : 'prose'}>
            <PrismicRichText field={text} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(IntroTextSection);

export { WithSectionParams as IntroTextSection };
