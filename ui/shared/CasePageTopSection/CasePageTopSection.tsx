import clsx from 'clsx';

import { Container } from '@/ui/shared/Container';
import { Section } from '@/ui/shared/Section';
import { Title } from '@/ui/shared/Title';

type Props = {
  title: string;
  subtitle: string;
};

export function CasePageTopSection({ title, subtitle }: Props) {
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
              <Title component="h1" size={1} fontWeight={700}>
                {title}
              </Title>
            </div>
            <div className="text-center">
              <Title component="span" size={6} fontWeight={400}>
                {subtitle}
              </Title>
            </div>
          </header>
        </div>
      </Container>
    </Section>
  );
}
