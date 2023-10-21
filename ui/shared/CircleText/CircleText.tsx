import { memo } from 'react';

import { useDetectSafariBrowser } from '@/lib/hooks/useDetectSafariBrowser';

type Props = {
  className?: string;
  text: string;
  fontSize: number;
  fontSizeSafari: number;
};

function CircleText({ className = '', text, fontSize, fontSizeSafari }: Props) {
  const isSafari = useDetectSafariBrowser();

  const textString = text.replace(/\s/g, '\u00A0');
  const textFontSize = isSafari ? fontSizeSafari : fontSize;

  return (
    <svg className={className} viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <path
          id="circle"
          d="
          M 50, 50
          m -37, 0
          a 37,37 0 1,1 74,0
          a 37,37 0 1,1 -74,0"
        />
      </defs>
      <text fontSize={textFontSize}>
        <textPath xlinkHref="#circle">{textString}</textPath>
      </text>
    </svg>
  );
}

const MemoizedCircleText = memo(CircleText);

export { MemoizedCircleText as CircleText };
