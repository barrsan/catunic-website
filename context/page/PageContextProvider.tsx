import { PropsWithChildren, useMemo, useState } from 'react';

import { PageContext } from './PageContext';

type Props = PropsWithChildren;

export function PageContextProvider({ children }: Props) {
  const [scrollViewport, setScrollViewport] = useState<HTMLElement | null>(
    null,
  );

  const contextValue = useMemo(
    () => ({
      scrollViewport,
      setScrollViewport,
    }),
    [scrollViewport],
  );

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}
