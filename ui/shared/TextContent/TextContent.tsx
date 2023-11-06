import { memo } from 'react';
import {
  JSXFunctionSerializer,
  JSXMapSerializer,
  PrismicRichText,
} from '@prismicio/react';

import { RichTextData } from '@/types';

type Props = {
  text: RichTextData;
  components?: JSXMapSerializer | JSXFunctionSerializer | undefined;
};

function TextContent({ text, components }: Props) {
  return <PrismicRichText field={text} components={components} />;
}

const MemoizedTextContent = memo(TextContent, () => true);

export { MemoizedTextContent as TextContent };
