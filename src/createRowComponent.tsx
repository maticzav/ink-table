import { Box } from 'ink'
import { CellProps } from '.'
import { Column, ScalarDict } from './types'
import React from 'react'

/**
 * Intersperses a list of elements with another element.
 */
function intersperse<T, I>(
  intersperser: (index: number) => I,
  elements: T[],
): (T | I)[] {
  // Intersparse by reducing from left.
  let interspersed: (T | I)[] = elements.reduce((acc, element, index) => {
    // Only add element if it's the first one.
    if (acc.length === 0) return [element]
    // Add the intersparser as well otherwise.
    return [...acc, intersperser(index), element]
  }, [] as (T | I)[])

  return interspersed
}

type RowConfig = {
  /**
   * Component used to render cells.
   */
  cell: (props: CellProps) => JSX.Element
  /**
   * Tells the padding of each cell.
   */
  padding: number
  /**
   * Component used to render skeleton in the row.
   */
  skeleton: {
    component: (props: React.PropsWithChildren<{}>) => JSX.Element
    /**
     * Characters used in skeleton.
     *    |             |
     * (left)-(line)-(cross)-(line)-(right)
     *    |             |
     */
    left: string
    right: string
    cross: string
    line: string
  }
}

type RowProps<T extends ScalarDict> = {
  key: string
  propKey?: string
  data: Partial<T>
  columns: Column<T>[]
}

/**
 * Constructs a Row element from the configuration.
 */
export function createRowComponent<T extends ScalarDict>(
  config: RowConfig,
): (props: RowProps<T>) => JSX.Element {
  /* This is a component builder. We return a function. */

  const skeleton = config.skeleton
  const SkeletonComponent = skeleton.component

  /* Row */
  return (props) => {
    const defKey = props.propKey || props.key
    return (
      <Box flexDirection="row">
        {/* Left */}
        <SkeletonComponent>{skeleton.left}</SkeletonComponent>
        {/* Data */}
        {...intersperse(
          (i) => {
            const key = `${defKey}-hseparator-${i}`

            // The horizontal separator.
            return (
              <SkeletonComponent key={key}>{skeleton.cross}</SkeletonComponent>
            )
          },

          // Values.
          props.columns.map((column, colI) => {
            // content
            const value = props.data[column.column]

            if (value == undefined || value == null) {
              const key = `${defKey}-empty-${column.key}`

              return (
                <config.cell key={key} column={colI}>
                  {skeleton.line.repeat(column.width)}
                </config.cell>
              )
            } else {
              const key = `${defKey}-cell-${column.key}`

              // margins
              const ml = config.padding
              const mr = column.width - String(value).length - config.padding

              return (
                /* prettier-ignore */
                <config.cell key={key} column={colI}>
                  {`${skeleton.line.repeat(ml)}${String(value)}${skeleton.line.repeat(mr)}`}
                </config.cell>
              )
            }
          }),
        )}
        {/* Right */}
        <SkeletonComponent>{skeleton.right}</SkeletonComponent>
      </Box>
    )
  }
}
