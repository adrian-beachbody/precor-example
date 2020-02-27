export default function Const<T extends string>(arr: T[]): { [K in T]: K } {
  return arr.reduce((next, val) => {
    next[val] = val
    return next
  }, Object.create(null))
}
