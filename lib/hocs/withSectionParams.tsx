import { ComponentType } from 'react';

import { createSectionPadding } from '@/lib/dataProcessing/createSectionPadding';

import { BasicSectionProps } from '@/ui/shared/Section';

type WithSectionParamsProps<T> = T & {
  spacingTop: string;
  spacingBottom?: string;
};

type Props = BasicSectionProps;

export function withSectionParams<T extends Props>(
  WrappedComponent: ComponentType<Omit<T, 'spacingTop' | 'spacingBottom'>>,
) {
  return function WithSectionParams({
    spacingTop,
    spacingBottom,
    ...restProps
  }: WithSectionParamsProps<T>) {
    const spacingY = createSectionPadding(spacingTop, spacingBottom);

    return <WrappedComponent spacingY={spacingY} {...restProps} />;
  };
}
