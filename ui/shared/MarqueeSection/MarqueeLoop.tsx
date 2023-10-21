import { useRef, useState } from 'react';
import { useEventListener, useIsomorphicLayoutEffect } from 'usehooks-ts';

import { MarqueeItem } from '@/types';

import { MarqueeLooping } from './MarqueeLooping';

type Props = {
  items: MarqueeItem[];
  loopIndex: number;
  speed: number;
  startOffset?: number;
};

export function MarqueeLoop({
  items,
  loopIndex,
  speed,
  startOffset = 0,
}: Props) {
  const [height, setHeight] = useState(0);

  const marqueeRef = useRef<HTMLDivElement>(null);

  const setCurrentHeight = () => {
    setHeight(marqueeRef.current?.getBoundingClientRect().height ?? 0);
  };

  useIsomorphicLayoutEffect(() => {
    setCurrentHeight();
  }, []);

  useEventListener('resize', () => {
    setCurrentHeight();
  });

  return (
    <div
      className="relative box-content flex flex-nowrap overflow-hidden py-2"
      style={{ height }}
    >
      <MarqueeLooping
        ref={marqueeRef}
        items={items}
        uniqId={`${loopIndex}-0`}
        startOffset={startOffset}
        speed={speed}
      />
      <MarqueeLooping
        items={items}
        uniqId={`${loopIndex}-1`}
        startOffset={startOffset - 100}
        speed={speed}
      />
    </div>
  );
}
