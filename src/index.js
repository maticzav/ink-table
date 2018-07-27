import {Color, Bold} from 'ink'
import PropTypes from 'prop-types'

// Components ----------------------------------------------------------------

const Header = ({children}) => (
  <Bold>
    <Color blue>{children}</Color>
  </Bold>
)

Header.propTypes = {
  children: PropTypes.any.isRequired
}

const Cell = ({children}) => (
  <Color>{children}</Color>
)

Cell.propTypes = {
  children: PropTypes.any.isRequired
}

Cell.defaultProps = {
  focused: false
}

const Skeleton = ({children}) => (
  <Bold>
    <Color white>{children}</Color>
  </Bold>
)

Skeleton.propTypes = {
  children: PropTypes.any.isRequired
}

// Helpers -------------------------------------------------------------------

const get = key => obj => obj[key]
const length = el => el.length
const isUndefined = v => v === undefined
const not = func => (...args) => !func(...args)
const toString = val => (val || String()).toString()
const isEmpty = el => el.length === 0

const intersperse = val => vals => vals.reduce((s, c) => isEmpty(s) ? [c] : [...s, val(), c], [])
const fillWith = el => length => str => `${str}${el.repeat(length - str.length)}`
const getCells = columns => data => columns.map(({width, key}) => ({width, value: get(key)(data)}))
const union = (...arrs) => [...new Set([].concat(...arrs))]

const generateColumn = padding => data => key => {
  const allColumns = data.map(get(key))
  const columnsWithValues = allColumns.filter(not(isUndefined))
  const vals = columnsWithValues.map(toString)
  const lengths = vals.map(length)

  const width = Math.max(...lengths, key.length) + (padding * 2)

  return {width, key}
}

const copyToObject = func => arr => arr.reduce((o, k) => Object.assign({}, o, {[k]: func(k)}), {})
const generateHeadings = keys => copyToObject(key => key)(keys)
const generateSkeleton = keys => copyToObject(() => '')(keys)

const line = (Cell, Skeleton, {line, left, right, cross, padding}) => cells => {
  const fillWithLine = fillWith(line)

  const columns = cells.map(({width, value}) =>
    (<Cell key={value}>{line.repeat(padding)}{fillWithLine(width - padding)(toString(value))}</Cell>))

  return (
    <div>
      <Skeleton>{left}</Skeleton>
      {intersperse(() => <Skeleton>{cross}</Skeleton>)(columns)}
      <Skeleton>{right}</Skeleton>
    </div>
  )
}

// Table ---------------------------------------------------------------------

// Config --------------------------------------------------------------------

const Table = ({data, padding, header, cell, skeleton}) => {
  const topLine = line(skeleton, skeleton, {line: '─', left: '┌', right: '┐', cross: '┬', padding})
  const bottomLine = line(skeleton, skeleton, {line: '─', left: '└', right: '┘', cross: '┴', padding})
  const midLine = line(skeleton, skeleton, {line: '─', left: '├', right: '┤', cross: '┼', padding})
  const headers = line(header, skeleton, {line: ' ', left: '│', right: '│', cross: '│', padding})
  const row = line(cell, skeleton, {line: ' ', left: '│', right: '│', cross: '│', padding})

  const keys = union(...data.map(Object.keys))
  const columns = keys.map(generateColumn(padding)(data))
  const headings = generateHeadings(keys)
  const _skeleton = generateSkeleton(keys)

  const getRow = getCells(columns)
  const headersRow = getRow(headings)
  const emptyRow = getRow(_skeleton)
  const rows = data.map(d => row(getRow(d)))

  return (
    <span>
      {topLine(emptyRow)}
      {headers(headersRow)}
      {midLine(emptyRow)}
      {intersperse(() => midLine(emptyRow))(rows)}
      {bottomLine(emptyRow)}
    </span>
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
