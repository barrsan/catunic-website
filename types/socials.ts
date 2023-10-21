import {
  SocialAccountDocument,
  SocialAccountDocumentData,
  SocialLinksDocumentDataSocialLinksItem,
} from '@/prismicio-types';

export const enum SocialLinkType {
  TELEGRAM = 'telegram',
  INSTAGRAM = 'instagram',
  BEHANCE = 'behance',
  DRIBBBLE = 'dribbble',
  LINKED_IN = 'linkedIn',
}

export type SocialLink = SocialLinksDocumentDataSocialLinksItem;

export type SocialLinkWithSocialAccount = Omit<SocialLink, 'socialAccount'> & {
  socialAccount: SocialAccount;
};

export type SocialAccount = SocialAccountDocument;

export type SocialAccountData = SocialAccountDocumentData;

export type SocialAccounts = {
  [key: string]: SocialAccount;
};
