import Link from 'next/link';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { usePageTransition } from '@/store/pageTransition';

import { Container } from '@/ui/shared/Container';
import LogoIcon from '@/ui/svg/LogoIcon.svg';

import { PageProps } from '@/types';

import { useHeaderVisibility } from './useHeaderVisibility';

const headerVariants = cva('transition-all duration-500', {
  variants: {
    delay: {
      100: 'delay-100',
      200: 'delay-200',
      300: 'delay-300',
    },
    isVisible: {
      true: 'translate-y-0',
      false: '-translate-y-28',
    },
  },
});

type Props = {
  data: PageProps['headerData'];
};

export function Header({ data }: Props) {
  const t = useTranslations('Common');

  const { isVisible } = useHeaderVisibility();
  const { isPageTransition } = usePageTransition();

  return (
    <header
      className={clsx(
        'fixed z-50 h-auto w-full py-6 text-white mix-blend-difference',
        {
          'translate-y-0': isVisible,
          'delay-1000 -translate-y-28': !isVisible,
        },
      )}
    >
      <Container size={2}>
        <div
          className={clsx([
            'relative w-full',
            'flex flex-row items-center justify-center md:justify-between',
            'text-secondary-sm',
          ])}
        >
          {data?.leftText && (
            <div
              className={headerVariants({
                className: 'relative z-10 hidden md:block',
                delay: 100,
                isVisible,
              })}
            >
              {data.leftText}
            </div>
          )}
          <div
            className={headerVariants({
              className: 'absolute inset-0 flex flex-row justify-center',
              delay: 200,
              isVisible,
            })}
          >
            <div className="flex items-center justify-center">
              <Link
                className={clsx({
                  'pointer-events-none': isPageTransition,
                })}
                href="/"
              >
                <span className="flex flex-row items-center justify-center">
                  <LogoIcon className="h-8 w-8 fill-white md:h-10 md:w-10" />
                  <span className="ml-2 text-primary font-extrabold text-white">
                    {t('siteName')}
                  </span>
                </span>
              </Link>
            </div>
          </div>
          {data?.rightText && (
            <div
              className={headerVariants({
                className: 'relative z-10 hidden text-right md:block',
                delay: 300,
                isVisible,
              })}
            >
              {data.rightText}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
