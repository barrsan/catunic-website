import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { PageContext } from './PageContext';

type Props = PropsWithChildren;

export function PageContextProvider({ children }: Props) {
  const [sliceCount, setSliceCount] = useState(0);
  const [readySliceCount, setReadySliceCount] = useState(0);
  const [isPageReady, setIsPageReady] = useState(false);
  const [scrollViewport, setScrollViewport] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    if (sliceCount > 0 && readySliceCount >= sliceCount) {
      setIsPageReady(true);
    }
  }, [readySliceCount, sliceCount]);

  const incrementReadySliceCount = useCallback(() => {
    setReadySliceCount((prev) => prev + 1);
  }, []);

  const contextValue = useMemo(
    () => ({
      sliceCount,
      setSliceCount,
      scrollViewport,
      setScrollViewport,
      isPageReady,
      incrementReadySliceCount,
    }),
    [incrementReadySliceCount, isPageReady, scrollViewport, sliceCount],
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}
