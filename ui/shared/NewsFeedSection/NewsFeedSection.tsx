import { useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useTransform } from 'framer-motion';
import { useEventListener } from 'usehooks-ts';

import { withSectionParams } from '@/lib/hocs/withSectionParams';
import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { Container, ContainerSize } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';
import { Title } from '@/ui/shared/Title';

import { NewsFeedPost } from '@/types/newsFeed';

import { NewsFeedCard } from './NewsFeedCard';
import { NewsFeedControls } from './NewsFeedControls';

type Props = BasicSectionProps<{
  title: string;
  data: NewsFeedPost[];
  containerSize?: ContainerSize;
}>;

function NewsFeedSection({ spacingY, containerSize = 1, title, data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: true,
    dragFree: true,
  });

  const { scrollYProgress } = useScrollProxy({
    target: sectionRef,
    offsetStart: 'top bottom',
    offsetEnd: 'bottom top',
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  useEventListener('resize', () => {
    emblaApi?.reInit();
  });

  const handlePrevClick = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const handleNextClick = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const renderNewsPost = (newsPost: NewsFeedPost) => (
    <div
      key={newsPost.id}
      className="shrink-0 grow-0 basis-[20em] px-4 lg:basis-[26em]"
    >
      <NewsFeedCard {...newsPost} />
    </div>
  );

  return (
    <Section ref={sectionRef} spacingY={spacingY}>
      <Container size={containerSize}>
        {title && (
          <div className="mb-10 md:mb-35">
            <Title component="h2" size="big" isAnimated>
              {title}
            </Title>
          </div>
        )}
      </Container>
      <Container className="my-0 overflow-x-hidden py-0 text-base" size={0}>
        <motion.div className="w-[130%]" style={{ x }}>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex text-base">{data.map(renderNewsPost)}</div>
          </div>
        </motion.div>
        <Container
          className="mt-15 flex flex-row justify-center md:justify-end"
          size={1}
        >
          <NewsFeedControls
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
        </Container>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(NewsFeedSection);

export { WithSectionParams as NewsFeedSection };
