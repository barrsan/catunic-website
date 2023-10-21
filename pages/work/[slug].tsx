import { forwardRef } from 'react';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import { v4 as uuidv4 } from 'uuid';

import { fetchCommonPageData } from '@/services';

import { PageContextProvider } from '@/context/page';

import { prepareNextCase } from '@/lib/dataProcessing/prepareNextCase';
import { prepareSeoData } from '@/lib/dataProcessing/prepareSeoData';
import { getI18nMessages } from '@/lib/next/getI18nMessages';
import { prismicioClient } from '@/lib/prismicio/prismicioClient';

import { MainLayout } from '@/layouts/MainLayout';
import { NextCaseSection } from '@/ui/case/NextCaseSection';
import { PageTransition } from '@/ui/shared/PageTransition';
import { Seo } from '@/ui/shared/Seo';

import { InnerPageParams, NextCase, PageCaseData, PageProps } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ForwardedRef } from 'react';

type Props = PageProps<{
  pageData: PageCaseData;
  nextCase: NextCase | null;
}>;

function CasePage(
  {
    pageKey,
    footerData,
    socialLinks,
    socialAccounts,
    contactEmail,
    pageData,
    seoData,
    nextCase,
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
          {nextCase && (
            <NextCaseSection
              url={nextCase.url}
              name={nextCase.name}
              coverImage={nextCase.coverImage}
            />
          )}
        </MainLayout>
      </PageTransition>
    </PageContextProvider>
  );
}

export default forwardRef(CasePage);

export const getStaticProps: GetStaticProps<Props, InnerPageParams> = async ({
  params,
}) => {
  const messages = await getI18nMessages();
  const { siteName, socialAccounts, ...commonPageData } =
    await fetchCommonPageData();

  const pageDocument = await prismicioClient.getByUID(
    'case',
    params?.slug as string,
    {
      fetchLinks: ['case.name', 'case.coverImage'],
    },
  );

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

  const nextCase = prepareNextCase(pageData);

  return {
    props: {
      ...commonPageData,
      seoData,
      pageKey: uuidv4(),
      pageData,
      messages,
      socialAccounts,
      nextCase,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cases = await prismicioClient.getAllByType('case');

  const paths = cases.map(({ uid }) => ({
    params: {
      slug: uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
