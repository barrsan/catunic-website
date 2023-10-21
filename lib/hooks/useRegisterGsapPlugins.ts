import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useSsr } from 'usehooks-ts';

import { registerGsapPlugins } from '@/lib/registerGsapPlugins';

export function useRegisterGsapPlugins() {
  const { isBrowser } = useSsr();

  useIsomorphicLayoutEffect(() => {
    if (isBrowser) {
      registerGsapPlugins();
    }
  }, [isBrowser]);
}
