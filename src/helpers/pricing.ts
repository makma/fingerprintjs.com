export const minimumIdentifications = 100000
export const freeApiCalls = 20000

export const pricingTable = [
  { label: '20K', value: 20000 },
  { label: '100K', value: 100000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 },
  { label: '1M+', value: Infinity },
]

const numberFormatter = (currencyFormatOptions: {
  maximumSignificantDigits: number
  style: string
  currencyDisplay: string
  currency: string
  notation: string
}) => {
  return Intl.NumberFormat('en-US', currencyFormatOptions)
}

export function handlePriceChange(currentValue: number): string {
  const value = Number(currentValue)
  const newPrice = calculatePrice(value)

  return newPrice
}

export function calculatePrice(identifications: number): string {
  const currencyFormatOptions = {
    maximumSignificantDigits: 3,
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'USD',
    notation: 'standard',
  }

  return numberFormatter(currencyFormatOptions).format(identifications / 1000)
}
