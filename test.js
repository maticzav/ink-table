import {h, renderToString} from 'ink'
import test from 'ava'

import Table, {Header, Skeleton, Cell} from '.'

// Helpers -------------------------------------------------------------------

const s = v => <Skeleton>{v}</Skeleton>
const e = v => <Header>{v}</Header>
const c = v => <Cell>{v}</Cell>

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

test('Renders table with cutsom config.', t => {
  const data = [{name: 'Foo'}, {name: 'Bar', age: 15}]
  const config = {padding: 3}
  const table = renderToString(<Table data={data} config={config}/>)

  const expected = renderToString(
    <span>
      <div>{s('┌')}{s('──────────')}{s('┬')}{s('─────────')}{s('┐')}</div>
      <div>{s('│')}{e('   name   ')}{s('│')}{e('   age   ')}{s('│')}</div>
      <div>{s('├')}{s('──────────')}{s('┼')}{s('─────────')}{s('┤')}</div>
      <div>{s('│')}{c('   Foo    ')}{s('│')}{c('         ')}{s('│')}</div>
      <div>{s('├')}{s('──────────')}{s('┼')}{s('─────────')}{s('┤')}</div>
      <div>{s('│')}{c('   Bar    ')}{s('│')}{c('   15    ')}{s('│')}</div>
      <div>{s('└')}{s('──────────')}{s('┴')}{s('─────────')}{s('┘')}</div>
    </span>
  )

  t.is(table, expected)
})
// ---------------------------------------------------------------------------
