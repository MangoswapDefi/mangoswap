import React from 'react'
import { BigNumber } from 'bignumber.js'
import Numeral from 'numeral'
import dayjs from 'dayjs'
import { ethers } from 'ethers'
import utc from 'dayjs/plugin/utc'
import { Text } from 'rebass'
import _Decimal from 'decimal.js-light'
import toFormat from 'toformat'
import { timeframeOptions } from '../constants'
import { client, blockClient } from '../../../apollo/client'
import { GET_BLOCK, GET_BLOCKS, SHARE_VALUE } from '../../../apollo/queries'

// format libraries
const Decimal = toFormat(_Decimal)
BigNumber.set({ EXPONENTIAL_AT: 50 })
dayjs.extend(utc)

export function getTimeframe(timeWindow) {
  const utcEndTime = dayjs.utc()
  // based on window, get starttime
  let utcStartTime
  switch (timeWindow) {
    case timeframeOptions.WEEK:
      utcStartTime = utcEndTime.subtract(1, 'week').endOf('day').unix() - 1
      break
    case timeframeOptions.MONTH:
      utcStartTime = utcEndTime.subtract(1, 'month').endOf('day').unix() - 1
      break
    case timeframeOptions.ALL_TIME:
      utcStartTime = utcEndTime.subtract(1, 'year').endOf('day').unix() - 1
      break
    default:
      utcStartTime = utcEndTime.subtract(1, 'year').startOf('year').unix() - 1
      break
  }
  return utcStartTime
}

export function getPoolLink(token0Address, token1Address = null, remove = false) {
  if (!token1Address) {
    return `https://mangoswap.ccian.cc/#/${remove ? `remove` : `add`}/${
      token0Address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ? 'ETH' : token0Address
    }/${'ETH'}`
  }
  return `https://mangoswap.ccian.cc/#/${remove ? `remove` : `add`}/${
    token0Address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ? 'ETH' : token0Address
  }/${token1Address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ? 'ETH' : token1Address}`
}

export function getSwapLink(token0Address, token1Address = null) {
  if (!token1Address) {
    return `https://mangoswap.ccian.cc/#/swap?inputCurrency=${token0Address}`
  }
  return `https://mangoswap.ccian.cc/#/swap?inputCurrency=${
    token0Address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ? 'ETH' : token0Address
  }&outputCurrency=${token1Address === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ? 'ETH' : token1Address}`
}

export function getMiningPoolLink(token0Address) {
  return `https://app.uniswap.org/#/uni/ETH/${token0Address}`
}

export function getUniswapAppLink(linkVariable) {
  const baseUniswapUrl = 'https://app.uniswap.org/#/uni'
  if (!linkVariable) {
    return baseUniswapUrl
  }

  return `${baseUniswapUrl}/ETH/${linkVariable}`
}

export function localNumber(val) {
  return Numeral(val).format('0,0')
}

export const toNiceDate = (date) => {
  const x = dayjs.utc(dayjs.unix(date)).format('MMM DD')
  return x
}

export const toWeeklyDate = (date) => {
  const lessDays = day === 6 ? 0 : day + 1
  const wkStart = new Date(new Date(date).setDate(date.getDate() - lessDays))
  const wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))
  const formatted = dayjs.utc(dayjs.unix(date))
  date = new Date(formatted)
  const day = new Date(formatted).getDay()
  return `${dayjs.utc(wkStart).format('MMM DD')} - ${dayjs.utc(wkEnd).format('MMM DD')}`
  // dayjs.utc(wkStart).format('MMM DD') + ' - ' + dayjs.utc(wkEnd).format('MMM DD')
}

export function getTimestampsForChanges() {
  const utcCurrentTime = dayjs.unix(parseInt(Date.now() / 1000))
  const t1 = utcCurrentTime.subtract(1, 'day').startOf('minute').unix()
  const t2 = utcCurrentTime.subtract(2, 'day').startOf('minute').unix()
  const tWeek = utcCurrentTime.subtract(1, 'week').startOf('minute').unix()
  return [t1, t2, tWeek]
}

export async function splitQuery(query, localClient, vars, list, skipCount = 100) {
  let fetchedData = {}
  let allFound = false
  let skip = 0

  while (!allFound) {
    let end = list.length
    if (skip + skipCount < list.length) {
      end = skip + skipCount
    }
    const sliced = list.slice(skip, end)
    const result = await localClient.query({
      query: query(...vars, sliced),
      fetchPolicy: 'cache-first',
    })
    fetchedData = {
      ...fetchedData,
      ...result.data,
    }
    if (Object.keys(result.data).length < skipCount || skip + skipCount > list.length) {
      allFound = true
    } else {
      skip += skipCount
    }
  }

  return fetchedData
}

/**
 * @notice Fetches first block after a given timestamp
 * @dev Query speed is optimized by limiting to a 600-second period
 * @param {Int} timestamp in seconds
 */
export async function getBlockFromTimestamp(timestamp) {
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

/**
 * @notice Fetches block objects for an array of timestamps.
 * @dev blocks are returned in chronological order (ASC) regardless of input.
 * @dev blocks are returned at string representations of Int
 * @dev timestamps are returns as they were provided; not the block time.
 * @param {Array} timestamps
 */
export async function getBlocksFromTimestamps(timestamps, skipCount = 500) {
  if (timestamps?.length === 0) {
    return []
  }

  const fetchedData = await splitQuery(GET_BLOCKS, blockClient, [], timestamps, skipCount)

  const blocks = []
  // if (fetchedData) {
  //   const keys = Object.keys(fetchedData);
  //   for (let k = 0; k < keys.length; ++k) {
  //     if (fetchedData.length) {
  //       blocks.push({
  //         timestamp: keys[k].split("t")[1],
  //         number: fetchedData[keys[k]][0].number,
  //       })
  //     }
  //   }
  if (fetchedData) {
    // eslint-disable-next-line
    for (const t in fetchedData) {
      if (fetchedData[t].length > 0) {
        blocks.push({
          timestamp: t.split('t')[1],
          // eslint-disable-next-line
          number: fetchedData[t][0]['number'],
        })
      }
    }
  }
  return blocks
}

export async function getLiquidityTokenBalanceOvertime(account, timestamps) {
  // get blocks based on timestamps
  const blocks = await getBlocksFromTimestamps(timestamps)

  // get historical share values with time travel queries
  const result = await client.query({
    query: SHARE_VALUE(account, blocks),
    fetchPolicy: 'cache-first',
  })

  const values = []
  const dataKeys = Object.keys(result?.data)
  for (let i = 0; i < dataKeys.length; ++i) {
    const timestamp = dataKeys[i].split('t')[1]
    if (timestamp) {
      values.push({
        timestamp,
        balance: 0,
      })
    }
  }
  // for (var row in result?.data) {
  //   let timestamp = row.split('t')[1]
  //   if (timestamp) {
  //     values.push({
  //       timestamp,
  //       balance: 0,
  //     })
  //   }
  // }
}

/**
 * @notice Example query using time travel queries
 * @dev TODO - handle scenario where blocks are not available for a timestamps (e.g. current time)
 * @param {String} pairAddress
 * @param {Array} timestamps
 */
export async function getShareValueOverTime(pairAddress, timestamps) {
  if (!timestamps) {
    const utcCurrentTime = dayjs.unix(parseInt(Date.now() / 1000))
    const utcSevenDaysBack = utcCurrentTime.subtract(8, 'day').unix()
    timestamps = getTimestampRange(utcSevenDaysBack, 86400, 7)
  }

  // get blocks based on timestamps
  const blocks = await getBlocksFromTimestamps(timestamps)

  // get historical share values with time travel queries
  const result = await client.query({
    query: SHARE_VALUE(pairAddress, blocks),
    fetchPolicy: 'cache-first',
  })

  const values = []
  const resultKeys = Reflect.ownKeys(result?.data)
  for (let i = 0; i < resultKeys.length; ++i) {
    const row = resultKeys[i]
    const timestamp = row.split('t')[1]
    const sharePriceUsd = parseFloat(result.data[row]?.reserveUSD) / parseFloat(result.data[row]?.totalSupply)
    if (timestamp) {
      values.push({
        timestamp,
        sharePriceUsd,
        totalSupply: result.data[row].totalSupply,
        reserve0: result.data[row].reserve0,
        reserve1: result.data[row].reserve1,
        reserveUSD: result.data[row].reserveUSD,
        token0DerivedETH: result.data[row].token0.derivedETH,
        token1DerivedETH: result.data[row].token1.derivedETH,
        roiUsd: values && values[0] ? sharePriceUsd / values[0].sharePriceUsd : 1,
        ethPrice: 0,
        token0PriceUSD: 0,
        token1PriceUSD: 0,
      })
    }
  }
  // for (var row in result?.data) {
  //   let timestamp = row.split('t')[1]
  //   let sharePriceUsd = parseFloat(result.data[row]?.reserveUSD) / parseFloat(result.data[row]?.totalSupply)
  //   if (timestamp) {
  //     values.push({
  //       timestamp,
  //       sharePriceUsd,
  //       totalSupply: result.data[row].totalSupply,
  //       reserve0: result.data[row].reserve0,
  //       reserve1: result.data[row].reserve1,
  //       reserveUSD: result.data[row].reserveUSD,
  //       token0DerivedETH: result.data[row].token0.derivedETH,
  //       token1DerivedETH: result.data[row].token1.derivedETH,
  //       roiUsd: values && values[0] ? sharePriceUsd / values[0]['sharePriceUsd'] : 1,
  //       ethPrice: 0,
  //       token0PriceUSD: 0,
  //       token1PriceUSD: 0,
  //     })
  //   }
  // }

  // add eth prices
  let index = 0
  const dataKeys = Reflect.ownKeys(result?.data)
  for (let i = 0; i < resultKeys.length; ++i) {
    const brow = resultKeys[i]
    const timestamp = brow.split('b')[1]
    if (timestamp) {
      values[index].ethPrice = result.data[brow].ethPrice
      values[index].token0PriceUSD = result.data[brow].ethPrice * values[index].token0DerivedETH
      values[index].token1PriceUSD = result.data[brow].ethPrice * values[index].token1DerivedETH
      index += 1
    }
  }
  // for (var brow in result?.data) {
  //   let timestamp = brow.split('b')[1]
  //   if (timestamp) {
  //     values[index].ethPrice = result.data[brow].ethPrice
  //     values[index].token0PriceUSD = result.data[brow].ethPrice * values[index].token0DerivedETH
  //     values[index].token1PriceUSD = result.data[brow].ethPrice * values[index].token1DerivedETH
  //     index += 1
  //   }
  // }

  return values
}

/**
 * @notice Creates an evenly-spaced array of timestamps
 * @dev Periods include a start and end timestamp. For example, n periods are defined by n+1 timestamps.
 * @param {Int} timestamp_from in seconds
 * @param {Int} period_length in seconds
 * @param {Int} periods
 */
export function getTimestampRange(timestamp_from, period_length, periods) {
  const timestamps = []
  for (let i = 0; i <= periods; i++) {
    timestamps.push(timestamp_from + i * period_length)
  }
  return timestamps
}

export const toNiceDateYear = (date) => dayjs.utc(dayjs.unix(date)).format('MMMM DD, YYYY')

export const isAddress = (value) => {
  try {
    return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

export const toK = (num) => {
  return Numeral(num).format('0.[00]a')
}

export const setThemeColor = (theme) => document.documentElement.style.setProperty('--c-token', theme || '#333333')

export const Big = (number) => new BigNumber(number)

export const urls = {
  showTransaction: (tx) => `https://www.oklink.com/okexchain/tx/${tx}/`,
  showAddress: (address) => `https://www.oklink.com/okexchain/address/${address}/`,
  showToken: (address) => `https://www.oklink.com/okexchain/token/${address}/`,
  showBlock: (block) => `https://www.oklink.com/okexchain/block/${block}/`,
}

export const formatTime = (unix) => {
  const now = dayjs.unix(parseInt(Date.now() / 1000))
  const timestamp = dayjs.unix(unix)

  const inSeconds = now.diff(timestamp, 'second')
  const inMinutes = now.diff(timestamp, 'minute')
  const inHours = now.diff(timestamp, 'hour')
  const inDays = now.diff(timestamp, 'day')
  let result = ''

  if (inHours >= 24) {
    result = `${inDays} ${inDays === 1 ? 'day' : 'days'} ago`
  } else if (inMinutes >= 60) {
    result = `${inHours} ${inHours === 1 ? 'hour' : 'hours'} ago`
  } else if (inSeconds >= 60) {
    result = `${inMinutes} ${inMinutes === 1 ? 'minute' : 'minutes'} ago`
  } else {
    result = `${inSeconds} ${inSeconds === 1 ? 'second' : 'seconds'} ago`
  }

  return result
}

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// using a currency library here in case we want to add more in future
export const formatDollarAmount = (num, digits) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
  return formatter.format(num)
}

export const toSignificant = (number, significantDigits) => {
  Decimal.set({ precision: significantDigits + 1, rounding: Decimal.ROUND_UP })
  const updated = new Decimal(number).toSignificantDigits(significantDigits)
  return updated.toFormat(updated.decimalPlaces(), { groupSeparator: '' })
}

export const formattedNum = (number, usd = false, acceptNegatives = true) => {
  if (Number.isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0' : 0
  }
  const num = parseFloat(number)

  if (acceptNegatives && num > 500000000) {
    return (usd ? '$' : '') + toK(num.toFixed(0), true)
  }

  if (num === 0) {
    if (usd) {
      return '$0'
    }
    return 0
  }

  if (num < 0.0001 && num > 0) {
    return usd ? '< $0.0001' : '< 0.0001'
  }

  if (num > 1000) {
    return usd ? formatDollarAmount(num, 0) : Number(parseFloat(num).toFixed(0)).toLocaleString()
  }

  if (usd) {
    if (num < 0.1) {
      formatDollarAmount(num, 4)
    } else {
      formatDollarAmount(num, 2)
    }
  }

  return Number(parseFloat(num).toFixed(5)).toLocaleString()
}

export function rawPercent(percentRaw) {
  const percent = parseFloat(percentRaw * 100)
  if (!percent || percent === 0) {
    return '0%'
  }
  if (percent < 1 && percent > 0) {
    return '< 1%'
  }
  return `${percent.toFixed(0)}%`
}

export function formattedPercent(percent, useBrackets = false) {
  percent = parseFloat(percent)
  if (!percent || percent === 0) {
    //  eslint-disable-next-line
    return <Text fontWeight={500}>0%</Text>
  }

  if (percent < 0.0001 && percent > 0) {
    return (
      //  eslint-disable-next-line
      <Text fontWeight={500} color="green">
        {'< 0.0001%'}
      </Text>
    )
  }

  if (percent < 0 && percent > -0.0001) {
    return (
      //  eslint-disable-next-line
      <Text fontWeight={500} color="red">
        {'< 0.0001%'}
      </Text>
    )
  }

  const fixedPercent = percent.toFixed(2)
  if (fixedPercent === '0.00') {
    return '0%'
  }
  let resText = ''
  if (fixedPercent > 0) {
    if (fixedPercent > 100) {
      //  eslint-disable-next-line
      resText = <Text fontWeight={500} color="green">{`+${percent?.toFixed(0).toLocaleString()}%`}</Text>
    } else {
      //  eslint-disable-next-line
      resText = <Text fontWeight={500} color="green">{`+${fixedPercent}%`}</Text>
    }
  } else {
    //  eslint-disable-next-line
    resText = <Text fontWeight={500} color="red">{`${fixedPercent}%`}</Text>
  }
  return resText
}

/**
 * gets the amoutn difference plus the % change in change itself (second order change)
 * @param {*} valueNow
 * @param {*} value24HoursAgo
 * @param {*} value48HoursAgo
 */
export const get2DayPercentChange = (valueNow, value24HoursAgo, value48HoursAgo) => {
  // get volume info for both 24 hour periods
  const currentChange = parseFloat(valueNow) - parseFloat(value24HoursAgo)
  const previousChange = parseFloat(value24HoursAgo) - parseFloat(value48HoursAgo)

  const adjustedPercentChange = (parseFloat(currentChange - previousChange) / parseFloat(previousChange)) * 100

  if (Number.isNaN(adjustedPercentChange) || !Number.isFinite(adjustedPercentChange)) {
    return [currentChange, 0]
  }
  return [currentChange, adjustedPercentChange]
}

/**
 * get standard percent change between two values
 * @param {*} valueNow
 * @param {*} value24HoursAgo
 */
export const getPercentChange = (valueNow, value24HoursAgo) => {
  const adjustedPercentChange =
    ((parseFloat(valueNow) - parseFloat(value24HoursAgo)) / parseFloat(value24HoursAgo)) * 100
  if (Number.isNaN(adjustedPercentChange) || !Number.isFinite(adjustedPercentChange)) {
    return 0
  }
  return adjustedPercentChange
}

export function isEquivalent(a, b) {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}

export function isNotVoid(v) {
  return v !== undefined && v !== null
}
