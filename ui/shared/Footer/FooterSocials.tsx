import { memo } from 'react';
import { asLinkAttrs } from '@prismicio/client';
import clsx from 'clsx';

import BehanceIcon from '@/ui/svg/BehanceIcon.svg';
import DribbbleIcon from '@/ui/svg/DribbbleIcon.svg';
import InstagramIcon from '@/ui/svg/InstagramIcon.svg';
import LinkedInIcon from '@/ui/svg/LinkedInIcon.svg';
import TelegramIcon from '@/ui/svg/TelegramIcon.svg';

import { SocialLinkType, SocialLinkWithSocialAccount } from '@/types';

type Props = {
  socialLinks: SocialLinkWithSocialAccount[];
};

function getSocialIconComponent(type: SocialLinkType) {
  const socialIcons = {
    [SocialLinkType.TELEGRAM]: TelegramIcon,
    [SocialLinkType.INSTAGRAM]: InstagramIcon,
    [SocialLinkType.BEHANCE]: BehanceIcon,
    [SocialLinkType.DRIBBBLE]: DribbbleIcon,
    [SocialLinkType.LINKED_IN]: LinkedInIcon,
  };

  return socialIcons[type] || null;
}

function FooterSocials({ socialLinks }: Props) {
  return (
    <div
      className={clsx([
        'relative',
        'flex flex-row flex-wrap justify-center',
        'gap-x-4',
      ])}
    >
      {socialLinks.map((socialLink) => {
        const iconType = socialLink.socialAccount.data.type as SocialLinkType;
        const Icon = getSocialIconComponent(iconType);
        const { href } = asLinkAttrs(socialLink.socialAccount.data.url);

        return (
          <a
            className="group block"
            key={socialLink.socialAccount.uid}
            target="_blank"
            href={href}
          >
            <span
              className={clsx([
                'relative flex h-11 w-11 items-center justify-center',
                'after:absolute after:left-0 after:top-0 after:z-10 after:h-full after:w-full',
                'after:rounded-1/2 after:bg-white',
                'after:transition-transform after:duration-300',
                'after:origin-center after:scale-0',
                'group-hover:after:scale-100',
              ])}
            >
              <span className="relative z-20">
                <Icon
                  className={clsx([
                    iconType === SocialLinkType.BEHANCE ? 'h-8 w-8' : 'h-6 w-6',
                    'fill-white',
                    'transition-fill duration-500 group-hover:fill-ds-grey-900',
                  ])}
                />
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

const MemoizedFooterSocials = memo(FooterSocials);

export { MemoizedFooterSocials as FooterSocials };
