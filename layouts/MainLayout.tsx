import { PropsWithChildren, useEffect } from 'react';

import { usePageContext } from '@/context/page';

import { Footer } from '@/ui/shared/Footer';
import { PageScroll } from '@/ui/shared/PageScroll';

import { PageProps } from '@/types';

type Props = PropsWithChildren<
  {
    sectionsCount: number;
  } & Pick<PageProps, 'pageKey' | 'footerData' | 'socialLinks' | 'contactEmail'>
>;

export function MainLayout({
  pageKey,
  children,
  footerData,
  socialLinks,
  contactEmail,
  sectionsCount,
}: Props) {
  const ctaTextRows: [string, string] = [
    footerData.ctaRow1 as string,
    footerData.ctaRow2 as string,
  ];

  const { setSliceCount } = usePageContext();

  useEffect(() => {
    setSliceCount(sectionsCount);
  }, [sectionsCount, setSliceCount]);

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
