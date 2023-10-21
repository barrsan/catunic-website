import { Head, Html, Main, NextScript } from 'next/document';

import { EN_LOCALE } from '@/constants';

export default function Document() {
  return (
    <Html lang={EN_LOCALE}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
