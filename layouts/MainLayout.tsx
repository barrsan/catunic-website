import { PropsWithChildren } from 'react';

import { Footer } from '@/ui/shared/Footer';
import { PageScroll } from '@/ui/shared/PageScroll';

import { PageProps } from '@/types';

type Props = PropsWithChildren<
  Pick<PageProps, 'pageKey' | 'footerData' | 'socialLinks' | 'contactEmail'>
>;

export function MainLayout({
  pageKey,
  children,
  footerData,
  socialLinks,
  contactEmail,
}: Props) {
  const ctaTextRows: [string, string] = [
    footerData.ctaRow1 as string,
    footerData.ctaRow2 as string,
  ];

  return (
    <PageScroll pageKey={pageKey}>
      <main>{children}</main>
      <Footer
        ctaTextRows={ctaTextRows}
        ctaButtonText={footerData.ctaButtonText as string}
        ctaButtonFontSize={footerData.ctaButtonFontSize as number}
        ctaButtonFontSizeSafari={footerData.ctaButtonFontSizeSafari as number}
        socialLinks={socialLinks}
        contactEmail={contactEmail}
      />
    </PageScroll>
  );
}
