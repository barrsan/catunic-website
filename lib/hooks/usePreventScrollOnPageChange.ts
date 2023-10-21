import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function usePreventScrollOnPageChange() {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState((state) => {
      // eslint-disable-next-line no-param-reassign
      state.options.scroll = false;
      return true;
    });
  }, [router]);
}
