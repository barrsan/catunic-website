import { memo, PropsWithChildren, useCallback, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import { ButtonContent } from './ButtonContent';
import { DefaultButton } from './DefaultButton';
import { LinkButton } from './LinkButton';

const buttonVariants = cva(
  ['relative', 'block w-full', 'overflow-hidden border border-ds-grey-900'],
  {
    variants: {
      aspectRatio: {
        auto: 'rounded-button px-12 py-6',
        square: 'aspect-square rounded-full p-6',
      },
    },
    defaultVariants: {
      aspectRatio: 'auto',
    },
  },
);

type CommonProps = {
  className?: string;
  wrapperClassName?: string;
  hasArrowIcon?: boolean;
  onHover?: (isActive: boolean) => void;
};

type ButtonProps = {
  mode: 'button';
  onClick: () => void;
};

type LinkProps = {
  mode: 'link';
  href: string;
  target?: '_blank' | '_self';
  scroll?: boolean;
};

type ButtonPropsWithCommon = ButtonProps & CommonProps;

type LinkPropsWithCommon = LinkProps & CommonProps;

type Props = PropsWithChildren<ButtonPropsWithCommon | LinkPropsWithCommon> &
  VariantProps<typeof buttonVariants>;

const isLink = (props: LinkProps | ButtonProps): props is LinkProps =>
  (props as LinkProps).href !== undefined;

function Button({
  className = '',
  wrapperClassName = '',
  hasArrowIcon = false,
  children,
  aspectRatio,
  onHover,
  ...restProps
}: Props) {
  const [isHoverActive, setHoverActive] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (onHover) {
      onHover(true);
    }

    setHoverActive(true);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    if (onHover) {
      onHover(false);
    }

    setHoverActive(false);
  }, [onHover]);

  const renderButton = () => {
    const classNames = {
      button: buttonVariants({ className, aspectRatio }),
    };

    const commonProps = {
      className: classNames.button,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    };

    if (isLink(restProps)) {
      return (
        <LinkButton {...commonProps} {...restProps}>
          <ButtonContent
            isSquare={aspectRatio === 'square'}
            hasArrowIcon={hasArrowIcon}
            hasHover={isHoverActive}
          >
            {children}
          </ButtonContent>
        </LinkButton>
      );
    }

    return (
      <DefaultButton {...commonProps} {...restProps}>
        <ButtonContent
          isSquare={aspectRatio === 'square'}
          hasArrowIcon={hasArrowIcon}
          hasHover={isHoverActive}
        >
          {children}
        </ButtonContent>
      </DefaultButton>
    );
  };

  return (
    <div
      className={clsx([
        'relative',
        'inline-block w-full sm:w-auto',
        'overflow-hidden rounded-button',
        wrapperClassName,
      ])}
    >
      {renderButton()}
    </div>
  );
}

const MemoizedButton = memo(Button);

export { MemoizedButton as Button };
