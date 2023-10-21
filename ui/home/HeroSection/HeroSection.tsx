import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { usePageTransition } from '@/store/pageTransition';

import { useDetectMobileDevice } from '@/lib/hooks/useDetectMobileDevice';

import { Section } from '@/ui/shared/Section';

import { ImageData } from '@/types';

import { HeroCard } from './HeroCard';
import { HeroTagline } from './HeroTagline';
import { HeroTitle } from './HeroTitle';

type Props = {
  frontSideImage: ImageData;
  backSideImage: ImageData;
};

export function HeroSection({ frontSideImage, backSideImage }: Props) {
  const [isFirstOpenedPage, setIsFirstOpenedPage] = useState(false);
  const [isOverlayHidden, setIsOverlayHidden] = useState(false);

  const cardContainerRef = useRef(null);

  const { isPageTransition, outboundPageKey } = usePageTransition();
  const isMobile = useDetectMobileDevice();
  const t = useTranslations('Common.hero');

  useEffect(() => {
    if (!outboundPageKey) {
      setIsFirstOpenedPage(true);
    }
  }, [outboundPageKey]);

  const handleOverlayExitComplete = () => {
    setIsOverlayHidden(true);
  };

  const isShowOverlay =
    isMobile && isPageTransition && !isOverlayHidden && !isFirstOpenedPage;

  return (
    <Section spacingY={0} className="relative text-adaptive">
      <AnimatePresence onExitComplete={handleOverlayExitComplete}>
        {isShowOverlay && (
          <motion.div
            className="fixed inset-0 z-30 h-full w-full bg-white"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.3,
                delay: 0.2,
              },
            }}
          />
        )}
      </AnimatePresence>
      <div className="h-screen-y-1/25" />
      <div
        ref={cardContainerRef}
        className={clsx([
          'grid',
          'grid-flow-row',
          'grid-cols-hero md:grid-cols-hero-lg',
        ])}
      >
        <div
          className={clsx([
            'sticky',
            'top-20',
            'col-span-4 col-start-1 row-span-1 row-start-1',
            'justify-self-center',
          ])}
        >
          <HeroTitle containerRef={cardContainerRef} />
        </div>
        <div
          className={clsx([
            'sticky',
            'top-20 z-10 xl:top-screen-y-1/10',
            'col-span-4 col-start-2 col-end-3 row-span-1 row-start-2 justify-self-center',
            'max-h-314.5 max-w-280',
            'md:h-[74em] md:w-[54em]',
            'h-[140em] w-[120em]',
            'perspective-[125rem] backface-hidden perspective-origin-center',
            'origin-center',
          ])}
        >
          <HeroCard
            containerRef={cardContainerRef}
            frontSideImage={frontSideImage}
            backSideImage={backSideImage}
          />
        </div>
        <div
          className={clsx([
            'h-screen-2x',
            'col-span-4 col-start-1 row-span-1 row-start-3',
          ])}
        />
        <div
          className={clsx([
            'relative z-20',
            'col-span-4 col-start-1 row-span-1 row-start-4',
            'mix-blend-difference',
          ])}
        >
          <HeroTagline text={t.rich('tagline.pain')} />
        </div>
        <div
          className={clsx([
            'relative z-20',
            'col-span-4 col-start-1 row-span-1 row-start-5',
            'mix-blend-difference',
          ])}
        >
          <HeroTagline text={t.rich('tagline.cure')} />
        </div>
      </div>
      <div className="h-24" />
    </Section>
  );
}
