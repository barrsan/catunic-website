import { RefObject, useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import { usePageContext } from '@/context/page';

type Args = {
  target?: RefObject<HTMLElement>;
  scrollViewport?: HTMLElement;
  offsetStart?: string | number | ScrollTrigger.StartEndFunc;
  offsetEnd?: string | number | ScrollTrigger.StartEndFunc;
  isDebug?: boolean;
};

export function useScrollProxy(args: Args = {}) {
  const st = useRef<ScrollTrigger>();

  const {
    target,
    scrollViewport,
    offsetStart,
    offsetEnd,
    isDebug = false,
  } = args;

  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  const { scrollViewport: viewport } = usePageContext();

  useEffect(() => {
    const options: ScrollTrigger.StaticVars = {};

    if (scrollViewport) {
      options.scroller = scrollViewport;
    }

    st.current = ScrollTrigger.create({
      trigger: target?.current,
      start: offsetStart,
      end: offsetEnd,
      markers: isDebug,
      onUpdate: (self) => {
        scrollY.set(self.scroll());
        scrollYProgress.set(self.progress);
      },
      scroller: viewport ?? undefined,
      ...options,
    });

    return () => {
      st.current?.kill();
    };
  }, [
    isDebug,
    offsetEnd,
    offsetStart,
    scrollY,
    scrollYProgress,
    scrollViewport,
    target,
    viewport,
  ]);

  return {
    scroll: st.current,
    scrollY,
    scrollYProgress,
  };
}
