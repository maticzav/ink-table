import * as React from 'react'
import { Box, Color } from 'ink'
import { intersperse, Dictionary } from './utils'

/* Table Context */

const TableContext = React.createContext<{ [key: string]: number }>({})

/**
 *
 * HOC that wraps a custom cell unit into the context.
 *
 * @param Component
 */
const withWidth = (
  Component: React.ComponentType<{ width: number; children: string }>,
): React.SFC<{ children: string; width: number; key: string }> => ({
  children,
  width,
  key,
}) => (
  <TableContext.Consumer>
    {value => (
      <TableContext.Provider
        value={{ ...value, [key]: Math.max(value[key], children.length) }}
      >
        <Component width={width}>{children}</Component>
      </TableContext.Provider>
    )}
  </TableContext.Consumer>
)

/* Default components */

class Header extends React.Component<{ width: number }> {
  render() {
    return (
      <Box width={this.props.width} flexDirection="row">
        <Color blue bold>
          {this.props.children}
        </Color>
      </Box>
    )
  }
}

class Cell extends React.Component<{ width: number }> {
  render() {
    return (
      <Box width={this.props.width} flexDirection="row">
        <Color>{this.props.children}</Color>
      </Box>
    )
  }
}

class Skeleton extends React.Component<{ width: number }> {
  render() {
    return (
      <Box width={this.props.width} flexDirection="row">
        <Color white bold>
          {this.props.children}
        </Color>
      </Box>
    )
  }
}

/* Table */

export interface TableProps<T> {
  headers?: Dictionary<T>
  data: Dictionary<T>[]
  padding: number
  header: React.ComponentType<{ children: string }>
  cell: React.ComponentType<{ children: string }>
  skeleton: React.ComponentClass<{ children: string }>
  characters: FrameCharacters
}

export interface FrameCharacters {
  /* Basics */
  '─': string
  '│': string
  '┼': string
  /* Edges */
  '┌': string
  '┐': string
  '└': string
  '┘': string
  /* Ts */
  '┬': string
  '┴': string
  '├': string
  '┤': string
}

export class Table<T> extends React.Component<TableProps<T>> {
  static defaultProps = {
    padding: 1,
    header: Header,
    cell: Cell,
    skeleton: Skeleton,
    characters: {
      '─': '─',
      '│': '│',
      '┼': '┼',
      /* Edges */
      '┌': '┌',
      '┐': '┐',
      '└': '└',
      '┘': '┘',
      /* Ts */
      '┬': '┬',
      '┴': '┴',
      '├': '├',
      '┤': '┤',
    },
  }

  /**
   * Generates a line out of the provided cells.
   */
  getLine(
    type: 'top' | 'header' | 'mid' | 'bottom' | 'row',
    data: Dictionary<T>,
  ) {
    const { header, cell: Cell, skeleton: Skeleton } = this.props
    const cells = Object.keys(data)
    const Header = header

    switch (type) {
      case 'top': {
        return (
          <Box flexDirection="column">
            <Skeleton>{this.props.characters['┌']}</Skeleton>
            {intersperse(
              cells.map(key => <Cell>{String(data[key])}</Cell>),
              <Skeleton>{this.props.characters['┬']}</Skeleton>,
            )}
            <Skeleton>{this.props.characters['┐']}</Skeleton>
          </Box>
        )
      }
      case 'header': {
        return (
          <Box flexDirection="column">
            <Skeleton>{this.props.characters['│']}</Skeleton>
            {intersperse(
              cells.map(key => <Header>{String(data[key])}</Header>),
              <Skeleton>{this.props.characters['│']}</Skeleton>,
            )}
            <Skeleton>{this.props.characters['│']}</Skeleton>
          </Box>
        )
      }
      case 'mid': {
        return (
          <Box flexDirection="column">
            <Skeleton>{this.props.characters['├']}</Skeleton>
            {intersperse(
              cells.map(key => <Cell>{String(data[key])}</Cell>),
              <Skeleton>{this.props.characters['┼']}</Skeleton>,
            )}
            <Skeleton>{this.props.characters['┤']}</Skeleton>
          </Box>
        )
      }
      case 'bottom': {
        return (
          <Box flexDirection="column">
            <Skeleton>{this.props.characters['└']}</Skeleton>
            {intersperse(
              cells.map(key => <Cell>{String(data[key])}</Cell>),
              <Skeleton>{this.props.characters['┴']}</Skeleton>,
            )}
            <Skeleton>{this.props.characters['┘']}</Skeleton>
          </Box>
        )
      }
      case 'row': {
        return (
          <Box flexDirection="column">
            <Skeleton>{this.props.characters['│']}</Skeleton>
            {intersperse(
              cells.map(key => <Cell>{String(data[key])}</Cell>),
              <Skeleton>{this.props.characters['│']}</Skeleton>,
            )}
            <Skeleton>{this.props.characters['│']}</Skeleton>
          </Box>
        )
      }
    }
  }

  /**
   * Rendering of the Table.
   */
  render() {
    const { data } = this.props

    const emptyRow: Dictionary<T> = {}

    return (
      <React.Fragment>
        {this.getLine('top', emptyRow)}
        {this.getLine('header', this.props.headers!)}
        {this.getLine('mid', emptyRow)}
        {intersperse(
          data.map(row => this.getLine('row', row)),
          this.getLine('mid', emptyRow),
        )}
        {this.getLine('bottom', emptyRow)}
      </React.Fragment>
    )
  }
}

export default Table
export { Header, Cell, Skeleton }
