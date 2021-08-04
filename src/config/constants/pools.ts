// import tokens from './tokens'
// import { PoolConfig, PoolCategory } from './types'

// const pools: PoolConfig[] = [
//   {
//     sousId: 0,
//     stakingToken: tokens.cake,
//     earningToken: tokens.okt,
//     contractAddress: {
//       65: '0x2F2EafBBAD9EaD1DA1407c785e9be77ba2F11FE5',
//       56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
//     },
//     poolCategory: PoolCategory.CORE,
//     harvest: true,
//     tokenPerBlock: '10',
//     sortOrder: 1,
//     isFinished: false,
//   },
// ]

// export default pools

import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.usdt,
    earningToken: tokens.mgs,
    contractAddress: {
      65: '0x2F2EafBBAD9EaD1DA1407c785e9be77ba2F11FE5',
      66: '0x4D4D900ca38236C0133b80c7ad2f9006cD027428',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
