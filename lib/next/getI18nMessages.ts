import { EN_LOCALE } from '@/constants';

type ErrorHandler = () => never;

const handleError = () => {
  throw new Error('Fail load translations!');
};

export async function getI18nMessages(onError: ErrorHandler = handleError) {
  try {
    return (await import(`../../i18n/${EN_LOCALE}.json`)).default;
  } catch (error) {
    return onError();
  }
}
