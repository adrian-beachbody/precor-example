const maxPrecision = 6
export function round(num: number, precision: number = maxPrecision) {
  const base = 10
  return Math.round(num * base ** precision) / base ** precision
}
