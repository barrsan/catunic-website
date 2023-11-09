import {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { motion, usePresence } from 'framer-motion';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useSsr } from 'usehooks-ts';

import { usePageTransition } from '@/store/pageTransition';

import { cubicBezierEasing } from '@/constants';

import { Timeout } from '@/types';

type Props = PropsWithChildren<{
  pageKey: string;
}>;

const DURATION_SECONDS = 1;
const DISABLE_FIXED_DURATION_SECONDS = 0.1;
const PAGE_TRANSITION_DELAY_SECONDS = 0.2;

const CONTENT_DURATION_SECONDS = 0.4;
const CONTENT_DELAY_SECONDS = 0.3;

const transition = {
  duration: DURATION_SECONDS,
  ease: cubicBezierEasing.MAIN,
  delay: PAGE_TRANSITION_DELAY_SECONDS,
};

const contentTransition = {
  duration: CONTENT_DURATION_SECONDS,
  delay: CONTENT_DELAY_SECONDS,
};

const rootMotionVariants = {
  initial: { x: '100%' },
  animate: { x: 0, transition },
  exit: { x: '-100%', transition },
};

const contentWrapperMotionVariants = {
  exit: { x: '60%', transition },
};

const contentMotionVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: contentTransition,
  },
};

const overlayMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 0.8, transition },
};

function PageTransition(
  { pageKey, children }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [isFixed, setFixed] = useState(true);

  const { isBrowser } = useSsr();

  const {
    isPageTransition,
    outboundPageKey,
    currentPageKey,
    setPageTransition,
    setOutboundPageKey,
  } = usePageTransition();

  const [isPresence, safeToRemove] = usePresence();

  const router = useRouter();

  useEffect(() => {
    const handleChangeStart = () => {
      setOutboundPageKey(pageKey);
      setPageTransition(true);
    };

    const handleChangeComplete = () => {
      if (currentPageKey === outboundPageKey) {
        setPageTransition(false);
      }
    };

    router.events.on('routeChangeStart', handleChangeStart);
    router.events.on('routeChangeComplete', handleChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleChangeStart);
      router.events.off('routeChangeComplete', handleChangeComplete);
    };
  }, [
    router,
    isPageTransition,
    setOutboundPageKey,
    setPageTransition,
    pageKey,
    outboundPageKey,
    currentPageKey,
  ]);

  useEffect(() => {
    let timeout: Timeout = null;

    if (!isPresence) {
      timeout = setTimeout(() => {
        safeToRemove();
      }, DURATION_SECONDS * 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPresence, safeToRemove]);

  const isOutboundPage = outboundPageKey === pageKey;

  useEffect(() => {
    let timeout: Timeout = null;

    if (!isPageTransition) {
      window.scrollTo(0, 0);

      timeout = setTimeout(() => {
        setFixed(false);
      }, DISABLE_FIXED_DURATION_SECONDS * 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPageTransition, pageKey, isBrowser]);

  useEffect(() => {
    if (!isFixed) {
      ScrollTrigger.refresh();
    }
  }, [isFixed]);

  return (
    <motion.div
      className={clsx([
        `page-key-${pageKey}`,
        'bg-white',
        isFixed &&
          !isOutboundPage &&
          'fixed left-0 right-0 top-0 max-h-[120vh] w-full overflow-hidden',
      ])}
      ref={ref}
      variants={rootMotionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={contentWrapperMotionVariants}
        initial={false}
        exit="exit"
      >
        <motion.div
          variants={contentMotionVariants}
          initial="initial"
          animate="animate"
        >
          {children}
        </motion.div>
      </motion.div>
      {!isPresence && (
        <motion.div
          className="fixed inset-0 z-10 h-full w-full bg-ds-grey-900"
          variants={overlayMotionVariants}
          initial="initial"
          animate="animate"
        />
      )}
    </motion.div>
  );
}

const PageTransitionWithRef = forwardRef(PageTransition);

export { PageTransitionWithRef as PageTransition };
