import { memo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { useIsFirstRender } from 'usehooks-ts';

type Props = {
  isShow: boolean;
  isSquare: boolean;
};

function ButtonBackdrop({ isShow, isSquare }: Props) {
  const circleRef = useRef(null);
  const [scope, animate] = useAnimate();
  const isFirstRender = useIsFirstRender();

  const duration = isSquare ? 0.3 : 0.5;

  useEffect(() => {
    animate(
      circleRef.current,
      {
        y: isShow
          ? 'var(--btn-bg-offset-y-to, 100%)'
          : 'var(--btn-bg-offset-y-from, 0%)',
      },
      { duration: isFirstRender ? 0 : duration },
    );
  }, [animate, isShow, isFirstRender, duration]);

  return (
    <div ref={scope} className="pointer-events-none">
      <div
        ref={circleRef}
        className={clsx([
          isSquare ? 'aspect-square' : 'aspect-video',
          'absolute left-0 top-0',
          'w-full rounded-b-1/2',
          'bg-ds-grey-900',
          '-translate-y-full',
          '[--btn-bg-offset-y-from:0%] [--btn-bg-offset-y-to:100%]',
        ])}
      />
    </div>
  );
}

const MemoizedButtonBackdrop = memo(ButtonBackdrop);

export { MemoizedButtonBackdrop as ButtonBackdrop };
