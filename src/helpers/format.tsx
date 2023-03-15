import moment from 'moment'

export const dateFormatter = new Intl.DateTimeFormat()
export const displayDateFormatter = (date: Date | string): string => {
  return moment.utc(date).format('LL')
}
export const numberFormatter = new Intl.NumberFormat('en-US')

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? (Math.sign(num) * Math.round(Math.abs(num) / 100)) / 10 + 'K'
    : Math.sign(num) * Math.abs(num)
}
