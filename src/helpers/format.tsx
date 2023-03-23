import moment from 'moment'

export const createDateTimeFormatter = () => new Intl.DateTimeFormat()

export const displayDateFormatter = (date: Date | string): string => {
  return moment.utc(date).format('LL')
}

export const createNumberFormatter = () => new Intl.NumberFormat('en-US')

export function kFormatter(num: number, lowercase?: boolean) {
  const letter = lowercase ? 'k' : 'K'
  return Math.abs(num) > 999
    ? Math.sign(num) * Math.floor(Math.abs(num) / 1000) + letter
    : Math.sign(num) * Math.abs(num)
}
