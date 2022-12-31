# Installation

#### Using npm

```
npm i class-variance-authority react-cva-tools
```

#### Using yarn

```
yarn add class-variance-authority react-cva-tools
```

# Usage

Create a button

```tsx
// components/button.tsx
import { withVariants } from 'react-cva-tools';

export const Button = withVariants('button', 'btn', {
  variants: {
    intent: {
      primary: 'bg-primary text-on-primary',
    },
    round: {
      small: 'rounded-sm',
      normal: 'rounded',
    },
  },
  defaultVariants: {
    rounded: 'normal',
  },
});
```

```tsx
<Button
  id="btn"
  className="my-btn"
  onClick={(e) => {
    // ...
  }}
  variants={{
    intent: 'primary',
    round: 'small',
  }}
>
  click me
</Button>
// => <button id="btn" class="my-btn bg-primary text-on-primary rounded-sm">click me</button>
```
