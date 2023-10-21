import { PropsWithChildren } from 'react';

import { PageScroll } from '@/ui/shared/PageScroll';

import { PageProps } from '@/types';

type Props = PropsWithChildren<Pick<PageProps, 'pageKey'>>;

export function ErrorLayout({ pageKey, children }: Props) {
  return (
    <PageScroll pageKey={pageKey}>
      <main>{children}</main>
    </PageScroll>
  );
}
