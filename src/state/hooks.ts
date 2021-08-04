import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import store, { useAppDispatch } from 'state'
import { orderBy } from 'lodash'
import Nfts from 'config/constants/nfts'
import { getWeb3NoAccount } from 'utils/web3'
import { getAddress, getKnsPoolAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
// import { fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, setBlock } from './actions'
import useTimer from 'hooks/useTimer'
import { numToWei, weiToNum, weiToNumber } from 'utils/useBigNumber'
import { getKnsContract, getKnsPoolContract } from 'utils/contractHelpers'
import { getTokenPriceUsd } from 'contexts/GlobalData'
import { State, Farm, Pool, AchievementState, PriceState, FarmsState } from './types'
import { fetchAchievements } from './achievements'
import { fetchWalletNfts } from './collectibles'
import { fetchPrices } from './prices'
import {
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  // fetchCakeVaultPublicData,
  // fetchCakeVaultUserData,
  // fetchCakeVaultFees,
  setBlock,
} from './actions'

export const usePoolFetchPublicData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    console.log('get', store.getState())
    // dispatch(fetchPoolsPublicDataAsync() as any)
    fetchPoolsPublicDataAsync()(dispatch)
    fetchFarmsPublicDataAsync()(dispatch, store.getState)
    // dispatch(fetchFarmsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => {
    // console.log('>>>>>Farm State', state)
    return state.farms.data.find((f) => f.pid === pid)
  })
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

export const useFetchPriceList = () => {
  const dispatch = useAppDispatch()
  fetchPrices(dispatch)
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromSymbol(symbol)
  const tokenPriceInUsd = useGetApiPrice(getAddress(farm.token.address))

  return farm.lpTotalSupply && farm.lpTotalInQuoteToken
    ? new BigNumber(getBalanceNumber(farm.lpTotalSupply)).div(farm.lpTotalInQuoteToken).times(tokenPriceInUsd).times(2)
    : BIG_ZERO
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      // dispatch(fetchPoolsUserDataAsync(account) as any)
      fetchPoolsUserDataAsync(account)(dispatch)
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools?.data)
  console.log('---pools---', pools)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

interface knsInfoType {
  amount: string
  rewardDebt: string
}
/**
 * kns info
 * 2020/08 add pid
 */
export const useKnsPoolInfo = ({
  account,
  decimals = 18,
  pid,
}: {
  account: string
  decimals?: number
  pid: number
}): knsInfoType => {
  const [balance, setbalance] = useState<knsInfoType>({ amount: '0', rewardDebt: '0' })
  const reload = useTimer()
  useEffect(() => {
    if (account) {
      const contract = getKnsPoolContract()
      contract.methods
        .userInfo(pid, account)
        .call()
        .then(async (e: knsInfoType) => {
          let _decimals = decimals
          if (!_decimals) {
            try {
              _decimals = await contract.methods.decimals().call()
            } catch (error) {
              console.error(error)
            }
          }
          setbalance({
            amount: weiToNum(e.amount, _decimals),
            rewardDebt: weiToNum(e.rewardDebt, _decimals),
          })
        })
    }
  }, [account, decimals, reload, pid])
  return balance
}

/**
 * ERC20 balance
 */
export const useErc20Balance = ({
  account,
  contract,
  decimals = 18,
}: {
  account: string
  contract: any
  decimals?: number
}): string => {
  const [balance, setbalance] = useState('0')
  const reload = useTimer()
  useEffect(() => {
    if (account) {
      contract?.methods
        ?.balanceOf(account)
        .call()
        .then(async (e: string) => {
          let _decimals = decimals
          if (!_decimals) {
            try {
              _decimals = await contract.methods.decimals().call()
            } catch (error) {
              console.log(error)
            }
          }
          setbalance(weiToNum(e, _decimals))
        })
    }
    // eslint-disable-next-line
  }, [account, decimals, reload])
  return balance
}

export const usePoolLastTime = ({ contract }: { contract: any }): string => {
  const [lastBlock, setLastBlock] = useState('')
  // const reload = useTimer()
  useEffect(() => {
    contract?.methods
      ?.lastRewardBlock()
      .call()
      .then(async (e: string) => {
        console.log(e)
      })
    // eslint-disable-next-line
  }, [])
  return lastBlock
}

// 2020/08 add pid pool
export const usePoolTotalStake = ({ contract, pid }: { contract: any; pid: number }): number => {
  const [stake, setStake] = useState(0)
  useEffect(() => {
    try {
      contract?.methods
        ?.poolInfo(pid)
        ?.call()
        .then(async (e: { totalAmount: string }) => {
          // token wei
          const _stake = weiToNumber(e.totalAmount, 18)
          setStake(_stake)
        })
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line
  }, [])
  return stake
}

// 2020/08 add pid
export const useKnsReward = ({ contract, account, pid }: { contract: any; account: string; pid }) => {
  const [reward, setReward] = useState('0')
  const reload = useTimer()
  useEffect(() => {
    if (account) {
      contract?.methods
        ?.pendingMgs(pid, account)
        .call()
        .then(async (e: string) => {
          setReward(weiToNum(e, 18))
        })
    }
    // eslint-disable-next-line
  }, [account, reload])
  return reward
}

export const useKnsBalance = ({ account }: { account: string }) => {
  const balance = useErc20Balance({ account, contract: getKnsContract() })
  return balance
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account) as any)
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  // const prices = useSelector((state: State) => state.prices)
  return prices
}

export const useGetApiPrice = (symbol: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }

  return prices[symbol.toLowerCase()]
}

export const usePriceBnbBusd = (): any => {
  const bnbBusdFarm = useFarmFromPid(0)
  // const bnbBusdFarm = useFarmFromPid(5)
  return bnbBusdFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdFarm.tokenPriceVsQuote) : BIG_ZERO
}

export const usePriceCakeBusd = (): any => {
  const cakeBnbFarm = useFarmFromPid(0)
  // const cakeBnbFarm = useFarmFromPid(5)
  const bnbBusdPrice = usePriceBnbBusd()
  const cakeBusdPrice = cakeBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(cakeBnbFarm.tokenPriceVsQuote) : BIG_ZERO

  return cakeBusdPrice
}

/** 计算 KSN/USDT 价格
 *  KNS/OKT * OKT/USDT ==> KNS/USDT
 */
export const usePriceKNSUSDT = (): BigNumber => {
  const KNSOKTFarm = useFarmFromPid(5)
  const OKTUSDTFarm = useFarmFromPid(3)
  const priceOKTUSDT = OKTUSDTFarm.tokenPriceVsQuote ? new BigNumber(OKTUSDTFarm.tokenPriceVsQuote) : BIG_ZERO
  return KNSOKTFarm.tokenPriceVsQuote ? priceOKTUSDT.times(KNSOKTFarm.tokenPriceVsQuote) : BIG_ZERO
}

export const useKnsPriceUsdt = (): BigNumber => {
  const [price, setPrice] = useState(BIG_ZERO)
  const init = async () => {
    const knsUsdPrice = await getTokenPriceUsd('KNS')
    setPrice(new BigNumber(numToWei(knsUsdPrice)))
  }
  useEffect(() => {
    init()
  }, [])
  return price
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => {
    return state.block
  })
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

// Predictions
export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isChartPaneOpen)
}

export const useGetRounds = () => {
  return useSelector((state: State) => state.predictions.rounds)
}

export const useGetSortedRounds = () => {
  const roundData = useGetRounds()
  return orderBy(Object.values(roundData), ['epoch'], ['asc'])
}

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.predictions.currentEpoch)
}

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.predictions.intervalBlocks)
}

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.predictions.bufferBlocks)
}

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks()
  const bufferBlocks = useGetBufferBlocks()
  return intervalBlocks + bufferBlocks
}

export const useGetRound = (id: string) => {
  const rounds = useGetRounds()
  return rounds[id]
}

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()
  return rounds.find((round) => round.epoch === currentEpoch)
}

export const useGetPredictionsStatus = () => {
  return useSelector((state: State) => state.predictions.status)
}

export const useGetHistoryFilter = () => {
  return useSelector((state: State) => state.predictions.historyFilter)
}

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state: State) => state.predictions.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state: State) => state.predictions.minBetAmount)
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount])
}

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.predictions.isFetchingHistory)
}

export const useGetHistory = () => {
  return useSelector((state: State) => state.predictions.history)
}

export const useGetHistoryByAccount = (account: string) => {
  const bets = useGetHistory()
  return bets ? bets[account] : []
}

export const useGetBetByRoundId = (account: string, roundId: string) => {
  const bets = useSelector((state: State) => state.predictions.bets)

  if (!bets[account]) {
    return null
  }

  if (!bets[account][roundId]) {
    return null
  }

  return bets[account][roundId]
}

// Collectibles
export const useGetCollectibles = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { isInitialized, isLoading, data } = useSelector((state: State) => state.collectibles)
  const identifiers = Object.keys(data)

  useEffect(() => {
    // Fetch nfts only if we have not done so already
    if (!isInitialized) {
      dispatch(fetchWalletNfts(account) as any)
    }
  }, [isInitialized, account, dispatch])

  return {
    isInitialized,
    isLoading,
    tokenIds: data,
    nftsInWallet: Nfts.filter((nft) => identifiers.includes(nft.identifier)),
  }
}
