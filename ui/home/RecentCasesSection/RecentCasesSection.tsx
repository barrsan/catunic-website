import { useCallback, useId, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { withSectionParams } from '@/lib/hocs/withSectionParams';
import { useAnimatedTextContent } from '@/lib/hooks/useAnimatedTextContent';

import { Button } from '@/ui/shared/Button';
import { CaseCard } from '@/ui/shared/CaseCard';
import { Container } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';
import { Title } from '@/ui/shared/Title';
import UnicornIcon from '@/ui/svg/UnicornIcon.svg';

import { cubicBezierEasing } from '@/constants';

import { PreviewCase } from '@/types';

const gridItemVariants = cva('', {
  variants: {
    cell: {
      0: 'md:col-span-6',
      1: 'md:col-span-5 md:col-start-8 md:mt-recent-cases-1',
      2: 'md:col-span-4 md:-mt-recent-cases-3',
      3: 'md:col-span-5 md:col-start-6 md:mt-recent-cases-2',
    },
  },
  defaultVariants: {
    cell: 0,
  },
});

const unicornMotionVariants = {
  animate: (custom: boolean) => ({
    y: custom ? '-3.8rem' : '-2.2rem',
    transition: {
      duration: 1,
      ease: cubicBezierEasing.UNICORN,
    },
  }),
  exit: {
    y: '0rem',
    transition: {
      duration: 0.5,
      ease: cubicBezierEasing.MAIN,
    },
  },
};

type GridCell = VariantProps<typeof gridItemVariants>['cell'];

type Props = BasicSectionProps<{
  title: string;
  description: string;
  cases: PreviewCase[];
}>;

function RecentCasesSection({ spacingY, title, description, cases }: Props) {
  const [isShowUnicorn, setIsShowUnicorn] = useState(false);

  const t = useTranslations('Common');

  const uniqId = useId();

  const { textContainerRef } = useAnimatedTextContent({
    defaultSelector: `[data-text-content="${uniqId}"]`,
  });

  const handleButtonHover = useCallback((isActive: boolean) => {
    setIsShowUnicorn(isActive);
  }, []);

  const renderCaseCard = (caseData: PreviewCase, index: number) => {
    if (index > 3) {
      return null;
    }

    return (
      <div
        key={caseData.id}
        className={gridItemVariants({
          cell: index as GridCell,
        })}
      >
        <CaseCard
          url={caseData.url as string}
          title={caseData.name as string}
          subtitle={caseData.overview as string}
          image={caseData.coverImage}
        />
      </div>
    );
  };

  return (
    <Section spacingY={spacingY}>
      <Container size={1}>
        <div className="mb-10 md:mb-35">
          <Title component="h2" size="big" isAnimated>
            {title}
          </Title>
        </div>
        <div className="relative w-full">
          <div className="left-[60%] top-0 mb-10 w-full md:absolute md:mb-0 md:w-[32%]">
            <div
              ref={textContainerRef}
              className="text-primary md:text-primary-lg"
              data-text-content={uniqId}
            >
              {description}
            </div>
          </div>
          <div
            className={clsx([
              'mb-0 md:mb-16',
              'grid grid-cols-1 md:grid-cols-12',
              'gap-x-0 gap-y-12 md:gap-x-main-sm md:gap-y-10',
            ])}
          >
            {cases.map(renderCaseCard)}
          </div>
        </div>
        <div className="relative mt-18 text-center md:mt-36">
          <div
            className={clsx([
              'absolute inset-0',
              'flex items-center justify-center',
              'w-full text-center',
            ])}
          >
            <motion.div
              variants={unicornMotionVariants}
              animate="animate"
              exit="exit"
              custom={isShowUnicorn}
            >
              <UnicornIcon className="h-20 w-20" />
            </motion.div>
          </div>
          <Button
            className="min-w-60 relative z-10 bg-white"
            mode="link"
            href="/work"
            hasArrowIcon
            scroll={false}
            onHover={handleButtonHover}
          >
            {t('allCases')}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(RecentCasesSection);

export { WithSectionParams as RecentCasesSection };
