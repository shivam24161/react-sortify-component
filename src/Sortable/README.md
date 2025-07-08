# React Sortable Component

A customizable, touch-friendly sortable component for React.

## Installation

```bash
npm install react-sortify-component
# or
yarn add react-sortify-component
```

## Usage

```tsx
import React, { useState } from 'react';
import Sortable, { sortableArray } from 'react-sortify-component';
import 'react-sortify-component/dist/Sortable.css';

const initialData = [
  { id: 1, content: <div>Item 1</div> },
  { id: 2, content: <div>Item 2</div> },
  { id: 3, content: <div>Item 3</div> },
];

export default function Example() {
  const [data, setData] = useState<sortableArray>(initialData);

  return (
    <Sortable
      data={data}
      onChange={setData}
    />
  );
}
```

## Props

| Name               | Type                                | Default   | Description                                 |
|--------------------|-------------------------------------|-----------|---------------------------------------------|
| data               | `sortableArray`                     | required  | Array of items to sort                      |
| onChange           | `(newData: sortableArray) => void`  | required  | Called when order changes                   |
| animationDuration  | `number`                            | 300       | Animation duration in ms                    |
| customClass        | `string`                            |           | Custom class for container                  |
| isSortable         | `boolean`                           | true      | Enable/disable sorting                      |
| dragHandle         | `React.ReactNode`                   |           | Custom drag handle                          |
| sortableItemClass  | `string`                            |           | Custom class for sortable items             |

## License

MIT 