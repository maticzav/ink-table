export type Scalar = string | number | boolean | null | undefined

export type ScalarDict = {
  [key: string]: Scalar
}

export type Column<T> = {
  key: string
  column: keyof T
  width: number
}