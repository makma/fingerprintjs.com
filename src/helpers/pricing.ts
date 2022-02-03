import { kFormatter } from './format'

export function pricingTable(freeTierValue: number) {
  const pricingTable = [
    { label: kFormatter(freeTierValue), value: freeTierValue },
    { label: '100K', value: 100000 },
    { label: '500K', value: 500000 },
    { label: '1M', value: 1000000 },
    { label: '1M+', value: Infinity },
  ]

  return pricingTable
}
export function handlePriceChange(currentValue: number, overagePrice: number): string {
  const value = Number(currentValue)
  const newPrice = calculatePrice(value, overagePrice)

  return newPrice
}

export function calculatePrice(identifications: number, overagePrice: number): string {
  return Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'USD',
    notation: 'standard',
  }).format(identifications * (overagePrice / 100))
}
