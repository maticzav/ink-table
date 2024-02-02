import React from 'react'
import { Box, Text } from 'ink'
import { sha1 } from 'object-hash'
import { ScalarDict } from './types'
import { createRowComponent } from './createRowComponent';


export type CellProps = React.PropsWithChildren<{ column: number }>

export type TableProps<T extends ScalarDict> = {
  /**
   * List of values (rows).
   */
  data: T[]
  /**
   * Columns that we should display in the table.
   */
  columns: (keyof T)[]
  /**
   * Cell padding.
   */
  padding: number
  /**
   * Header component.
   */
  header: (props: React.PropsWithChildren<{}>) => JSX.Element
  /**
   * Component used to render a cell in the table.
   */
  cell: (props: CellProps) => JSX.Element
  /**
   * Component used to render the skeleton of the table.
   */
  skeleton: (props: React.PropsWithChildren<{}>) => JSX.Element
}

/* Table */

export default class Table<T extends ScalarDict> extends React.Component<
  Pick<TableProps<T>, 'data'> & Partial<TableProps<T>>
> {
  render() {

    const keys = new Set<keyof T>()

    // Collect all the keys.
    for (const data of this.props.data) {
      for (const key in data) {
        keys.add(key)
      }
    }

    const config = {
      data: this.props.data,
      columns: this.props.columns || Array.from(keys),
      padding: this.props.padding || 1,
      header: this.props.header || Header,
      cell: this.props.cell || Cell,
      skeleton: this.props.skeleton || Skeleton,
    };

    const headings: Partial<T> = config.columns.reduce(
      (acc, column) => ({ ...acc, [column]: column }),
      {},
    )

    const columns = config.columns.map((key) => {
      const header = String(key).length
      /* Get the width of each cell in the column */
      const data = this.props.data.map((data) => {
        const value = data[key]

        if (value == undefined || value == null) return 0
        return String(value).length
      })

      const width = Math.max(...data, header) + config.padding * 2

      /* Construct a cell */
      return {
        column: key,
        width: width,
        key: String(key),
      }
    })

    // The top most line in the table.
    const Top = createRowComponent<T>({
      cell: config.skeleton,
      padding: config.padding,
      skeleton: {
        component: config.skeleton,
        // chars
        line: '─',
        left: '┌',
        right: '┐',
        cross: '┬',
      },
    })

    // The line with column names.
    const Heading = createRowComponent<T>({
      cell: config.header,
      padding: config.padding,
      skeleton: {
        component: config.skeleton,
        // chars
        line: ' ',
        left: '│',
        right: '│',
        cross: '│',
      },
    })

    // The line that separates rows.
    const Separator = createRowComponent<T>({
      cell: config.skeleton,
      padding: config.padding,
      skeleton: {
        component: config.skeleton,
        // chars
        line: '─',
        left: '├',
        right: '┤',
        cross: '┼',
      },
    })

    // The row with the data.
    const Data = createRowComponent<T>({
      cell: config.cell,
      padding: config.padding,
      skeleton: {
        component: config.skeleton,
        // chars
        line: ' ',
        left: '│',
        right: '│',
        cross: '│',
      },
    })

    // The bottom most line of the table.
    const Footer = createRowComponent<T>({
      cell: config.skeleton,
      padding: config.padding,
      skeleton: {
        component: config.skeleton,
        // chars
        line: '─',
        left: '└',
        right: '┘',
        cross: '┴',
      },
    })
    /**
     * Render the table line by line.
     */
    return (
      <Box flexDirection="column">
        <Top key="header" propKey="header" columns={columns} data={{}} />
        <Heading key="heading" propKey="heading" columns={columns} data={headings} />
        {/* Data */}
        {this.props.data.map((row, index) => {
          // Calculate the hash of the row based on its value and position
          const key = `row-${sha1(row)}-${index}`

          // Construct a row.
          return (
            <Box flexDirection="column" key={key}>
              <Separator
                key={`separator-${key}`}
                propKey={`separator-${key}`}
                columns={columns}
                data={{}}
              />
              <Data key={`data-${key}`} propKey={`data-${key}`} columns={columns} data={row} />
            </Box>
          )
        })}
        <Footer
          key="footer"
          propKey="footer"
          columns={columns}
          data={{}}
        />
      </Box>
    )
  }
}

/* Helper components */


/**
 * Renders the header of a table.
 */
export function Header(props: React.PropsWithChildren<{}>) {
  return (
    <Text bold color="blue">
      {props.children}
    </Text>
  )
}

/**
 * Renders a cell in the table.
 */
export function Cell(props: CellProps) {
  return <Text>{props.children}</Text>
}

/**
 * Redners the scaffold of the table.
 */
export function Skeleton(props: React.PropsWithChildren<{}>) {
  return <Text bold>{props.children}</Text>
}

/* Utility functions */

