import {
  ImageGridBlockSliceDefaultItem,
  PageTopBlockSliceDefaultPrimary,
  SingleImageBlockSliceDefaultPrimary,
} from '@/prismicio-types';
import { ImageField } from '@prismicio/client';

export type ImageData = ImageField<never>;

type BaseImageContainerProps = Omit<
  SingleImageBlockSliceDefaultPrimary,
  'spacingTop' | 'spacingBottom' | 'parallaxMode'
>;

export type PageTopIcon = PageTopBlockSliceDefaultPrimary['icon'];

export type ImageContainerData = BaseImageContainerProps &
  Partial<Pick<SingleImageBlockSliceDefaultPrimary, 'parallaxMode'>> &
  Partial<Pick<ImageGridBlockSliceDefaultItem, 'captionAlign'>>;
