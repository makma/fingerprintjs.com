export const minimumIdentifications = 100000
export const freeApiCalls = 20000

export const pricingTable = [
  { label: '100K', value: 100000 },
  { label: '250K', value: 250000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 },
  { label: '5M', value: 5000000 },
  { label: '10M+', value: Infinity },
]

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

  return new Intl.NumberFormat('en-US', currencyFormatOptions).format(identifications / 1000)
}
