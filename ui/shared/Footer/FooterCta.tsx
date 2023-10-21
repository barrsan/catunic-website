import Image from 'next/image';
import Link from 'next/link';
import HandCallMeImage from '@/public/images/hand-call-me.webp';
import clsx from 'clsx';

import { CircleText } from '@/ui/shared/CircleText';

type Props = {
  ctaTextRows: [string, string];
  ctaButtonText: string;
  ctaButtonFontSize: number;
  ctaButtonFontSizeSafari: number;
  contactEmail: string;
};

export function FooterCta({
  ctaTextRows,
  ctaButtonText,
  ctaButtonFontSize,
  ctaButtonFontSizeSafari,
  contactEmail,
}: Props) {
  return (
    <div className="relative flex flex-col text-title-big font-bold">
      {ctaTextRows.map((row) => (
        <div key={row} className="text-center first:mb-4">
          {row}
        </div>
      ))}
      <div className="absolute inset-0 -top-4 flex items-center justify-center">
        <Link
          className={clsx([
            'group relative top-2 md:top-0',
            'flex items-center justify-center',
            'h-20 w-20 xs:h-28 xs:w-28 md:h-38 md:w-38',
          ])}
          href={`mailto:${contactEmail}`}
        >
          <div
            className={clsx([
              'absolute',
              'h-20 w-20 xs:h-28 xs:w-28 md:h-38 md:w-38',
              'rounded-full bg-ds-orchid',
              'duration-300 group-hover:scale-115',
            ])}
          />
          <Image
            className={clsx([
              'relative z-10',
              'h-6 w-6 sm:h-12 sm:w-12',
              'group-hover:animate-wave-call-me',
            ])}
            src={HandCallMeImage}
            width={48}
            height={48}
            alt={ctaTextRows.join(' ')}
            unoptimized
          />
          <CircleText
            className={clsx([
              'absolute inset-1/25 z-10',
              'h-[92%] w-[92%]',
              'fill-white font-normal',
              'animate-spin-slow',
            ])}
            text={ctaButtonText}
            fontSize={ctaButtonFontSize}
            fontSizeSafari={ctaButtonFontSizeSafari}
          />
        </Link>
      </div>
    </div>
  );
}
