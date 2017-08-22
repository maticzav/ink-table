import {h, renderToString, Text} from 'ink'
import PropTypes from 'prop-types'
import test from 'ava'

import Table, {Header, Skeleton, Cell} from '.'

// Helpers -------------------------------------------------------------------

const s = v => <Skeleton>{v}</Skeleton>
const e = v => <Header>{v}</Header>
const c = v => <Cell>{v}</Cell>

const Custom = ({children}) => <Text red italic>{children}</Text>
Custom.propTypes = {
  children: PropTypes.any.isRequired
}

const u = v => <Custom>{v}</Custom>

// Tests ---------------------------------------------------------------------

test('Renders table.', t => {
  const data = [{name: 'Foo'}]
  const table = renderToString(<Table data={data}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────')}{s('┐')}</div>
      <div>{s('│')}{e(' name ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┤')}</div>
      <div>{s('│')}{c(' Foo  ')}{s('│')}</div>
      <div>{s('└')}{s('──────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

test('Renders table with numbers.', t => {
  const data = [{name: 'Foo', age: 12}]
  const table = renderToString(<Table data={data}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────')}{s('┬')}{s('─────')}{s('┐')}</div>
      <div>{s('│')}{e(' name ')}{s('│')}{e(' age ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{c(' Foo  ')}{s('│')}{c(' 12  ')}{s('│')}</div>
      <div>{s('└')}{s('──────')}{s('┴')}{s('─────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

test('Renders table with multiple rows.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const table = renderToString(<Table data={data}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────')}{s('┬')}{s('─────')}{s('┐')}</div>
      <div>{s('│')}{e(' name ')}{s('│')}{e(' age ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{c(' Foo  ')}{s('│')}{c(' 12  ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{c(' Bar  ')}{s('│')}{c(' 15  ')}{s('│')}</div>
      <div>{s('└')}{s('──────')}{s('┴')}{s('─────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

test('Renders table with undefined value.', t => {
  const data = [{name: 'Foo'}, {name: 'Bar', age: 15}]
  const table = renderToString(<Table data={data}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────')}{s('┬')}{s('─────')}{s('┐')}</div>
      <div>{s('│')}{e(' name ')}{s('│')}{e(' age ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{c(' Foo  ')}{s('│')}{c('     ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{c(' Bar  ')}{s('│')}{c(' 15  ')}{s('│')}</div>
      <div>{s('└')}{s('──────')}{s('┴')}{s('─────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

test('Renders table with custom padding.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const table = renderToString(<Table data={data} padding={3}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────────')}{s('┬')}{s('─────────')}{s('┐')}</div>
      <div>{s('│')}{e('   name   ')}{s('│')}{e('   age   ')}{s('│')}</div>
      <div>{s('├')}{s('──────────')}{s('┼')}{s('─────────')}{s('┤')}</div>
      <div>{s('│')}{c('   Foo    ')}{s('│')}{c('   12    ')}{s('│')}</div>
      <div>{s('├')}{s('──────────')}{s('┼')}{s('─────────')}{s('┤')}</div>
      <div>{s('│')}{c('   Bar    ')}{s('│')}{c('   15    ')}{s('│')}</div>
      <div>{s('└')}{s('──────────')}{s('┴')}{s('─────────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

test('Renders table with custom header.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const table = renderToString(<Table data={data} header={Custom}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────')}{s('┬')}{s('─────')}{s('┐')}</div>
      <div>{s('│')}{u(' name ')}{s('│')}{u(' age ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{c(' Foo  ')}{s('│')}{c(' 12  ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{c(' Bar  ')}{s('│')}{c(' 15  ')}{s('│')}</div>
      <div>{s('└')}{s('──────')}{s('┴')}{s('─────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

test('Renders table with custom cell.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const table = renderToString(<Table data={data} cell={Custom}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────')}{s('┬')}{s('─────')}{s('┐')}</div>
      <div>{s('│')}{e(' name ')}{s('│')}{e(' age ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{u(' Foo  ')}{s('│')}{u(' 12  ')}{s('│')}</div>
      <div>{s('├')}{s('──────')}{s('┼')}{s('─────')}{s('┤')}</div>
      <div>{s('│')}{u(' Bar  ')}{s('│')}{u(' 15  ')}{s('│')}</div>
      <div>{s('└')}{s('──────')}{s('┴')}{s('─────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

test('Renders table with custom skeleton.', t => {
  const data = [{name: 'Foo', age: 12}, {name: 'Bar', age: 15}]
  const table = renderToString(<Table data={data} skeleton={Custom}/>)

  const expected = renderToString(
    <span>
      <div>{u('┌')}{u('──────')}{u('┬')}{u('─────')}{u('┐')}</div>
      <div>{u('│')}{e(' name ')}{u('│')}{e(' age ')}{u('│')}</div>
      <div>{u('├')}{u('──────')}{u('┼')}{u('─────')}{u('┤')}</div>
      <div>{u('│')}{c(' Foo  ')}{u('│')}{c(' 12  ')}{u('│')}</div>
      <div>{u('├')}{u('──────')}{u('┼')}{u('─────')}{u('┤')}</div>
      <div>{u('│')}{c(' Bar  ')}{u('│')}{c(' 15  ')}{u('│')}</div>
      <div>{u('└')}{u('──────')}{u('┴')}{u('─────')}{u('┘')}</div>
    </span>
  )

  t.is(table, expected)
})

// ---------------------------------------------------------------------------
