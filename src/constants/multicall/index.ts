import { ChainId } from '@mangoswap-libs/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xf2aC166D1aE1f12CE7E086E439278E8faA6e9E32',
  [ChainId.OKT]: '0xBd09DF438AccA57476BcFe70A333B3204DB4C6e7',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS } 
 