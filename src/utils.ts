/**
 * Inserts Y in between Ts.
 *
 * @param ts
 * @param y
 */
export function intersperse<T, Y>(ts: T[], y: Y): (T | Y)[] {
  return ts.reduce<(T | Y)[]>((acc, el) => {
    if (acc.length === 0) return [el]
    else return [...acc, y, el]
  }, [])
}

export type Dictionary<T> = { [key: string]: T }
