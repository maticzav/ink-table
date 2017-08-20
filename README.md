# ink-table [![Build Status](https://travis-ci.org/maticzav/ink-table.svg?branch=master)](https://travis-ci.org/maticzav/ink-table)
> A table component for [Ink](https://github.com/vadimdemedes/ink).

## Install

```
$ npm install ink-table
```

## Usage

```jsx
const data = [
  {name: 'Sosa Saunders', gender: 'male', age: 17, email: 'random@random.com'},
  {name: 'Angelina Kirk', gender: 'female', age: 3, email: 'random@random.com'},
  {name: 'Bradford Rosales', gender: 'male', age: 20, email: 'random@random.com'},
  {name: 'Gwen Schroeder', gender: 'female', age: 17, email: 'random@random.com'}
]

const config = {
  padding: 3,
  crosses: {
    mid: '$'
  }
}

const Basic = () => (
  <Table data={data} config={config}/>
)

render(<Basic/>)
```

<img src="media/demo.png" width="508">


## Props

#### data `array<object>`
> List of all the values.

#### config `<config>`
> Configuration object.

## Configuration
> The whole package is completely configurable!

```js
const defaultConfig = {
  padding: 1,
  lines: {
    empty: ' ',
    vertical: '│',
    horizontal: '─'
  },
  corners: {
    topLeft: '┌',
    topRight: '┐',
    lowerRight: '┘',
    lowerLeft: '└'
  },
  crosses: {
    mid: '┼',
    down: '┬',
    up: '┴',
    right: '├',
    left: '┤'
  },
  header: Header,
  cell: Cell,
  skeleton: Skeleton
}

const exampleConfigure = {
  padding: 3,
  crosses: {
    mid: '$'
  }
}
```

## License

MIT © [Matic Zavadlal](http://github.com/maticzav)
