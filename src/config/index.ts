import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 5

export const OKT_BLOCK_TIME = 5;

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 18 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 12 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in components/CakeStats.tsx = 22 (40 - Amount sent to burn pool)
export const YEAR_SECOND = 113529600
// export const YEAR_SECOND = 5
export const CAKE_PER_BLOCK = new BigNumber(40)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) 
export const KNS_PER_BLOCK_DILIV = new BigNumber(22); // farms 每个区块所能获得的币的数量是22 
export const BLOCKS_OKT_PER_YEAR = new BigNumber((60 / OKT_BLOCK_TIME) * 60 * 24 * 365)
export const BASE_URL = 'https://mangoswap.ccian.cc/'
export const BASE_EXCHANGE_URL = 'https://mangoswap.ccian.cc'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const BASE_BSC_SCAN_URL = 'https://www.oklink.com/okexchain-test'
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)