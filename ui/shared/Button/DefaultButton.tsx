import { memo, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}>;

function DefaultButton({
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: Props) {
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}

const MemoizedDefaultButton = memo(DefaultButton);

export { MemoizedDefaultButton as DefaultButton };
