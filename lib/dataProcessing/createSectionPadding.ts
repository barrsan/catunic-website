import { PaddingValue, SectionPadding } from '@/ui/shared/Section';

export function createSectionPadding(
  pt: string,
  pb: string | undefined,
): SectionPadding {
  if (!pb) {
    return +pt as PaddingValue;
  }

  return [+pt as PaddingValue, +pb as PaddingValue];
}
