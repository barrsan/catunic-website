import { useMemo } from 'react';
import { NewsFeedDocumentData, NewsPostDocumentData } from '@/prismicio-types';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { getRelatedDocument } from '@/lib/prismicio/getRelatedDocument';

import { ContainerSize } from '@/ui/shared/Container';
import { NewsFeedSection } from '@/ui/shared/NewsFeedSection';

import { SliceZoneContext, SocialAccount } from '@/types';
import { NewsFeedPost } from '@/types/newsFeed';

/**
 * Props for `NewsFeedBlock`.
 */
export type NewsFeedBlockProps = SliceComponentProps<
  Content.NewsFeedBlockSlice,
  SliceZoneContext
>;

/**
 * Component for "NewsFeedBlock" Slices.
 */
function NewsFeedBlock({ slice, context }: NewsFeedBlockProps): JSX.Element {
  const newsFeed = useMemo<NewsFeedPost[]>(() => {
    const result: NewsFeedPost[] = [];

    const newsFeedDocument = getRelatedDocument<
      NewsFeedDocumentData,
      'newsFeed'
    >(slice.primary.newsFeed);

    if (!newsFeedDocument?.data?.news) {
      return result;
    }

    newsFeedDocument.data.news.forEach((item) => {
      const itemDocument = getRelatedDocument<NewsPostDocumentData, 'newsPost'>(
        item.newsItem,
      );

      if (itemDocument && itemDocument.data) {
        const socialAccountDocument = getRelatedDocument<
          SocialAccount,
          'socialAccount'
        >(itemDocument.data.socialAccount);

        result.push({
          id: itemDocument.id,
          ...itemDocument.data,
          socialAccount:
            context.socialAccounts[socialAccountDocument?.uid ?? ''],
        });
      }
    });

    return result;
  }, [context.socialAccounts, slice.primary.newsFeed]);

  return (
    <NewsFeedSection
      spacingTop={slice.primary.spacingTop}
      spacingBottom={slice.primary.spacingBottom}
      containerSize={+slice.primary.containerSize as ContainerSize}
      title={slice.primary.title as string}
      data={newsFeed}
    />
  );
}

export default NewsFeedBlock;
