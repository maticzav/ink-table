# ink-table

[![Build Status](https://travis-ci.org/maticzav/ink-table.svg?branch=master)](https://travis-ci.org/maticzav/ink-table)
[![npm version](https://badge.fury.io/js/ink-table.svg)](https://badge.fury.io/js/ink-table)

> A table component for [Ink](https://github.com/vadimdemedes/ink).

## Install

```bash
npm install ink-table
```

## Usage

```jsx
import Table from 'ink-table'

const data = [
  {
    name: "Sosa Saunders",
    gender: "male",
    age: 17,
    email: "sosa.saunders@mail.com",
    phone: "+1 (809) 435-2786"
  },
  {
    name: "Angelina Kirk",
    gender: "female",
    age: 3,
    email: "angelina@kirk.io",
    phone: "+1 (870) 567-3516"
  },
  {
    name: "Bradford Rosales",
    gender: "male",
    age: 20,
    email: "bradfordrosales@fast.com",
    phone: "+1 (918) 573-3240"
  },
  {
    name: "Gwen Schroeder",
    gender: "female",
    age: 17,
    email: "gwen@corp.xyz",
    phone: "+1 (987) 417-2062"
  },
  {
    name: "Ellison Mann",
    gender: "male",
    age: 5,
    email: "ellisonmann@katakana.com",
    phone: "+1 (889) 411-2186"
  }
];

const Basic = () => (
  <Table data={data} />
);

render(<Basic />);
```

<img src="media/demo.png" width="720">

## Props

### data `array<object>`

> List of all the values (rows).

### padding `number`

> Offset inside each cell. This is considered one side value (set to 2 will have 2 spaces on the left and on the right - 4 combined).

### header `({children}) => h`

> A component used as header cell. Value is passed as `children` prop.
> _(Recommend using `<Color/>` with `chalk` props.)_

### cell `({children}) => h`

> A component used as regular cell. Value is passed as `children` prop.
> _(Recommend using `<Color/>` with `chalk` props.)_

### skeleton `({children}) => h`

> A component used as skeleton (lines and crosses ...). Value is passed as `children` prop.
> _(Recommend using `<Color/>` with `chalk` props.)_

## License

MIT © [Matic Zavadlal](http://github.com/maticzav)
