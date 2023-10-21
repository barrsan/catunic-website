import { useUserAgent } from '@oieduardorabelo/use-user-agent';
import { useSsr } from 'usehooks-ts';

const enum Os {
  IOS = 'iOS',
  ANDROID = 'Android',
}

export function useDetectMobileDevice() {
  const { isBrowser } = useSsr();

  const agentDetails = useUserAgent(
    isBrowser ? window.navigator.userAgent : '',
  );

  if (
    agentDetails?.os.name === Os.IOS ||
    agentDetails?.os.name === Os.ANDROID
  ) {
    return true;
  }

  return false;
}
