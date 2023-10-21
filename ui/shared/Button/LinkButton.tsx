import { memo, PropsWithChildren } from 'react';
import Link from 'next/link';

type Props = PropsWithChildren<{
  className?: string;
  href: string;
  target?: '_blank' | '_self';
  scroll?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}>;

function LinkButton({
  className = '',
  href,
  target = '_self',
  scroll = false,
  onMouseEnter,
  onMouseLeave,
  children,
}: Props) {
  return (
    <Link
      className={className}
      href={href}
      target={target}
      scroll={scroll}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}

const MemoizedLinkButton = memo(LinkButton);

export { MemoizedLinkButton as LinkButton };
