import { memo } from 'react';
import { useTranslations } from 'next-intl';

import { BasicLink } from '@/ui/shared/BasicLink';

import { SocialLinkWithSocialAccount } from '@/types';

import { FooterSocials } from './FooterSocials';

type Props = {
  contactEmail: string;
  socialLinks: SocialLinkWithSocialAccount[];
};

function FooterContacts({ contactEmail, socialLinks }: Props) {
  const t = useTranslations('Common');

  return (
    <div className="flex flex-col justify-center gap-y-8 text-center">
      <FooterSocials socialLinks={socialLinks} />
      <div>
        <BasicLink isDark href={`mailto:${contactEmail}`}>
          {contactEmail}
        </BasicLink>
      </div>
      <div className="text-secondary-xs">
        {t('copyright', { year: new Date().getFullYear() })}
      </div>
    </div>
  );
}

const MemoizedFooterContacts = memo(FooterContacts);

export { MemoizedFooterContacts as FooterContacts };
