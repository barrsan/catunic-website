import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';

const basicLinkVariants = cva(
  [
    'relative',
    'text-primary no-underline',
    'after:absolute after:bottom-0 after:left-0',
    'after:h-1px after:w-full',
    'after:transition-transform after:duration-300',
    'after:scale-x-100 hover:after:scale-x-0',
  ],
  {
    variants: {
      isDark: {
        true: 'text-white after:bg-white',
        false: 'text-ds-grey-900 after:bg-ds-grey-900',
      },
      underlineDirection: {
        left: 'after:origin-left hover:after:origin-right',
        right: 'after:origin-right hover:after:origin-left',
        center: 'after:origin-center',
      },
    },
    defaultVariants: {
      isDark: false,
      underlineDirection: 'center',
    },
  },
);

type Props = PropsWithChildren<
  {
    className?: string;
    href: string;
    hasBlank?: boolean;
  } & VariantProps<typeof basicLinkVariants>
>;

export function BasicLink({
  className = '',
  href,
  isDark,
  underlineDirection,
  children,
  hasBlank = false,
}: Props) {
  return (
    <Link
      className={basicLinkVariants({ isDark, underlineDirection, className })}
      href={href}
      scroll={false}
      target={hasBlank ? '_blank' : '_self'}
    >
      {children}
    </Link>
  );
}
