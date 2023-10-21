import Script from 'next/script';

import { usePreventScrollOnPageChange } from '@/lib/hooks/usePreventScrollOnPageChange';

export function PreventScrollRestorationScript() {
  usePreventScrollOnPageChange();

  return (
    <Script id="manual-scroll-restoration-script">
      {`window.history.scrollRestoration = "manual";`}
    </Script>
  );
}
