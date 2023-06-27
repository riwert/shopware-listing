export default function usePriceFormatter(price: number, decimalPlaces = 2) {

  const roundedPrice = price.toFixed(decimalPlaces)
  const formattedWithComma = roundedPrice.replace('.', ',')

  return formattedWithComma
}
