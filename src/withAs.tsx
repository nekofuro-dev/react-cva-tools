import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from 'react';
import { FCRefType } from './types';

interface WithAs<T extends ElementType> {
  as?: T;
}

export type AsComponentPropsWithoutRef<T extends ElementType> =
  ComponentPropsWithoutRef<T> & WithAs<T>;

type AsComponentPropsWithRef<T extends ElementType> =
  AsComponentPropsWithoutRef<T> & {
    ref?: FCRefType<T>;
  };

export const withAs = <DefaultComponentType extends ElementType>(
  component: DefaultComponentType
) => {
  const withAsFc = <
    T extends ElementType<any> = DefaultComponentType,
    RefType extends FCRefType<T> = FCRefType<T>
  >(
    { as, ...props }: AsComponentPropsWithoutRef<T>,
    ref: RefType
  ) => {
    const FinalComponent: ElementType = as ?? component;
    return <FinalComponent ref={ref} {...props} />;
  };

  return React.forwardRef(withAsFc) as <
    T extends ElementType<any> = DefaultComponentType
  >(
    p: AsComponentPropsWithRef<T>
  ) => ReactElement;
};
