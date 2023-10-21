import { NewsFeedDocumentData, NewsPostDocumentData } from '@/prismicio-types';

import { ItemWithId } from './common';
import { SocialAccount } from './socials';

export type NewsFeed = NewsFeedDocumentData;

export type NewsFeedPost = ItemWithId<
  Omit<NewsPostDocumentData, 'socialAccount'> & {
    socialAccount?: SocialAccount;
  }
>;
