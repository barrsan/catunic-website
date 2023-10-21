import { ForwardedRef, forwardRef, useRef } from 'react';
import { PrismicRichText } from '@prismicio/react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { Title } from '@/ui/shared/Title';

import { MarqueeItem } from '@/types';

type Props = {
  items: MarqueeItem[];
  uniqId: string;
  speed: number;
  startOffset: number;
};

function MarqueeLooping(
  { items, uniqId, speed, startOffset }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const directionRef = useRef<number>(1);

  const { scrollY } = useScrollProxy();

  const baseX = useMotionValue(startOffset);

  const scrollVelocity = useVelocity(scrollY);

  const springVelocity = useSpring(scrollVelocity, {
    damping: 100,
    stiffness: 1000,
  });

  const velocity = useTransform(springVelocity, [0, 1000], [0, 3], {
    clamp: false,
  });

  const x = useTransform(
    baseX,
    (value) => `${wrap(startOffset, startOffset + 100, value)}%`,
  );

  const animate = (time: number, delta: number) => {
    let moveBy = directionRef.current * speed * (delta / 3000);

    if (velocity.get() < 0) {
      directionRef.current = -1;
    } else if (velocity.get() > 0) {
      directionRef.current = 1;
    }

    moveBy += directionRef.current * moveBy * velocity.get();

    baseX.set(baseX.get() + moveBy);
  };

  useAnimationFrame(animate);

  return (
    <motion.div
      ref={ref}
      className="absolute flex flex-nowrap items-center"
      style={{ x }}
    >
      {items.map((item) => (
        <span
          className="flex flex-row items-center"
          key={`${item.id}-${uniqId}`}
        >
          <Title
            component="span"
            fontWeight={400}
            isDark
            size="big"
            whitespace="nowrap"
          >
            <PrismicRichText field={item.textItem} />
          </Title>
          <Title component="span" isDark size={2}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {item.divider}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </Title>
        </span>
      ))}
    </motion.div>
  );
}

const MarqueeLoopingWithRef = forwardRef(MarqueeLooping);

export { MarqueeLoopingWithRef as MarqueeLooping };
