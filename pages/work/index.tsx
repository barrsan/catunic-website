import { forwardRef } from 'react';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';

import { fetchCommonPageData } from '@/services';

import { PageContextProvider } from '@/context/page';

import { prepareCasePreviews } from '@/lib/dataProcessing/prepareCasePreviews';
import { prepareSeoData } from '@/lib/dataProcessing/prepareSeoData';
import { getI18nMessages } from '@/lib/next/getI18nMessages';
import { prismicioClient } from '@/lib/prismicio/prismicioClient';

import { MainLayout } from '@/layouts/MainLayout';
import { PageTransition } from '@/ui/shared/PageTransition';
import { Seo } from '@/ui/shared/Seo';

import { PageProps, PageWorkData, PreviewCase, StaticPageAlias } from '@/types';
import type { GetStaticProps } from 'next';
import type { ForwardedRef } from 'react';

type Props = PageProps<{
  pageData: PageWorkData;
  cases: PreviewCase[];
}>;

function WorkPage(
  {
    pageKey,
    footerData,
    socialLinks,
    socialAccounts,
    contactEmail,
    pageData,
    seoData,
    cases,
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
          sectionsCount={pageData.slices.length}
        >
          <SliceZone
            slices={pageData.slices}
            components={components}
            context={{
              cases,
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

export default forwardRef(WorkPage);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const messages = await getI18nMessages();
  const { siteName, socialAccounts, ...commonPageData } =
    await fetchCommonPageData();

  const pageDocument = await prismicioClient.getSingle('work');

  const caseDocuments = await prismicioClient.getAllByType('case', {
    orderings: [
      {
        field: 'my.case.timestamp',
        direction: 'desc',
      },
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

  const cases = prepareCasePreviews(caseDocuments);

  return {
    props: {
      ...commonPageData,
      seoData,
      pageKey: StaticPageAlias.WORK,
      pageData,
      cases,
      messages,
      socialAccounts,
    },
  };
};
