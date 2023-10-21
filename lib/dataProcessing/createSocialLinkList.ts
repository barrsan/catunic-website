import { getRelatedDocument } from '@/lib/prismicio/getRelatedDocument';

import { SocialAccount, SocialAccounts, SocialLink } from '@/types';

export function createSocialLinkList(
  data: SocialLink[],
  socialAccounts: SocialAccounts,
) {
  return data.map((link) => {
    const socialAccount = getRelatedDocument<SocialAccount, 'socialAccount'>(
      link.socialAccount,
    );

    return {
      ...link,
      socialAccount: socialAccounts[socialAccount?.uid ?? ''],
    };
  });
}
