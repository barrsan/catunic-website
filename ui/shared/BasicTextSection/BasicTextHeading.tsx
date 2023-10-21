import { PropsWithChildren } from 'react';

import { useAnimatedShowing } from '@/lib/hooks/useAnimatedShowing';

type Props = PropsWithChildren<{
  isAnimated: boolean;
  component: 'h1' | 'h2' | 'h3';
}>;

export function BasicTextHeading({ isAnimated, component, children }: Props) {
  const { animationScope } = useAnimatedShowing(isAnimated);

  const HeadingTag = component;

  return <HeadingTag ref={animationScope}>{children}</HeadingTag>;
}
