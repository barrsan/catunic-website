import {
  EmptyLinkField,
  FilledContentRelationshipField,
  isFilled,
} from '@prismicio/client';

export function getRelatedDocument<T extends unknown, D extends string>(
  srcData:
    | EmptyLinkField<'Document'>
    | FilledContentRelationshipField<D, string, T>,
) {
  if (isFilled.contentRelationship<D, string, T>(srcData)) {
    return srcData;
  }

  return null;
}
