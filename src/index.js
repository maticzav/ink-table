import React from 'react'
import {Box, Text} from 'ink'
import PropTypes from 'prop-types'

// Components ----------------------------------------------------------------

const Header = ({children}) => (
  <Text bold color="blue">{children}</Text>
)

Header.propTypes = {
  children: PropTypes.any.isRequired
}

const Cell = ({children}) => (
  <Text>{children}</Text>
)

Cell.propTypes = {
  children: PropTypes.any.isRequired
}

const Skeleton = ({children}) => (
  <Text bold>{children}</Text>
)

Skeleton.propTypes = {
  children: PropTypes.any.isRequired
}

// Helpers -------------------------------------------------------------------

const get = key => object => object[key]
const length = element => element.length
const isUndefined = v => v === undefined
const not = func => (...args) => !func(...args)
const toString = value => (isUndefined(value) ? String() : `${value}`)
const isEmpty = element => element.length === 0
const intersperse = value => values => values.reduce((s, c, i) => isEmpty(s) ? [c] : [...s, value(i), c], [])
const fillWith = element => length => text => `${text}${element.repeat(length - text.length)}`
const getCells = columns => data => columns.map(({width, key}) => ({width, key, value: get(key)(data)}))
const union = (...arrs) => [...new Set([].concat(...arrs))]

const generateColumn = padding => data => key => {
  const allColumns = data.map(get(key))
  const columnsWithValues = allColumns.filter(not(isUndefined))
  const values = columnsWithValues.map(toString)
  const lengths = values.map(length)
  const width = Math.max(...lengths, key.length) + (padding * 2)

  return {width, key}
}

const copyToObject = func => array => array.reduce((o, k) => ({...o, [k]: func(k)}), {})
const generateHeadings = keys => copyToObject(key => key)(keys)
const generateSkeleton = keys => copyToObject(() => '')(keys)

const line = (key, Cell, Skeleton, {line, left, right, cross, padding}) => (cells, index = '') => {
  const fillWithLine = fillWith(line)

  const columns = cells.map(({width, key, value}, i) =>
    (<Cell key={key + String(i)}>{line.repeat(padding)}{fillWithLine(width - padding)(toString(value))}</Cell>))

  return (
    <Box key={key + String(index)}>
      <Skeleton>{left}</Skeleton>
      {intersperse(i => <Skeleton key={i}>{cross}</Skeleton>)(columns)}
      <Skeleton>{right}</Skeleton>
    </Box>
  )
}

// Table ---------------------------------------------------------------------

// Config --------------------------------------------------------------------

const Table = ({data, padding, header, cell, skeleton}) => {
  const topLine = line('top', skeleton, skeleton, {line: '─', left: '┌', right: '┐', cross: '┬', padding})
  const bottomLine = line('bottom', skeleton, skeleton, {line: '─', left: '└', right: '┘', cross: '┴', padding})
  const midLine = line('mid', skeleton, skeleton, {line: '─', left: '├', right: '┤', cross: '┼', padding})
  const headers = line('header', header, skeleton, {line: ' ', left: '│', right: '│', cross: '│', padding})
  const row = line('row', cell, skeleton, {line: ' ', left: '│', right: '│', cross: '│', padding})

  const keys = union(...data.map(Object.keys))
  const columns = keys.map(generateColumn(padding)(data))
  const headings = generateHeadings(keys)
  const _skeleton = generateSkeleton(keys)

  const getRow = getCells(columns)
  const headersRow = getRow(headings)
  const emptyRow = getRow(_skeleton)
  const rows = data.map((d, i) => row(getRow(d), i))

  return (
    <>
      {topLine(emptyRow)}
      {headers(headersRow)}
      {midLine(emptyRow)}
      {intersperse(i => midLine(emptyRow, i))(rows)}
      {bottomLine(emptyRow)}
    </>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  padding: PropTypes.number,
  header: PropTypes.func,
  cell: PropTypes.func,
  skeleton: PropTypes.func
}

Table.defaultProps = {
  data: [],
  padding: 1,
  header: Header,
  cell: Cell,
  skeleton: Skeleton
}

// Exports -------------------------------------------------------------------

export default Table
export {Header, Cell, Skeleton}

// ---------------------------------------------------------------------------
