import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMetrica } from 'next-yandex-metrica';

export function useRouteChangeAnalytics() {
  const { ymEvent } = useMetrica();
  const router = useRouter();

  useEffect(() => {
    const handleChangeComplete = () => {
      ymEvent('hit', router.route);
    };

    router.events.on('routeChangeComplete', handleChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleChangeComplete);
    };
  }, [router.events, router.route, ymEvent]);
}
