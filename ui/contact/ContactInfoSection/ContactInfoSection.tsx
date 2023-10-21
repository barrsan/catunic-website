import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { BasicLink } from '@/ui/shared/BasicLink';
import { CommonImage } from '@/ui/shared/CommonImage';
import { Container } from '@/ui/shared/Container';
import { Section } from '@/ui/shared/Section';
import { Title } from '@/ui/shared/Title';

import { ImageData, SocialLinkWithSocialAccount } from '@/types';

import { ContactInfoSocials } from './ContactInfoSocials';

type Props = {
  imageData: ImageData;
  title: string;
  contactEmail: string;
  socialLinks: SocialLinkWithSocialAccount[];
};

export function ContactInfoSection({
  contactEmail,
  socialLinks,
  title,
  imageData,
}: Props) {
  const t = useTranslations('Common');

  return (
    <Section className="min-h-screen" spacingY={[3, 2]}>
      <Container size={2}>
        <div className="flex w-full grid-cols-6 flex-col gap-x-main-lg md:grid">
          <div className="col-span-4 col-start-1 mb-10 md:mb-0">
            <div
              className={clsx([
                'h-24 w-24 md:h-40 md:w-40',
                'mx-auto md:mx-0',
                'mb-4 md:mb-10',
                'bg-ds-pink overflow-hidden rounded-full',
              ])}
            >
              <CommonImage
                imageData={imageData}
                mode="square"
                hasParallax={false}
              />
            </div>
            <Title
              className="mb-4 whitespace-pre-line text-center md:mb-10 md:text-left"
              component="h1"
              size={2}
            >
              {title}
            </Title>
            <div className="text-center md:text-left">
              <BasicLink href={`mailto:${contactEmail}`}>
                {contactEmail}
              </BasicLink>
            </div>
          </div>
          <div className="col-span-1 col-start-6 mx-auto text-center md:mx-0 md:text-left">
            <Title
              className="mb-6 md:mb-8"
              component="h5"
              size={5}
              fontWeight={600}
            >
              {t('socials')}
            </Title>
            <ContactInfoSocials socialLinks={socialLinks} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
