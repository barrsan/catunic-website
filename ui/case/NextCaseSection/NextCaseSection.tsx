import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useDetectMobileDevice } from '@/lib/hooks/useDetectMobileDevice';

import { Button } from '@/ui/shared/Button';
import { CommonImage } from '@/ui/shared/CommonImage';
import { Container } from '@/ui/shared/Container';
import { Section } from '@/ui/shared/Section';
import { Title } from '@/ui/shared/Title';

import { SPRING_TRANSITION } from '@/constants';

import { NextCase } from '@/types';

type Props = NextCase;

const previewMotionVariants = {
  animate: (custom: boolean) => ({
    clipPath: custom ? 'circle(50% at center)' : 'circle(30% at center)',
    transition: SPRING_TRANSITION,
  }),
};

export function NextCaseSection({ name, coverImage, url }: Props) {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const t = useTranslations('Common');

  const nextCaseRef = useRef(null);

  const isInView = useInView(nextCaseRef, { amount: 0.5 });

  const isMobileDevice = useDetectMobileDevice();

  const handleMouseEnter = () => {
    if (!isMobileDevice) {
      setIsPreviewActive(true);
    }
  };
  const handleMouseLeave = () => {
    if (!isMobileDevice) {
      setIsPreviewActive(false);
    }
  };

  useEffect(() => {
    if (isMobileDevice) {
      setIsPreviewActive(isInView);
    }
  }, [isInView, isMobileDevice]);

  return (
    <Section spacingY={3}>
      <Container className="flex flex-col items-center justify-center" size={3}>
        <Title className="mb-12" component="div" size={6} fontWeight={500}>
          {t('nextCase')}
        </Title>
        <Link
          className="block w-full"
          href={url}
          scroll={false}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={nextCaseRef}
            data-mf={t('mouseFollower.view')}
            className="relative mb-12 flex w-full flex-col items-center"
          >
            <motion.div
              className="aspect-square w-full max-w-md"
              variants={previewMotionVariants}
              animate="animate"
              custom={isPreviewActive}
            >
              <div
                className={clsx([
                  'aspect-square w-full max-w-md',
                  'transition-transform duration-300',
                  isPreviewActive && 'scale-105',
                ])}
              >
                <CommonImage
                  className="object-center"
                  imageData={coverImage}
                  mode="square"
                  isFill
                  hasParallax={false}
                />
              </div>
            </motion.div>
            <div
              className={clsx([
                'absolute inset-0',
                'flex items-center justify-center',
                'w-full text-center mix-blend-difference',
              ])}
            >
              <Title component="h6" isDark size={2}>
                {name}
              </Title>
            </div>
          </div>
        </Link>
        <Button
          className="relative z-10 bg-white"
          mode="link"
          href="/work"
          hasArrowIcon
          scroll={false}
        >
          {t('allCases')}
        </Button>
      </Container>
    </Section>
  );
}
