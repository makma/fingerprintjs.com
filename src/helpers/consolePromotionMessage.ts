export const consolePromotionMessage = (text: string) => {
  const consoleText = `%c${text}`
  const cssRule =
    'color: hsl(16, 96%, 48%);' +
    'font-size: 20px;' +
    'font-weight: bold;' +
    'text-shadow: 1px 1px 5px hsl(16, 96%, 48%);' +
    'filter: dropshadow(color=hsl(16, 96%, 48%), offx=1, offy=1);'
  /* eslint-disable */
  setTimeout(console.log.bind(console, consoleText, cssRule), 750)
}
