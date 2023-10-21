import { asLinkAttrs } from '@prismicio/client';
import clsx from 'clsx';

import { SocialLinkWithSocialAccount } from '@/types';

type Props = {
  socialLinks: SocialLinkWithSocialAccount[];
};

export function ContactInfoSocials({ socialLinks }: Props) {
  return (
    <ul className="flex flex-col gap-y-4">
      {socialLinks.map((socialLink) => {
        const { href } = asLinkAttrs(socialLink.socialAccount.data.url);
        const name = socialLink.socialAccount.data.serviceName;

        return (
          <li key={socialLink.socialAccount.data.type}>
            <a className="group block" href={href} target="_blank">
              <span className="relative block overflow-hidden">
                <span
                  className={clsx([
                    'relative block',
                    'before:absolute before:left-0 before:top-0 before:w-full',
                    'before:text-ds-grey-900 before:content-[attr(data-text)]',
                    'after:absolute after:left-0 after:top-[105%] after:w-full',
                    'after:text-ds-grey-900 after:content-[attr(data-text)]',
                    'duration-500 group-hover:-translate-y-[105%]',
                  ])}
                  data-text={name}
                >
                  {name}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
