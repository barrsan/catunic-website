import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { Button } from '@/ui/shared/Button';
import { Container } from '@/ui/shared/Container';
import { Title } from '@/ui/shared/Title';
import UnicornIcon from '@/ui/svg/UnicornIcon.svg';

import { cubicBezierEasing } from '@/constants';

type Props = {
  message: string;
  buttonLabel: string;
  hasButtonArrow?: boolean;
  onButtonClick: () => void;
};

const unicornMotionVariants = {
  animate: (custom: boolean) => ({
    y: custom ? '-3rem' : '0rem',
    transition: {
      duration: 1.3,
      delay: 0.5,
      ease: cubicBezierEasing.MAIN,
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

export function PageError({
  message,
  buttonLabel,
  hasButtonArrow = true,
  onButtonClick,
}: Props) {
  const [isShowUnicorn, setIsShowUnicorn] = useState(false);

  useEffect(() => {
    setIsShowUnicorn(true);
  }, []);

  return (
    <Container size={1}>
      <div
        className={clsx([
          'pt-28 xs:pt-0',
          'flex flex-col items-start justify-start xs:items-center xs:justify-center ',
          'min-h-screen w-full text-center',
        ])}
      >
        <div>
          <div className="mx-auto mb-20">
            <Title component="div" size={3} fontWeight={500}>
              {message}
            </Title>
          </div>
          <div className="relative">
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
              className="relative z-10 bg-white"
              mode="button"
              onClick={onButtonClick}
              hasArrowIcon={hasButtonArrow}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
