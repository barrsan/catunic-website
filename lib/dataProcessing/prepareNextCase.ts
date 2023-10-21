import { PageCaseData } from '@/types';

import { getRelatedDocument } from '../prismicio/getRelatedDocument';

type NextCaseData = Pick<PageCaseData, 'name' | 'coverImage'>;

export function prepareNextCase(data: PageCaseData) {
  const nextCase = getRelatedDocument<NextCaseData, 'case'>(data.nextCase);

  if (!nextCase || !nextCase.data) {
    return null;
  }

  return {
    url: nextCase.url as string,
    name: nextCase.data.name as string,
    coverImage: nextCase.data.coverImage,
  };
}
