import { CaseDocument } from '@/prismicio-types';

import { ItemWithId } from './common';
import { PageCaseData, PageDataWithUrl } from './page';

export type CasePageDocument = CaseDocument;

type BasicCaseData = Pick<PageCaseData, 'name' | 'overview' | 'coverImage'>;

export type PreviewCase = ItemWithId<PageDataWithUrl<BasicCaseData>>;
export type NextCase = Omit<PreviewCase, 'id' | 'overview'>;
