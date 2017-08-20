import {h, Text} from 'ink'
import PropTypes from 'prop-types'
import merge from 'merge'

// Components ----------------------------------------------------------------

const Header = ({children}) => (
  <Text bold blue>{children}</Text>
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

Cell.defaultProps = {
  focused: false
}

const Skeleton = ({children}) => (
  <Text bold white>{children}</Text>
)

Skeleton.propTypes = {
  children: PropTypes.any.isRequired
}

// Config --------------------------------------------------------------------

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

// Helpers -------------------------------------------------------------------

const get = key => obj => obj[key]
const length = el => el.length
const isUndefined = v => v === undefined
const not = func => (...args) => !func(...args)
const toString = val => (val || String()).toString()
const isEmpty = el => el.length === 0

const intersperse = val => vals => vals.reduce((s, c) => isEmpty(s) ? [c] : [...s, val, c], [])
const fillWith = el => length => str => `${str}${el.repeat(length - str.length)}`
const getCells = columns => data => columns.map(({width, key}) => ({width, value: get(key)(data)}))
const union = (...arrs) => [...new Set([].concat(...arrs))]

const generateColumn = config => data => key => {
  const allColumns = data.map(get(key))
  const columnsWithValues = allColumns.filter(not(isUndefined))
  const vals = columnsWithValues.map(toString)
  const lengths = vals.map(length)

  const width = Math.max(...lengths, key.length) + (config.padding * 2)

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
      {intersperse(<Skeleton>{cross}</Skeleton>)(columns)}
      <Skeleton>{right}</Skeleton>
    </div>
  )
}

// Table ---------------------------------------------------------------------

const Table = ({data, config}) => {
  const validConfig = merge.recursive(defaultConfig, config)

  const {header, cell, skeleton} = validConfig
  const {lines, corners, crosses, padding} = validConfig

  const topLine = line(skeleton, skeleton, {line: lines.horizontal, left: corners.topLeft, right: corners.topRight, cross: crosses.down, padding})
  const bottomLine = line(skeleton, skeleton, {line: lines.horizontal, left: corners.lowerLeft, right: corners.lowerRight, cross: crosses.up, padding})
  const midLine = line(skeleton, skeleton, {line: lines.horizontal, left: crosses.right, right: crosses.left, cross: crosses.mid, padding})
  const headers = line(header, skeleton, {line: lines.empty, left: lines.vertical, right: lines.vertical, cross: lines.vertical, padding})
  const row = line(cell, skeleton, {line: lines.empty, left: lines.vertical, right: lines.vertical, cross: lines.vertical, padding})

  const keys = union(...data.map(Object.keys))
  const columns = keys.map(generateColumn(validConfig)(data))
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
      {intersperse(midLine(emptyRow))(rows)}
      {bottomLine(emptyRow)}
    </span>
  )
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.shape({
    padding: PropTypes.number,
    lines: PropTypes.shape({
      empty: PropTypes.string,
      vertical: PropTypes.string,
      horizontal: PropTypes.string
    }),
    corners: PropTypes.shape({
      topLeft: PropTypes.string,
      topRight: PropTypes.string,
      lowerRight: PropTypes.string,
      lowerLeft: PropTypes.string
    }),
    crosses: PropTypes.shape({
      mid: PropTypes.string,
      down: PropTypes.string,
      up: PropTypes.string,
      right: PropTypes.string,
      left: PropTypes.string
    }),
    header: PropTypes.function,
    cell: PropTypes.function,
    skeleton: PropTypes.function
  })
}

Table.defaultProps = {
  data: [],
  config: defaultConfig
}

// Exports -------------------------------------------------------------------

export default Table
export {Header, Cell, Skeleton}

// ---------------------------------------------------------------------------
