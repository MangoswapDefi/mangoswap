import BigNumber from 'bignumber.js'
import { formatNumber } from 'components/Info/utils'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, YEAR_SECOND,  BLOCKS_OKT_PER_YEAR, KNS_PER_BLOCK_DILIV } from 'config'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export const getApr = ({ totalStake }: { totalStake: number }) => {
  // const earn = 18 / 5
  // const totalYearEarn = earn * YEAR_SECOND
  // const myRatio = stake / totalStake <= 1 ? stake / totalStake : 1
  // const myYearEarn = totalYearEarn * myRatio
  // // TODO 
  // return (myYearEarn / stake * 100).toFixed(2)
  return (12449 * 3.47 * 18 * 365 / totalStake).toFixed(2)
}


// 每个币区块可以获得币的数量 乘以 每年获得的块   乘以  allocationPoint / totalAllocationPoint 乘以kns价格 除以 poolLiquidityUsd
/*
当前24小时产出的用于farms的KNS数量：22 * 12449=273, 878; 假定某个池子的权重为5 %，当前KNS的价格为4 usdt，lp池子的锁仓量为3, 000, 000 usdt
则当前这个池子KNS的APR＝273, 878 * 5 %＊4 * 365 * 100 % /3,000,000＝154.87%
 */

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (poolWeight: BigNumber, knsPriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyCakeRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apr = yearlyCakeRewardAllocation.times(knsPriceUsd).div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/** 
 * apr-KNS % 计算公式
 * mango [MGO] average ratio per year
 * algo: 22 * (60 / KNS_PER_BLOCK_DILIV(5)) * 60 * 24 * 365 * [poolWeight] * [keynePriceUsd] / [poolLiquidityUsd] * 100
 * 
 */
export const getFarmAprMango = (poolWeight: BigNumber, keynePriceUsd: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyKeyneRewardAllocation = KNS_PER_BLOCK_DILIV.times(BLOCKS_OKT_PER_YEAR).times(poolWeight);
  const apr = yearlyKeyneRewardAllocation.times(keynePriceUsd).div(poolLiquidityUsd).times(100);
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
}

export default null
