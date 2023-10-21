import {
  AboutDocumentData,
  CaseDocumentData,
  ContactDocumentData,
  HomeDocumentData,
  SiteFooterDocumentData,
  SiteHeaderDocumentData,
  SiteNavigationDocumentData,
  WorkDocumentData,
} from '@/prismicio-types';
import { AbstractIntlMessages } from 'next-intl';

import { StaticPageAlias } from './nav';
import { SocialAccounts, SocialLinkWithSocialAccount } from './socials';

export type InnerPageParams = {
  slug: string;
};

export type OpenGraphImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type SeoData = {
  siteName: string;
  url: string;
  title: string;
  description?: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: OpenGraphImage | null;
  twitterSite: string;
};

type PageDocumentSeoData =
  | 'seoTitle'
  | 'seoDescription'
  | 'ogTitle'
  | 'ogDescription'
  | 'ogImage'
  | 'twitterAccount';

export type PageHomeData = Omit<HomeDocumentData, PageDocumentSeoData>;
export type PageAboutData = Omit<AboutDocumentData, PageDocumentSeoData>;
export type PageWorkData = Omit<WorkDocumentData, PageDocumentSeoData>;
export type PageContactData = Omit<ContactDocumentData, PageDocumentSeoData>;
export type PageCaseData = Omit<CaseDocumentData, PageDocumentSeoData>;

type PageData =
  | PageHomeData
  | PageAboutData
  | PageWorkData
  | PageContactData
  | PageCaseData;

export type PageDataWithUrl<T extends Partial<PageData>> = T & {
  url: string;
};

type BasePageProps = {
  seoData: SeoData;
  pageKey: StaticPageAlias | string;
  headerData: SiteHeaderDocumentData;
  footerData: SiteFooterDocumentData;
  navigationData: SiteNavigationDocumentData;
  socialLinks: SocialLinkWithSocialAccount[];
  socialAccounts: SocialAccounts;
  contactEmail: string;
  messages?: AbstractIntlMessages;
};

export type PageProps<T = undefined> = T extends undefined
  ? BasePageProps
  : BasePageProps & T;
