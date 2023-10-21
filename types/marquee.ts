import { MarqueeBlockSliceDefaultItem } from '@/prismicio-types';

import { ItemWithId } from './common';

export type MarqueeItemWithoutId = MarqueeBlockSliceDefaultItem;

export type MarqueeItem = ItemWithId<MarqueeItemWithoutId>;
