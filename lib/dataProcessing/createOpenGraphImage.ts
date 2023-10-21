import { ImageData, OpenGraphImage } from '@/types';

export function createOpenGraphImage(
  imageData: ImageData,
): OpenGraphImage | null {
  if (!Object.keys(imageData).length) {
    return null;
  }

  return {
    url: imageData.url as string,
    alt: imageData.alt as string,
    width: imageData.dimensions?.width ?? 0,
    height: imageData.dimensions?.height ?? 0,
  };
}
