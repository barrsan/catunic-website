import { SocialAccount, SocialAccounts } from '@/types';

export function createSocialAccountsMap(data: SocialAccount[]) {
  const hm: SocialAccounts = {};

  data.forEach((item) => {
    hm[item.uid] = item;
  });

  return hm;
}
