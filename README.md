# React cva tools

Add cva's `VariantProps` to existing react components

# Acknowledgements

## [joe-bell/cva](https://github.com/joe-bell/cva)

Thank you for making `cva` (Class Variance Authority).

# Installation

#### Using npm

```
npm i class-variance-authority react-cva-tools
```

#### Using yarn

```
yarn add class-variance-authority react-cva-tools
```

# Examples

## withVariants

```ts
withVariants(component: React.ElementType, ...cvaArgs: Parameters<typeof cva>)
```

create a `Button` component with 'button'

```tsx
// components/Button.tsx
export const Button = withVariants('button', ['btn', 'font-bold'], {
  variants: {
    intent: {
      primary: 'bg-blue-700 hover:bg-blue-800 text-gray-100',
    },
    padding: {
      small: '',
      medium: 'py-1 px-2',
    },
    round: {
      small: 'rounded-sm',
      medium: 'rounded',
      full: 'rounded-full',
    },
    shadow: {
      medium: 'shadow',
    },
  },
  defaultVariants: {
    padding: 'medium',
    round: 'medium',
    shadow: 'medium',
  },
});
```

### Usage:

```tsx
<Button
  id="a-btn"
  className="test-btn"
  variants={{
    intent: 'primary',
  }}
  onClick={(e) => {
    alert('Click!!');
  }}
>
  click
</Button>
```

```html
<button
  id="a-btn"
  class="btn font-bold bg-blue-700 hover:bg-blue-800 text-gray-100 py-1 px-2 rounded shadow test-btn"
>
  click
</button>
```

### We can add variants to custom components too

```tsx
export const Box: FC<ComponentPropsWithoutRef<'div'>> = ({ ...props }) => (
  <div {...props} />
);

export const FlexBox = withVariants(Box, null, {
  variants: {
    flex: {
      row: 'flex flex-row',
    },
  },
});
```

## withDefaultVariants

create a `CircleButton` by passing default variants parameters to `Button`

```tsx
import { Button } from '@components/Button';

export const CircleButton = withDefaultVariants(Button, {
  round: 'full',
  className: 'w-12 h-12',
});
```

### Usage

```tsx
<CircleButton className="test" />
```

```html
<button
  class="btn font-bold py-1 px-2 rounded-full shadow test w-12 h-12"
></button>
```

## withCva

create a `Button` component with cva. The result is the same as using `withVariants`

```tsx
const buttonCva = cva(['btn', 'font-bold'], {
  variants: {
    intent: {
      primary: 'bg-blue-700 hover:bg-blue-800 text-gray-100',
    },
    padding: {
      small: '',
      medium: 'py-1 px-2',
    },
    round: {
      small: 'rounded-sm',
      medium: 'rounded',
      full: 'rounded-full',
    },
    shadow: {
      medium: 'shadow',
    },
  },
  defaultVariants: {
    padding: 'medium',
    round: 'medium',
    shadow: 'medium',
  },
});

export const Button = withCva('button', buttonCva);
```

### Usage:

```tsx
<Button
  id="a-btn"
  className="test-btn"
  variants={{
    intent: 'primary',
  }}
  onClick={(e) => {
    alert('Click!!');
  }}
>
  click
</Button>
```

```html
<button
  id="a-btn"
  class="btn font-bold bg-blue-700 hover:bg-blue-800 text-gray-100 py-1 px-2 rounded shadow test-btn"
>
  click
</button>
```
