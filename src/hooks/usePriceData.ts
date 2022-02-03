import { graphql, useStaticQuery } from 'gatsby'

export function usePriceData() {
  const data = useStaticQuery(
    graphql`
      {
        apiPrice {
          overagePrice
          flatAmount
          prepaidQuantity
        }
      }
    `
  )

  const overagePrice = data.apiPrice.overagePrice
  const flatAmount = data.apiPrice.flatAmount
  const prepaidQuantity = data.apiPrice.prepaidQuantity

  return { overagePrice, flatAmount, prepaidQuantity }
}
