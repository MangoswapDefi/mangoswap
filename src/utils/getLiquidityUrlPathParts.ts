// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import { Address } from 'config/constants/types'
import { getOktAddress } from './addressHelpers'

const getLiquidityUrlPathParts = ({ quoteTokenAddress, tokenAddress }: { quoteTokenAddress: Address, tokenAddress: Address }) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const wOKTAddressString = getOktAddress()
  const quoteTokenAddressString: string = quoteTokenAddress ? quoteTokenAddress[chainId] : null
  const tokenAddressString: string = tokenAddress ? tokenAddress[chainId] : null
  const firstPart =
    !quoteTokenAddressString || quoteTokenAddressString.toLocaleLowerCase() === wOKTAddressString.toLocaleLowerCase() ? 'OKT' : quoteTokenAddressString
  const secondPart = !tokenAddressString || tokenAddressString.toLocaleLowerCase() === wOKTAddressString.toLocaleLowerCase() ? 'OKT' : tokenAddressString
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
