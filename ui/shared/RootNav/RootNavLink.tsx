import { memo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import BagIcon from '@/ui/svg/BagIcon.svg';
import HomeIcon from '@/ui/svg/HomeIcon.svg';
import PaperPlaneIcon from '@/ui/svg/PaperPlaneIcon.svg';
import UserIcon from '@/ui/svg/UserIcon.svg';

import { StaticPageAlias } from '@/types';

type Props = {
  name: string;
  href: string;
  isActive: boolean;
  alias: StaticPageAlias;
};

function getIconComponent(name: StaticPageAlias) {
  const icons = {
    [StaticPageAlias.HOME]: HomeIcon,
    [StaticPageAlias.ABOUT]: UserIcon,
    [StaticPageAlias.WORK]: BagIcon,
    [StaticPageAlias.CONTACT]: PaperPlaneIcon,
  };

  return Reflect.get(icons, name) || null;
}

function RootNavLink({ name, href, isActive, alias }: Props) {
  const Icon = getIconComponent(alias);

  return (
    <Link
      className={clsx([
        'group',
        'relative block rounded-main md:px-6 md:py-2.5',
        'text-base',
        'transition-colors delay-200 duration-700',
        isActive ? 'text-ds-grey-900' : 'text-white',
      ])}
      href={href}
      scroll={false}
    >
      <span className="relative z-10 hidden md:block">
        {isActive ? (
          name
        ) : (
          <span className="relative block overflow-hidden">
            <span
              className={clsx([
                'relative block',
                'before:absolute before:left-0 before:top-0 before:w-full',
                'before:text-white before:content-[attr(data-text)]',
                'after:absolute after:left-0 after:top-[105%] after:w-full',
                'after:text-white after:content-[attr(data-text)]',
                'duration-500 group-hover:-translate-y-[105%]',
              ])}
              data-text={name}
            >
              {name}
            </span>
          </span>
        )}
      </span>
      <span className="relative z-10 flex h-10.5 w-10.5 items-center justify-center md:hidden">
        <Icon
          className={clsx([
            'h-6 w-6',
            'transition-colors delay-200 duration-500',
            isActive ? 'fill-ds-grey-900' : 'fill-white',
          ])}
        />
      </span>
      {isActive && (
        <motion.span
          className="absolute left-0 top-0 block h-full w-full rounded-main bg-white"
          layoutId="active-nav-item"
        />
      )}
    </Link>
  );
}

const MemoizedRootNavLink = memo(RootNavLink);

export { MemoizedRootNavLink as RootNavLink };
