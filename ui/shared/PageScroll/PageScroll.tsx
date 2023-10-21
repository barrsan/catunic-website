import { PropsWithChildren, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import clsx from 'clsx';
import { useAnimationFrame } from 'framer-motion';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  useEventListener,
  useIsomorphicLayoutEffect,
  useWindowSize,
} from 'usehooks-ts';

import { usePageContext } from '@/context/page';
import { useSmoothScroll } from '@/store/smoothScroll';

import { useDetectMobileDevice } from '@/lib/hooks/useDetectMobileDevice';

import { PageScrollbar } from './PageScrollbar';

type Props = PropsWithChildren<{
  pageKey: string;
  hasCustomScrollbar?: boolean;
}>;

export function PageScroll({
  pageKey,
  hasCustomScrollbar = true,
  children,
}: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const { setScrollViewport } = usePageContext();

  const { height } = useWindowSize();
  const isMobile = useDetectMobileDevice();

  const {
    setSmoothScrollViewport,
    setSmoothScrollInstance,
    setSmoothScrollContent,
  } = useSmoothScroll();

  useIsomorphicLayoutEffect(() => {
    if (!isMobile) {
      lenisRef.current = new Lenis({
        duration: 1.3,
        smoothWheel: true,
        syncTouch: true,
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
      });

      setSmoothScrollInstance(pageKey, lenisRef.current);
      setSmoothScrollViewport(pageKey, wrapperRef.current);
      setSmoothScrollContent(pageKey, contentRef.current);

      setScrollViewport(wrapperRef.current);
    }

    ScrollTrigger.refresh();

    return () => {
      lenisRef.current?.destroy();
      setSmoothScrollInstance(pageKey, null);
      setSmoothScrollViewport(pageKey, null);
      setSmoothScrollContent(pageKey, null);

      setScrollViewport(null);

      ScrollTrigger.refresh();
    };
  }, [pageKey, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    lenisRef.current?.resize();
    ScrollTrigger.refresh();
  }, [height, isMobile]);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
    ScrollTrigger.update();
  });

  const handleWindowOrientationChange = () => {
    ScrollTrigger.refresh();
  };

  const handleWindowResize = () => {
    if (isMobile) return;

    lenisRef.current?.resize();
    ScrollTrigger.refresh();
  };

  useEventListener('orientationchange', handleWindowOrientationChange);
  useEventListener('resize', handleWindowResize);

  return (
    <>
      <div
        ref={wrapperRef}
        className={clsx([
          'w-full',
          {
            'h-screen overflow-y-hidden': !isMobile,
          },
        ])}
        style={{ height: isMobile ? 'auto' : height }}
      >
        <div ref={contentRef} className="scroll-auto">
          {children}
        </div>
      </div>
      {hasCustomScrollbar && !isMobile && <PageScrollbar pageKey={pageKey} />}
    </>
  );
}
