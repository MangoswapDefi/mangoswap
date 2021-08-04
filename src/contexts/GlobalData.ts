import { blockClient, client } from "apollo/client"
import { ALL_PAIRS, ALL_TOKENS, GET_BLOCK, GET_STATISTICS, TOKEN_PRICE } from "apollo/queries"
import { SQL_pairDayDatas, SQL_totalLiquidityUSD } from "apollo/queries_type"
import dayjs from "dayjs"
import _ from "lodash"
import { addReduceArray } from "utils/array"


const PAIRS_TO_FETCH = 100
const TOKENS_TO_FETCH = 100

export interface GraphTokenParams { skip: number }
export interface GraphPairsParams { skip: number }
/**
 * Loop through every token on uniswap, used for search
 */
export default async function getTokensOnswap ({ skip = 0 }: GraphTokenParams) {
  try {
    let allFound = false
    // let skipCount = 0
    let tokens = []
    while (!allFound) {
      const result = await client.query({
        query: ALL_TOKENS,
        variables: {
          skip,
        },
        fetchPolicy: 'cache-first',
      })
      tokens = tokens.concat(result?.data?.tokens)
      if (result?.data?.tokens?.length < TOKENS_TO_FETCH || tokens.length > TOKENS_TO_FETCH) {
        allFound = true
      }
      // skipCount += TOKENS_TO_FETCH
    }
    return tokens
  } catch (e) {
    console.log(e)
    return []
  }
}


/**
 * Loop through every pair on uniswap, used for search
 */
export async function getPairsOnswap ({ skip = 0 }: GraphPairsParams) {
  const utcCurrentTime = dayjs.unix(Date.now() / 1000)
  const utcOneHourBack = utcCurrentTime.subtract(3, 'day').startOf('minute').unix()
  const oneHourBlock = await getBlockFromTimestamp(utcOneHourBack)

  try {
    let allFound = false
    let pairs = []
    while (!allFound) {
      const result = await client.query({
        query: ALL_PAIRS(),
        variables: {
          skip,
        },
        fetchPolicy: 'cache-first',
      })
      pairs = pairs.concat(result?.data?.pairs)
      if (result?.data?.pairs.length < PAIRS_TO_FETCH || pairs.length > PAIRS_TO_FETCH) {
        allFound = true
      }
    }
    return pairs
  } catch (e) {
    console.log(e)
    return []
  }
}


/**
 * @notice Fetches first block after a given timestamp
 * @dev Query speed is optimized by limiting to a 600-second period
 * @param {Int} timestamp in seconds
 */
export async function getBlockFromTimestamp (timestamp) {
  const result = await blockClient.query({
    query: GET_BLOCK,
    variables: {
      timestampFrom: timestamp,
      timestampTo: timestamp + 600,
    },
    fetchPolicy: 'cache-first',
  })
  return result?.data?.blocks?.[0]?.number
}

export async function getTotalLiquidUSDSANDPairData ()  {
  const result = await client.query({
    query: GET_STATISTICS,
    variables: {},
  })
  // console.log("result?.data: ", result?.data)
  // console.log("result?.data.pairs.derivedETH: ", result?.data.pairs.derivedETH)
  // console.log("result?.data.bundles.ethPrice: ", result?.data.bundles.ethPrice)
  return {
    pairDayData: (result?.data?.pairDayDatas
      ?.map((e: SQL_pairDayDatas) => e?.dailyVolumeUSD ?? 0).map(Number).reduce(...addReduceArray) ?? 0) as number,
    totalLiquidityUSD: (result?.data.uniswapDayDatas
      ?.map((e: SQL_totalLiquidityUSD) => e?.totalLiquidityUSD ?? 0).map(Number).reduce(...addReduceArray) ?? 0) as number,
    KNSPrice: (result?.data?.pairs[0]?.derivedETH * result?.data?.bundles[0]?.ethPrice) as number,
  }
}

export async function getTokenPriceUsd (key: string) {
  const result = await client.query({
    query: TOKEN_PRICE(key),
    variables: {},
  })
  // console.log(result)
  return parseFloat(result?.data?.bundles[0]?.ethPrice) * parseFloat(result?.data?.tokens[0]?.derivedETH)
}