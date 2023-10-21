import { CasePageDocument } from '@/types';

export function prepareCasePreviews(caseDocuments: CasePageDocument[]) {
  return caseDocuments.map((caseDoc) => ({
    id: caseDoc.id,
    name: caseDoc.data.name,
    overview: caseDoc.data.overview,
    coverImage: caseDoc.data.coverImage,
    url: caseDoc.url ?? '',
  }));
}
