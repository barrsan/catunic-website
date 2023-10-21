import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { useSsr } from 'usehooks-ts';

import { usePageTransition } from '@/store/pageTransition';
import { useSmoothScroll } from '@/store/smoothScroll';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { Timeout } from '@/types';

const UNLOCK_TIMEOUT_SECONDS = 0.5;

export function useHeaderVisibility() {
  const [isVisible, setVisible] = useState(true);

  const { isBrowser } = useSsr();

  const prevPosYRef = useRef(isBrowser ? window.scrollY : 0);
  const isLock = useRef(false);

  const { currentPageKey, isPageTransition } = usePageTransition();
  const { smoothScrollViewport } = useSmoothScroll();

  const { scrollYProgress, scroll } = useScrollProxy({
    scrollViewport: smoothScrollViewport[currentPageKey] ?? undefined,
  });

  useEffect(() => {
    let timeout: Timeout = null;

    if (!isPageTransition) {
      setVisible(true);

      timeout = setTimeout(() => {
        isLock.current = false;
      }, UNLOCK_TIMEOUT_SECONDS * 1000);
    } else {
      isLock.current = true;
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPageTransition]);

  useEffect(() => {
    if (isVisible) {
      scroll?.update();
    }
  }, [isVisible, scroll]);

  useMotionValueEvent(scrollYProgress, 'change', (posY) => {
    const isScrollUp = posY <= prevPosYRef.current;

    prevPosYRef.current = posY;

    if (isLock.current) {
      return;
    }

    if (isScrollUp && !isVisible) {
      setVisible(true);
    } else if (!isScrollUp && isVisible) {
      setVisible(false);
    }
  });

  return { isVisible };
}
