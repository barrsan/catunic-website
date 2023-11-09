import '@/styles/global.css';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NextIntlProvider } from 'next-intl';
import { YandexMetricaProvider } from 'next-yandex-metrica';

import { usePageTransition } from '@/store/pageTransition';

import { useDetectMobileDevice } from '@/lib/hooks/useDetectMobileDevice';
import { useRegisterGsapPlugins } from '@/lib/hooks/useRegisterGsapPlugins';
import { useRouteChangeAnalytics } from '@/lib/hooks/useRouteChangeAnalytics';
import { poppins } from '@/lib/next/getFonts';

import { Header } from '@/ui/shared/Header';
import { MouseFollower } from '@/ui/shared/MouseFollower';
import { PreventScrollRestorationScript } from '@/ui/shared/PreventScrollRestorationScript';
import { RootNav } from '@/ui/shared/RootNav';
import { LightTaglineText } from '@/ui/translationValues';

import { EN_LOCALE } from '@/constants';

import { PageProps, StaticPageAlias } from '@/types';
import type { AppProps } from 'next/app';

const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID);

export default function App({ Component, pageProps }: AppProps<PageProps>) {
  const { messages, headerData, navigationData, ...restPageProps } = pageProps;

  useRegisterGsapPlugins();
  useRouteChangeAnalytics();

  const { setPageTransition, setCurrentPageKey } = usePageTransition();
  const isMobile = useDetectMobileDevice();

  useEffect(() => {
    setCurrentPageKey(restPageProps.pageKey);
  }, [restPageProps.pageKey, setCurrentPageKey]);

  const handleExitComplete = () => {
    setPageTransition(false);
  };

  const isErrorPage =
    restPageProps.pageKey === StaticPageAlias.NOT_FOUND ||
    restPageProps.pageKey === StaticPageAlias.SOMETHING_WRONG;

  return (
    <>
      <YandexMetricaProvider
        tagID={YM_ID}
        initParameters={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
        }}
      >
        <div className={poppins.className}>
          <NextIntlProvider
            locale={EN_LOCALE}
            messages={messages}
            defaultTranslationValues={{
              taglineLight: LightTaglineText,
            }}
          >
            {!isErrorPage && !isMobile && <MouseFollower />}
            <Header data={headerData} />
            <AnimatePresence
              initial={false}
              mode="popLayout"
              onExitComplete={handleExitComplete}
            >
              <Component key={restPageProps.pageKey} {...restPageProps} />
            </AnimatePresence>
            <RootNav data={navigationData} isErrorPage={isErrorPage} />
          </NextIntlProvider>
        </div>
      </YandexMetricaProvider>
      <PreventScrollRestorationScript />
    </>
  );
}
