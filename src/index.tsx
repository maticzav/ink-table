import React, { FC } from 'react'
import { Box, Text } from 'ink'
import { sha1 } from 'object-hash'
import { ScalarDict } from './types'
import { createRowComponent } from './createRowComponent'

export type CellProps = React.PropsWithChildren<{ column: number }>

export type TableProps<T extends ScalarDict> = {
  /**
   * List of values (rows).
   */
  data: T[]
  /**
   * Columns that we should display in the table.
   */
  columns?: (keyof T)[]
  /**
   * Cell padding.
   */
  padding?: number
  /**
   * Header component.
   */
  header?: (props: React.PropsWithChildren<{}>) => JSX.Element
  /**
   * Component used to render a cell in the table.
   */
  cell?: (props: CellProps) => JSX.Element
  /**
   * Component used to render the skeleton of the table.
   */
  skeleton?: (props: React.PropsWithChildren<{}>) => JSX.Element
}

const getDataKeys = <T extends ScalarDict>(dataList: T[]) => {
  const keys = new Set<keyof T>()

  // Collect all the keys.
  for (const data of dataList) {
    for (const key in data) {
      keys.add(key)
    }
  }

  return Array.from(keys);
}

const Table = <T extends ScalarDict>({
  data,
  columns: columnNames = getDataKeys(data),
  padding = 1,
  header = Header,
  cell = Cell,
  skeleton = Skeleton,
}: TableProps<T>) => {

  const headings: Partial<T> = columnNames.reduce(
    (acc, column) => ({ ...acc, [column]: column }),
    {},
  )

  const columnConfigs = columnNames.map((key) => {
    const header = String(key).length
    /* Get the width of each cell in the column */
    const dataValues = data.map((data) => {
      const value = data[key]

      if (value == undefined || value == null) return 0
      return String(value).length
    })

    const width = Math.max(...dataValues, header) + padding * 2

    /* Construct a cell */
    return {
      column: key,
      width: width,
      key: String(key),
    }
  })

  // The top most line in the table.
  const Top = createRowComponent<T>({
    cell: skeleton,
    padding: padding,
    skeleton: {
      component: skeleton,
      // chars
      line: '─',
      left: '┌',
      right: '┐',
      cross: '┬',
    },
  })

  // The line with column names.
  const Heading = createRowComponent<T>({
    cell: header,
    padding: padding,
    skeleton: {
      component: skeleton,
      // chars
      line: ' ',
      left: '│',
      right: '│',
      cross: '│',
    },
  })

  // The line that separates rows.
  const Separator = createRowComponent<T>({
    cell: skeleton,
    padding: padding,
    skeleton: {
      component: skeleton,
      // chars
      line: '─',
      left: '├',
      right: '┤',
      cross: '┼',
    },
  })

  // The row with the data.
  const Data = createRowComponent<T>({
    cell,
    padding,
    skeleton: {
      component: skeleton,
      // chars
      line: ' ',
      left: '│',
      right: '│',
      cross: '│',
    },
  })

  // The bottom most line of the table.
  const Footer = createRowComponent<T>({
    cell: skeleton,
    padding,
    skeleton: {
      component: skeleton,
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
      <Top key="header" propKey="header" columns={columnConfigs} data={{}} />
      <Heading
        key="heading"
        propKey="heading"
        columns={columnConfigs}
        data={headings}
      />
      {data.map((row, index) => {
        // Calculate the hash of the row based on its value and position
        const key = `row-${sha1(row)}-${index}`

        // Construct a row.
        return (
          <Box flexDirection="column" key={key}>
            <Separator
              key={`separator-${key}`}
              propKey={`separator-${key}`}
              columns={columnConfigs}
              data={{}}
            />
            <Data
              key={`data-${key}`}
              propKey={`data-${key}`}
              columns={columnConfigs}
              data={row}
            />
          </Box>
        )
      })}
      <Footer key="footer" propKey="footer" columns={columnConfigs} data={{}} />
    </Box>
  )
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
export default Table;