import { withSectionParams } from '@/lib/hocs/withSectionParams';

import { Container } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';

import { MarqueeItem } from '@/types';

import { MarqueeLoop } from './MarqueeLoop';

type Props = BasicSectionProps<{
  items: MarqueeItem[];
  speedMain: number;
  startOffsetMain: number;
  speedSecondary?: number;
  startOffsetSecondary?: number;
  isDouble?: boolean;
}>;

function MarqueeSection({
  spacingY,
  items,
  speedMain,
  startOffsetMain,
  speedSecondary = 7,
  startOffsetSecondary = 0,
  isDouble = false,
}: Props) {
  return (
    <Section spacingY={spacingY}>
      <Container className="bg-ds-grey-900 py-16 md:py-30" size={0}>
        <div className="mb-4 w-full last:mb-0">
          <MarqueeLoop
            loopIndex={0}
            items={items}
            speed={speedMain}
            startOffset={startOffsetMain}
          />
        </div>
        {isDouble && (
          <div className="w-full">
            <MarqueeLoop
              loopIndex={1}
              items={items}
              speed={speedSecondary}
              startOffset={startOffsetSecondary}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}

const MarqueeWithSectionParams = withSectionParams<Props>(MarqueeSection);

export { MarqueeWithSectionParams as MarqueeSection };
