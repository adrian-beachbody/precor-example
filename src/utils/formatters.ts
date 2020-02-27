export const CENTS_PLACES = 2

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function formatNumber(value: number) {
  const numberFormatter = new Intl.NumberFormat('en-us')
  return numberFormatter.format(value)
}

export function formatCurrency(value: number) {
  const currencyFormatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })
  return currencyFormatter.format(value / 100)
}

export function formatPercent(value: number) {
  const percentFormatter = new Intl.NumberFormat('en-us', { style: 'percent' })
  return percentFormatter.format(value)
}
