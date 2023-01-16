import type { VariantProps, cva as _cva } from 'class-variance-authority';
import { ComponentPropsWithRef, ElementType } from 'react';

// ref: https://github.com/microsoft/TypeScript/issues/42873
// The inferred type of "X" cannot be named without a reference to "Y". This is likely not portable. A type annotation is necessary.
export type _VariantProps<T extends (...args: any) => any> = VariantProps<T>;
export type CvaReturnType<VariantsType> = ReturnType<typeof _cva<VariantsType>>;
export type CvaParameters<VariantsType> = Parameters<typeof _cva<VariantsType>>;

export type WithCvaVariant<
  T extends (...args: any) => any = (...args: any) => any
> = {
  variants?: _VariantProps<T>;
};
export type FCRefType<T extends ElementType> = ComponentPropsWithRef<T>['ref'];
