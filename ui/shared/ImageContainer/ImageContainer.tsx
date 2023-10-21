import { PrismicRichText } from '@prismicio/react';
import clsx from 'clsx';

import { CommonImage } from '@/ui/shared/CommonImage';

import { ImageData, RichTextData } from '@/types';
import type { CommonImageMode } from '@/ui/shared/CommonImage';

type Props = {
  displayMode: CommonImageMode;
  imageData: ImageData;
  caption?: RichTextData;
  captionAlign?: 'center' | 'left';
  hasParallax?: boolean;
};

export function ImageContainer({
  displayMode,
  imageData,
  caption = [],
  captionAlign = 'center',
  hasParallax = true,
}: Props) {
  return (
    <div className="w-auto">
      {Object.keys(imageData).length ? (
        <CommonImage
          imageData={imageData}
          mode={displayMode}
          hasParallax={hasParallax}
        />
      ) : null}
      {caption.length && displayMode !== 'cover' ? (
        <div
          className={clsx('prose mt-10', {
            'mx-auto text-center': captionAlign === 'center',
            'w-3/4': captionAlign === 'left',
          })}
        >
          <PrismicRichText field={caption} />
        </div>
      ) : null}
    </div>
  );
}
