import { useRef } from 'react';
import { asLinkAttrs } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';
import { motion, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useScrollProxy } from '@/lib/hooks/useScrollProxy';

import { BasicLink } from '@/ui/shared/BasicLink';
import { Title } from '@/ui/shared/Title';
import ArrowRightIcon from '@/ui/svg/ArrowRightIcon.svg';
import ArrowUpRightIcon from '@/ui/svg/ArrowUpRightIcon.svg';

import { ExperienceItem } from '@/types';

type Props = {
  name: ExperienceItem['projectName'];
  link: ExperienceItem['projectLink'];
  description: ExperienceItem['projectDescription'];
};

export function ExperienceProject({ name, description, link }: Props) {
  const projectRef = useRef(null);

  const t = useTranslations('Common');

  const { scrollYProgress } = useScrollProxy({
    target: projectRef,
    offsetStart: 'top bottom',
    offsetEnd: 'bottom top',
  });

  const y = useTransform(scrollYProgress, [0, 0.3], ['30%', '0%']);

  const renderLink = () => {
    const linkAttrs = asLinkAttrs(link);

    if (!linkAttrs.href) {
      return null;
    }

    const isExternalLink = link.link_type === 'Web';
    const title = isExternalLink ? t('viewProject') : t('viewCase');
    const Icon = isExternalLink ? ArrowUpRightIcon : ArrowRightIcon;

    return (
      <div className="text-right">
        <BasicLink
          className="pb-1 text-secondary"
          href={linkAttrs.href}
          underlineDirection="left"
          hasBlank={isExternalLink}
        >
          {title}
          <Icon className="ml-2 inline-block h-4.5 w-4.5 fill-ds-grey-900" />
        </BasicLink>
      </div>
    );
  };

  return (
    <motion.div ref={projectRef} style={{ y }}>
      <div className="mb-4 md:mb-6">
        <Title component="h6" size={5}>
          {name}
        </Title>
      </div>
      <div className="prose mb-4 md:mb-6">
        <PrismicRichText field={description} />
      </div>
      {renderLink()}
    </motion.div>
  );
}
