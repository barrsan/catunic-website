import { useEffect, useRef, useState } from 'react';
import { clamp, motion } from 'framer-motion';
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';

import { usePageContext } from '@/context/page';
import { useSmoothScroll } from '@/store/smoothScroll';

import { calculatePercentage } from '@/lib/math/calculatePercentage';
import { calculatePercentageAmount } from '@/lib/math/calculatePercentageAmount';

import { cubicBezierEasing } from '@/constants';

type Props = {
  pageKey: string;
};

const THUMB_MIN_HEIGHT_PX = 64;

const indicatorMotionVariants = {
  initial: { x: 16 },
  animate: {
    x: 0,
    transition: {
      duration: 0.7,
      delay: 1,
      ease: cubicBezierEasing.MAIN,
    },
  },
  exit: { x: 16 },
};

export function PageScrollbar({ pageKey }: Props) {
  const [height, setHeight] = useState(0);
  const { smoothScrollInstance, smoothScrollContent } = useSmoothScroll();

  const { scrollViewport } = usePageContext();

  const thumbRef = useRef<HTMLDivElement>(null);
  const isThumbClickedRef = useRef<boolean>(false);

  const { isPageReady } = usePageContext();

  useEffect(() => {
    smoothScrollInstance[pageKey]?.on(
      'scroll',
      ({ progress }: { progress: number }) => {
        const positionY = progress * (window.innerHeight - height);

        if (thumbRef.current) {
          thumbRef.current.style.transform = `translate3d(0, ${positionY}px, 0)`;
        }
      },
    );
  }, [pageKey, smoothScrollInstance, height]);

  useIsomorphicLayoutEffect(() => {
    const viewportHeight = scrollViewport?.clientHeight ?? 0;
    const contentHeight = smoothScrollContent[pageKey]?.clientHeight ?? 0;

    const hPercent = calculatePercentageAmount(viewportHeight, contentHeight);

    if (Math.ceil(hPercent) >= 100) {
      setHeight(0);
      return;
    }

    const h = calculatePercentage(hPercent, viewportHeight);
    const hThumb = Math.round(h);

    setHeight(THUMB_MIN_HEIGHT_PX > hThumb ? THUMB_MIN_HEIGHT_PX : hThumb);
  }, [smoothScrollContent, scrollViewport, isPageReady]);

  const handlePointerUp = () => {
    isThumbClickedRef.current = false;
  };

  const handlePointerDown = () => {
    isThumbClickedRef.current = true;
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isThumbClickedRef.current || !smoothScrollInstance[pageKey]) {
      return;
    }

    event.preventDefault();

    const progressPercent = (100 / (window.innerHeight / event.clientY)) * 0.01;
    const progress = clamp(0, 1, progressPercent);
    const position = (smoothScrollInstance[pageKey]?.limit ?? 1) * progress;

    smoothScrollInstance[pageKey]?.scrollTo(position, { immediate: false });
  };

  const handleKeyboardArrowsPress = (event: KeyboardEvent) => {
    const progressPercent = (100 / (window.innerHeight / 10)) * 0.01;
    const progress = clamp(0, 1, progressPercent);
    const offset = (smoothScrollInstance[pageKey]?.limit ?? 1) * progress;
    const currScroll = smoothScrollInstance[pageKey]?.scroll ?? 0;

    if (event.code === 'ArrowUp') {
      smoothScrollInstance[pageKey]?.scrollTo(currScroll - offset, {
        immediate: false,
      });
    }

    if (event.code === 'ArrowDown') {
      smoothScrollInstance[pageKey]?.scrollTo(currScroll + offset, {
        immediate: false,
      });
    }
  };

  useEventListener('pointermove', handlePointerMove);
  useEventListener('pointerup', handlePointerUp);
  useEventListener('keydown', handleKeyboardArrowsPress);

  if (!height) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 z-50 h-screen w-2 overflow-hidden mix-blend-difference">
      <div className="relative h-full">
        <div
          ref={thumbRef}
          style={{ height }}
          className="absolute right-1 w-1"
          onPointerDown={handlePointerDown}
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={indicatorMotionVariants}
            className="h-full w-full py-3"
          >
            <div className="h-full w-full rounded-full bg-white" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
