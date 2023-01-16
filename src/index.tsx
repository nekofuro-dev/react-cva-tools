import { cva } from 'class-variance-authority';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  forwardRef,
} from 'react';
import {
  CvaParameters,
  CvaReturnType,
  FCRefType,
  WithCvaVariant,
} from './types';

type VariantsComponentPropsWithoutRef<
  ComponentType extends ElementType<any>,
  CvaType extends (...args: any) => any
> = WithCvaVariant<CvaType> & ComponentPropsWithoutRef<ComponentType>;

type VariantsComponentPropsWithRef<
  ComponentType extends ElementType<any>,
  CvaType extends (...args: any) => any
> = {
  ref?: FCRefType<ComponentType>;
} & VariantsComponentPropsWithoutRef<ComponentType, CvaType>;

/**
 * add VariantsProps of [customCva] to [component]
 */
export const withCva = <
  CvaOptionType,
  DefaultComponentType extends ElementType,
  CvaType extends CvaReturnType<CvaOptionType> = CvaReturnType<CvaOptionType>
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
export const withDefaultVariants = <C extends ReturnType<typeof withCva>>(
  component: C,
  defaultVariants: Parameters<C>[0]['variants']
) => {
  return forwardRef(<T,>(props: Parameters<C>[0], ref: FCRefType<C>) => {
    const finalVariants = {
      ...defaultVariants,
      ...props.variants,
    };
    const Component: ElementType = component;
    return <Component {...props} ref={ref} variants={finalVariants} />;
  }) as unknown as C;
};
