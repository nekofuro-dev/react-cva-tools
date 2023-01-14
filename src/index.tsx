import { cva } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/dist/types';
import React, {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  ReactElement,
  forwardRef,
} from 'react';
import {
  CvaParameters,
  CvaReturnType,
  WithCvaVariant,
  FCRefType,
} from './types';

type VariantsComponentPropsWithoutRef<
  ComponentType extends ElementType<any>,
  CvaType extends (...args: any) => any
> = ComponentPropsWithoutRef<ComponentType> & WithCvaVariant<CvaType>;

type VariantsComponentPropsWithRef<
  ComponentType extends ElementType<any>,
  CvaType extends (...args: any) => any
> = VariantsComponentPropsWithoutRef<ComponentType, CvaType> & {
  ref?: FCRefType<ComponentType>;
};

/**
 * add VariantsProps of [customCva] to [component]
 */
export const withCva = <
  VariantsType,
  DefaultComponentType extends ElementType,
  CvaType extends CvaReturnType<VariantsType> = CvaReturnType<VariantsType>
>(
  component: DefaultComponentType,
  customCva: CvaType
) => {
  const variantsFc = <ComponentType extends ElementType = DefaultComponentType>(
    props: VariantsComponentPropsWithoutRef<ComponentType, CvaType> & {
      as?: ComponentType;
    },
    ref: FCRefType<ComponentType>
  ) => {
    const { variants, as, ...componentProps } = props;
    const Component: ElementType | JSX.IntrinsicElements = as ?? component;
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
  };
  return forwardRef(variantsFc) as <
    T extends ElementType = DefaultComponentType
  >(
    p: VariantsComponentPropsWithRef<T, CvaType> & {
      as?: T;
    }
  ) => ReactElement;
};

export const withVariants = <VariantsType, ComponentType extends ElementType>(
  component: ComponentType,
  ...cvaArgs: CvaParameters<VariantsType>
) => {
  const customCva = cva<VariantsType>(...cvaArgs);
  return withCva<VariantsType, ComponentType>(component, customCva);
};

/**
 * add default variants to [component]
 */
export const withDefaultVariants = <
  ComponentType extends FC<WithCvaVariant>,
  RefType
>(
  component: ComponentType,
  defaultVariants: ComponentPropsWithoutRef<ComponentType>['variants'] &
    ClassProp
) => {
  return forwardRef<RefType, ComponentPropsWithoutRef<ComponentType>>(
    (props, ref) => {
      const variants = {
        ...defaultVariants,
        ...props.variants,
      };
      const Component: ElementType | JSX.IntrinsicElements = component;
      return <Component ref={ref} {...props} variants={variants} />;
    }
  );
};
