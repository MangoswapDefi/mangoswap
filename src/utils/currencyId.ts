import { Currency, ETHER, Token } from '@mangoswap-libs/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'OKT'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
