import { createOpenGraphImage } from '@/lib/dataProcessing/createOpenGraphImage';
import { createPageUrl } from '@/lib/dataProcessing/createPageUrl';
import { getRelatedDocument } from '@/lib/prismicio/getRelatedDocument';

import { ImageData, SocialAccount, SocialAccounts } from '@/types';
import type { ContentRelationshipField } from '@prismicio/client';

type InputData = {
  siteName: string;
  path: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: ImageData;
  twitterAccount: ContentRelationshipField<'socialAccount'>;
  socialAccounts: SocialAccounts;
};

const SITE_URL = process.env.SITE_URL as string;

export function prepareSeoData({
  siteName,
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  twitterAccount,
  socialAccounts,
}: InputData) {
  const twitterAccountDocument = getRelatedDocument<
    SocialAccount,
    'socialAccount'
  >(twitterAccount);

  const twitterSite =
    socialAccounts[twitterAccountDocument?.uid ?? ''].data.name ?? '';

  const url = createPageUrl({
    root: SITE_URL,
    path: path as string,
  });

  return {
    siteName,
    url,
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage: createOpenGraphImage(ogImage),
    twitterSite,
  };
}
