import Link from 'next/link';
import { asLinkAttrs } from '@prismicio/client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Title } from '@/ui/shared/Title';
import BehanceIcon from '@/ui/svg/BehanceIcon.svg';
import DribbbleIcon from '@/ui/svg/DribbbleIcon.svg';
import InstagramIcon from '@/ui/svg/InstagramIcon.svg';
import LinkIcon from '@/ui/svg/LinkIcon.svg';
import TelegramIcon from '@/ui/svg/TelegramIcon.svg';

import { SocialLinkType } from '@/types';
import { NewsFeedPost } from '@/types/newsFeed';

import { CommonImage } from '../CommonImage';

type Props = Pick<
  NewsFeedPost,
  'title' | 'image' | 'sourceLink' | 'sourceName' | 'socialAccount'
>;

type SocialIcon = {
  icon: any;
  colorClassName: string;
};

type SocialIconsMap = {
  [K in SocialLinkType]?: SocialIcon;
};

function getIcon(type: SocialLinkType): SocialIcon {
  const socialIcons: SocialIconsMap = {
    [SocialLinkType.TELEGRAM]: {
      icon: TelegramIcon,
      colorClassName: 'fill-brand-telegram',
    },
    [SocialLinkType.INSTAGRAM]: {
      icon: InstagramIcon,
      colorClassName: 'fill-brand-instagram',
    },
    [SocialLinkType.BEHANCE]: {
      icon: BehanceIcon,
      colorClassName: 'fill-brand-behance',
    },
    [SocialLinkType.DRIBBBLE]: {
      icon: DribbbleIcon,
      colorClassName: 'fill-brand-dribbble',
    },
  };

  return (
    socialIcons[type] ?? {
      icon: LinkIcon,
      colorClassName: 'fill-ds-grey-900',
    }
  );
}

export function NewsFeedCard({
  title,
  image,
  sourceLink,
  sourceName,
  socialAccount,
}: Props) {
  const t = useTranslations('Common');

  const { href, target } = asLinkAttrs(sourceLink);

  const renderSource = () => {
    const { icon: Icon, colorClassName } = getIcon(
      socialAccount?.data.type as SocialLinkType,
    );

    const label = sourceName || socialAccount?.data.name;

    return (
      <div className="flex flex-row items-center gap-2">
        <Icon
          className={clsx([
            socialAccount?.data.type === SocialLinkType.BEHANCE
              ? 'h-6 w-6'
              : 'h-5 w-5',
            colorClassName,
          ])}
        />
        {label}
      </div>
    );
  };

  return (
    <div className="w-full" data-mf={t('mouseFollower.drag')}>
      <Link href={href || '#'} scroll={false} target={target || '_self'}>
        <div className="mb-2 aspect-square h-full w-full overflow-hidden rounded-main-sm">
          <CommonImage
            className="object-center"
            imageData={image}
            mode="square"
            isFill
            hasParallax={false}
          />
        </div>
        <Title className="mb-2" component="div" size={6} fontWeight={500}>
          {title}
        </Title>
        <div className="text-secondary-sm">{renderSource()}</div>
      </Link>
    </div>
  );
}
