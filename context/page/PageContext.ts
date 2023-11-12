import { createContext } from 'react';

type PageContextData = {
  sliceCount: number;
  setSliceCount: (sliceCount: number) => void;
  scrollViewport?: HTMLElement | null;
  setScrollViewport: (scrollViewport: HTMLElement | null) => void;
  isPageReady: boolean;
  incrementReadySliceCount: () => void;
};

export const PageContext = createContext<PageContextData>({
  sliceCount: 0,
  setSliceCount: () => {},
  scrollViewport: null,
  setScrollViewport: () => {},
  isPageReady: false,
  incrementReadySliceCount: () => {},
});
