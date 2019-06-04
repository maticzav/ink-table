import { intersperse } from '../src/utils'

test('intersperse works as expected', () => {
  expect(intersperse([1, 2, 3], 'a')).toEqual([1, 'a', 2, 'a', 3])
})
