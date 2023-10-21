import { createContext } from 'react';

type PageContextData = {
  scrollViewport?: HTMLElement | null;
  setScrollViewport: (scrollViewport: HTMLElement | null) => void;
};

export const PageContext = createContext<PageContextData>({
  scrollViewport: null,
  setScrollViewport: () => {},
});
