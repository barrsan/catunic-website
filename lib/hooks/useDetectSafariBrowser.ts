import { useUserAgent } from '@oieduardorabelo/use-user-agent';
import { useSsr } from 'usehooks-ts';

export function useDetectSafariBrowser() {
  const { isBrowser } = useSsr();

  const agentDetails = useUserAgent(
    isBrowser ? window.navigator.userAgent : '',
  );

  return agentDetails?.browser.name === 'Safari';
}
