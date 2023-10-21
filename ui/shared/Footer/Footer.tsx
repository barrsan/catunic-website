import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { Container } from '@/ui/shared/Container';

import { SocialLinkWithSocialAccount } from '@/types';

import { FooterContacts } from './FooterContacts';
import { FooterCta } from './FooterCta';

type Props = {
  ctaTextRows: [string, string];
  ctaButtonText: string;
  ctaButtonFontSize: number;
  ctaButtonFontSizeSafari: number;
  socialLinks: SocialLinkWithSocialAccount[];
  contactEmail: string;
};

export function Footer({
  ctaTextRows,
  contactEmail,
  ctaButtonText,
  ctaButtonFontSize,
  ctaButtonFontSizeSafari,
  socialLinks,
}: Props) {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScrollProxy({
    target: footerRef,
    offsetStart: 'top bottom',
    offsetEnd: 'top 10%',
  });

  const yInner = useTransform(scrollYProgress, [0, 1], ['-25%', '0%']);
  const y = useTransform(scrollYProgress, [0, 0.8], ['-20%', '0%']);

  return (
    <footer ref={footerRef} className="overflow-hidden bg-ds-grey-900">
      <motion.div style={{ y: yInner }}>
        <Container size={2} className=" py-30 pb-35 text-white">
          <motion.div style={{ y }}>
            <div className="mb-20 md:mb-25">
              <FooterCta
                ctaTextRows={ctaTextRows}
                ctaButtonText={ctaButtonText}
                ctaButtonFontSize={ctaButtonFontSize}
                ctaButtonFontSizeSafari={ctaButtonFontSizeSafari}
                contactEmail={contactEmail}
              />
            </div>
            <FooterContacts
              contactEmail={contactEmail}
              socialLinks={socialLinks}
            />
          </motion.div>
        </Container>
      </motion.div>
    </footer>
  );
}
