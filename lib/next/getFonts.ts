import { Poppins } from 'next/font/google';

export const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  fallback: [
    'system-ui',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
});
