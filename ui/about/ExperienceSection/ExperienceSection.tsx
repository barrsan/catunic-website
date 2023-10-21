import { withSectionParams } from '@/lib/hocs/withSectionParams';

import { Container } from '@/ui/shared/Container';
import { BasicSectionProps, Section } from '@/ui/shared/Section';
import { Title } from '@/ui/shared/Title';

import { ExperienceItem } from '@/types';

import { ExperienceProject } from './ExperienceProject';

type Props = BasicSectionProps<{
  title: string;
  projects: ExperienceItem[];
}>;

function ExperienceSection({ title, projects, spacingY }: Props) {
  return (
    <Section spacingY={spacingY}>
      <Container
        className="grid grid-cols-1 gap-x-main md:grid-cols-2"
        size={2}
      >
        <div>
          <div className="relative top-0 mb-10 md:sticky md:top-20">
            <Title component="h2" size={2} isAnimated>
              {title}
            </Title>
          </div>
        </div>
        <div>
          <ul className="list-none">
            {projects.map((project) => (
              <li
                key={project.projectName}
                className="mb-10 last:mb-0 md:mb-20"
              >
                <ExperienceProject
                  name={project.projectName as string}
                  link={project.projectLink}
                  description={project.projectDescription}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

const WithSectionParams = withSectionParams<Props>(ExperienceSection);

export { WithSectionParams as ExperienceSection };
