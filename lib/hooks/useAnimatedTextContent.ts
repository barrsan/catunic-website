import { useEffect, useRef } from 'react';
import { animate, stagger, useInView } from 'framer-motion';
import SplitType from 'split-type';
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';

import { unwrapElements } from '@/lib/unwrapElements';

type Args = {
  defaultSelector?: string;
  dataSelector?: string;
};

export function useAnimatedTextContent({
  dataSelector,
  defaultSelector = '',
}: Args) {
  const textContainerRef = useRef(null);
  const textLinesRef = useRef<HTMLElement[]>([]);

  const isInView = useInView(textContainerRef, {
    once: true,
    amount: 0.6,
  });

  useIsomorphicLayoutEffect(() => {
    if (!isInView) {
      const selector = dataSelector
        ? `
          ${dataSelector} p,
          ${dataSelector} li,
          ${dataSelector} div,
          ${dataSelector} span
          `
        : defaultSelector;
      const splittedText = new SplitType(selector, {
        types: 'lines',
      });

      textLinesRef.current = splittedText.lines || [];

      animate(textLinesRef.current, { opacity: 0 });
    }
  }, [dataSelector, defaultSelector, isInView]);

  useEffect(() => {
    if (isInView) {
      animate(
        textLinesRef.current,
        { y: [20, 0], opacity: 1 },
        {
          duration: 0.5,
          delay: stagger(0.1),
        },
      );
    }
  }, [isInView]);

  useEventListener('resize', () => {
    unwrapElements(textLinesRef.current);
  });

  return {
    textContainerRef,
  };
}
