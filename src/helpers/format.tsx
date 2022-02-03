export const dateFormatter = new Intl.DateTimeFormat()
export const displayDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
export const numberFormatter = new Intl.NumberFormat('en-US')

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? (Math.sign(num) * Math.round(Math.abs(num) / 100)) / 10 + 'K'
    : Math.sign(num) * Math.abs(num)
}
