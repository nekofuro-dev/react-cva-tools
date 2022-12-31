import type { cva as _cva, VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React, { ComponentPropsWithoutRef, FC } from 'react';

// ref: https://github.com/microsoft/TypeScript/issues/42873
// The inferred type of "X" cannot be named without a reference to "Y". This is likely not portable. A type annotation is necessary.
type _VariantProps<T extends (...args: any) => any> = VariantProps<T>;
type CvaReturnType<VariantsType> = ReturnType<typeof _cva<VariantsType>>;
type CvaParameters<VariantsType> = Parameters<typeof _cva<VariantsType>>;

export type WithCvaVariant<
  T extends (...args: any) => any = (...args: any) => any
> = {
  variants?: _VariantProps<T>;
};

/**
 * add VariantsProps of [customCva] to [component]
 */
export const withCva = <
  VariantsType,
  ComponentType extends React.ElementType,
  RefType,
  CvaType extends CvaReturnType<VariantsType> = CvaReturnType<VariantsType>
>(
  component: ComponentType,
  customCva: CvaType
) => {
  return React.forwardRef<
    RefType,
    WithCvaVariant<CvaType> &
      Omit<
        ComponentPropsWithoutRef<ComponentType>,
        keyof WithCvaVariant<CvaType>
      >
  >((props, ref) => {
    const Component: React.ElementType | JSX.IntrinsicElements = component;
    const { variants, ...componentProps } = props;
    const cvaParams: any = {
      ...variants,
      class: componentProps.className,
    };
    return (
      <Component
        {...componentProps}
        className={customCva(cvaParams)}
        ref={ref}
      />
    );
  });
};

export const withVariants = <
  VariantsType,
  ComponentType extends React.ElementType,
  RefType
>(
  component: ComponentType,
  ...cvaArgs: CvaParameters<VariantsType>
) => {
  const customCva = cva<VariantsType>(...cvaArgs);
  return withCva<VariantsType, ComponentType, RefType>(component, customCva);
};

/**
 * add default variants to [component]
 */
export const withDefaultVariants = <
  ComponentType extends FC<WithCvaVariant>,
  RefType
>(
  component: ComponentType,
  defaultVariants: ComponentPropsWithoutRef<ComponentType>['variants']
) => {
  return React.forwardRef<RefType, ComponentPropsWithoutRef<ComponentType>>(
    (props, ref) => {
      const variants = {
        ...defaultVariants,
        ...props.variants,
      };
      const Component: React.ElementType | JSX.IntrinsicElements = component;
      return <Component ref={ref} {...props} variants={variants} />;
    }
  );
};
