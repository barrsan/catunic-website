import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { asLinkAttrs } from '@prismicio/client';
import clsx from 'clsx';

import { PageProps, StaticPageAlias } from '@/types';

import { RootNavLink } from './RootNavLink';

type Props = {
  data: PageProps['navigationData'];
  isErrorPage?: boolean;
};

function getFirstPathLevel(path: string | null) {
  if (!path) {
    return '';
  }
  return `/${path.split('/')[1]}`;
}

function RootNav({ data, isErrorPage = false }: Props) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-safari-ios-bottom-tab-bar left-0 z-50 h-0 w-full px-2">
      <div
        className={clsx([
          'mx-auto -mt-15 h-navigation max-w-fit',
          'rounded-main bg-black bg-opacity-30',
          'backdrop-blur-md',
          'backdrop-saturate-200',
          'shadow-as-border shadow-ds-grey-700',
        ])}
      >
        <ul className="flex flex-row items-baseline gap-x-8 p-2 md:gap-x-0">
          {data.navLinks.map((i) => {
            const { href = '#' } = asLinkAttrs(i.href);
            const isActive =
              !isErrorPage && getFirstPathLevel(pathname) === href;

            return (
              <li key={i.alias}>
                <RootNavLink
                  name={i.name as string}
                  alias={i.alias as StaticPageAlias}
                  href={href}
                  isActive={isActive}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

const MemoizedRootNav = memo(RootNav);

export { MemoizedRootNav as RootNav };
