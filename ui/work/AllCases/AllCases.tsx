import clsx from 'clsx';

import { splitIntoColumns } from '@/lib/dataProcessing/splitIntoColumns';
import { withSectionParams } from '@/lib/hocs/withSectionParams';

import { CaseCard } from '@/ui/shared/CaseCard';
import { Container } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';

import { PreviewCase } from '@/types';

type Props = BasicSectionProps<{
  cases: PreviewCase[];
}>;

function AllCases({ spacingY, cases }: Props) {
  const casesColumns = splitIntoColumns<PreviewCase>(cases, 2);

  const renderGridItem = (caseData: PreviewCase, col: 0 | 1) => (
    <div
      className={clsx('mb-10 md:mb-24', {
        'md:last:mb-0': col === 0,
        'last:mb-0': col === 1,
      })}
      key={caseData.url}
    >
      <CaseCard
        key={caseData.url}
        title={caseData.name as string}
        subtitle={caseData.overview as string}
        url={caseData.url as string}
        image={caseData.coverImage}
      />
    </div>
  );

  return (
    <Section spacingY={spacingY}>
      <Container size={1}>
        <div className="grid-cols-2 gap-main md:grid">
          <div className="col-span-1 col-start-1">
            {casesColumns[0].map((caseData) => renderGridItem(caseData, 0))}
          </div>
          <div className="col-span-1 col-start-2 md:pt-30">
            {casesColumns[1].map((caseData) => renderGridItem(caseData, 1))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(AllCases);

export { WithSectionParams as AllCases };
