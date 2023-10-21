import { NextSeo, NextSeoProps } from 'next-seo';

import type { SeoData } from '@/types';

type Props = NextSeoProps & Partial<SeoData>;

export function Seo({
  title,
  description,
  url,
  siteName,
  ogTitle,
  ogDescription,
  ogImage,
  twitterSite,
}: Props) {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        type: 'website',
        url,
        title: ogTitle,
        description: ogDescription,
        siteName,
        images: ogImage ? [ogImage] : [],
      }}
      twitter={{
        site: twitterSite,
        cardType: 'summary_large_image',
      }}
    />
  );
}
