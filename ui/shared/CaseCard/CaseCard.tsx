import { memo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ImageContainer } from '@/ui/shared/ImageContainer';
import { Title } from '@/ui/shared/Title';

import { SPRING_TRANSITION } from '@/constants';

import { ImageData } from '@/types';

type Props = {
  title: string;
  subtitle: string;
  image: ImageData;
  url: string;
};

const imageWrapperMotionVariants = {
  animate: (custom: boolean) => ({
    scale: custom ? 0.95 : 1,
    transition: SPRING_TRANSITION,
  }),
};

const imageMotionVariants = {
  animate: (custom: boolean) => ({
    scale: custom ? 1.15 : 1,
    x: custom ? '-5%' : '0%',
    transition: SPRING_TRANSITION,
  }),
};

function CaseCard({ title, subtitle, image, url }: Props) {
  const [isHover, setIsHover] = useState(false);
  const t = useTranslations('Common');

  return (
    <div
      className="mb-25 last:mb-0"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link
        className="group"
        href={url}
        scroll={false}
        data-mf={t('mouseFollower.view')}
      >
        <motion.div
          className="mb-6 overflow-hidden rounded-main"
          variants={imageWrapperMotionVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          custom={isHover}
        >
          <motion.div
            className="overflow-hidden rounded-main"
            variants={imageMotionVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            custom={isHover}
          >
            <ImageContainer imageData={image} displayMode="auto" />
          </motion.div>
        </motion.div>
        <div className="flex flex-col gap-y-3">
          <Title component="h6" size={5}>
            {title}
          </Title>
          <div className="text-secondary text-ds-grey-700">{subtitle}</div>
        </div>
      </Link>
    </div>
  );
}

const MemoizedCaseCard = memo(CaseCard);

export { MemoizedCaseCard as CaseCard };
