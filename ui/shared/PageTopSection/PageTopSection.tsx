import clsx from 'clsx';

import { Container } from '@/ui/shared/Container';
import { Section } from '@/ui/shared/Section';
import { Title } from '@/ui/shared/Title';
import HandLoveYouIcon from '@/ui/svg/HandLoveYouIcon.svg';
import HandsHeartIcon from '@/ui/svg/HandsHeartIcon.svg';

import { PageTopIcon } from '@/types';

type Props = {
  title: string;
  subtitle: string;
  iconType: PageTopIcon;
};

export function getIconComponent(type: PageTopIcon) {
  const icons: Record<PageTopIcon, any> = {
    none: null,
    handsHeart: HandsHeartIcon,
    handLoveYou: HandLoveYouIcon,
  };

  return icons[type] || null;
}

export function PageTopSection({ title, subtitle, iconType }: Props) {
  const Icon = getIconComponent(iconType);

  const renderIcon = () => {
    if (!Icon) {
      return null;
    }

    return (
      <span className="-mb-1 ml-3 inline-block h-page-top-icon w-page-top-icon">
        <Icon
          className={clsx('h-full w-full origin-bottom', {
            'animate-pulsing-hands-loop': iconType === 'handsHeart',
            'animate-rolling-hand-loop': iconType === 'handLoveYou',
          })}
        />
      </span>
    );
  };

  return (
    <Section spacingY={0}>
      <Container size={2}>
        <div className="text-adaptive">
          <header
            className={clsx([
              'relative h-page-top min-h-screen-2/3 md:min-h-screen-4/5',
              'flex h-full flex-col justify-center',
              'text-center',
            ])}
          >
            <div className="mb-8 md:mb-12">
              <Title component="h1" size="hero" fontWeight={700}>
                {title}
                {renderIcon()}
              </Title>
            </div>
            <div className="text-center">
              <Title
                className="text-ds-grey-700"
                component="span"
                size={6}
                fontWeight={400}
              >
                {subtitle}
              </Title>
            </div>
          </header>
        </div>
      </Container>
    </Section>
  );
}
