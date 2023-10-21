import { v4 as uuidv4 } from 'uuid';

import { MarqueeItem, MarqueeItemWithoutId } from '@/types';

export function createMarqueeList(
  items: MarqueeItemWithoutId[],
): MarqueeItem[] {
  return items.map((item) => ({
    id: uuidv4(),
    ...item,
  }));
}
