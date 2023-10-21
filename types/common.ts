import { PageCaseData, PageDataWithUrl } from './page';
import { SocialAccounts, SocialLinkWithSocialAccount } from './socials';

export type Timeout = string | number | NodeJS.Timeout | null | undefined;

export type ItemWithId<T> = T & {
  id: string;
};

export type SliceZoneContext = {
  contactEmail: string;
  socialAccounts: SocialAccounts;
  socialLinks: SocialLinkWithSocialAccount[];
  cases?: PageDataWithUrl<PageCaseData>[];
};
