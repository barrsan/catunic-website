import { ForwardedRef, forwardRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

import { fetchCommonPageData } from '@/services';

import { PageContextProvider } from '@/context/page';

import { getI18nMessages } from '@/lib/next/getI18nMessages';

import { ErrorLayout } from '@/layouts/ErrorLayout';
import { PageError } from '@/ui/shared/PageError';
import { PageTransition } from '@/ui/shared/PageTransition';
import { Seo } from '@/ui/shared/Seo';

import { PageProps, StaticPageAlias } from '@/types';
import type { GetStaticProps } from 'next';

type Props = Omit<PageProps, 'seoData'>;

function ServerErrorPage(
  { pageKey }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const t = useTranslations('Common');

  const router = useRouter();

  const handleButtonClick = useCallback(() => {
    router.reload();
  }, [router]);

  return (
    <PageContextProvider>
      <PageTransition pageKey={pageKey} ref={ref}>
        <Seo title="500" />
        <ErrorLayout pageKey={pageKey}>
          <PageError
            message={t('pageErrorMessages.500')}
            buttonLabel={t('tryAgain')}
            onButtonClick={handleButtonClick}
            hasButtonArrow={false}
          />
        </ErrorLayout>
      </PageTransition>
    </PageContextProvider>
  );
}

export default forwardRef(ServerErrorPage);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const messages = await getI18nMessages();
  const commonPageData = await fetchCommonPageData();

  return {
    props: {
      ...commonPageData,
      pageKey: StaticPageAlias.SOMETHING_WRONG,
      messages,
    },
  };
};
