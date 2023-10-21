import { forwardRef } from 'react';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';

import { fetchCommonPageData } from '@/services';

import { PageContextProvider } from '@/context/page';

import { prepareSeoData } from '@/lib/dataProcessing/prepareSeoData';
import { getI18nMessages } from '@/lib/next/getI18nMessages';
import { prismicioClient } from '@/lib/prismicio/prismicioClient';

import { MainLayout } from '@/layouts/MainLayout';
import { PageTransition } from '@/ui/shared/PageTransition';
import { Seo } from '@/ui/shared/Seo';

import { PageHomeData, PageProps, StaticPageAlias } from '@/types';
import type { GetStaticProps } from 'next';
import type { ForwardedRef } from 'react';

type Props = PageProps<{
  pageData: PageHomeData;
}>;

function HomePage(
  {
    pageKey,
    footerData,
    socialLinks,
    socialAccounts,
    contactEmail,
    seoData,
    pageData,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <PageContextProvider>
      <PageTransition pageKey={pageKey} ref={ref}>
        <Seo {...seoData} />
        <MainLayout
          pageKey={pageKey}
          footerData={footerData}
          socialLinks={socialLinks}
          contactEmail={contactEmail}
        >
          <SliceZone
            slices={pageData.slices}
            components={components}
            context={{
              socialAccounts,
              socialLinks,
              contactEmail,
            }}
          />
        </MainLayout>
      </PageTransition>
    </PageContextProvider>
  );
}

export default forwardRef(HomePage);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const messages = await getI18nMessages();

  const { siteName, socialAccounts, ...commonPageData } =
    await fetchCommonPageData();

  const pageDocument = await prismicioClient.getSingle('home', {
    fetchLinks: [
      'case.name',
      'case.overview',
      'case.coverImage',
      'newsFeed.news',
      'newsPost.title',
      'newsPost.image',
      'newsPost.sourceLink',
      'newsPost.sourceName',
      'newsPost.sourceType',
      'newsPost.socialAccount',
    ],
  });

  const {
    seoTitle,
    seoDescription,
    ogTitle = '',
    ogDescription = '',
    ogImage,
    twitterAccount,
    ...pageData
  } = pageDocument.data;

  const seoData = prepareSeoData({
    siteName,
    path: pageDocument.url as string,
    title: seoTitle as string,
    description: seoDescription as string,
    ogTitle: ogTitle as string,
    ogDescription: ogDescription as string,
    ogImage,
    twitterAccount,
    socialAccounts,
  });

  return {
    props: {
      ...commonPageData,
      seoData,
      pageKey: StaticPageAlias.HOME,
      pageData,
      messages,
      socialAccounts,
    },
  };
};
