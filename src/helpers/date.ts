export function getTimezoneOffset() {
  function z(n) {
    return (n < 10 ? '0' : '') + n
  }
  let offset = new Date().getTimezoneOffset()
  const sign = offset < 0 ? '+' : '-'
  offset = Math.abs(offset)
  return sign + z((offset / 60) | 0) + ':' + z(offset % 60)
}
