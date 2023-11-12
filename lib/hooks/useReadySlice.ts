import { useEffect } from 'react';

import { usePageContext } from '@/context/page';

export function useReadySlice() {
  const { incrementReadySliceCount } = usePageContext();

  useEffect(() => {
    incrementReadySliceCount();
  }, [incrementReadySliceCount]);
}
