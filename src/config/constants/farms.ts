// import farmTokens from './farmTokens'
// import { FarmConfig } from './types'

// const farms: FarmConfig[] = [
//   /** KNS-OKT */
//   {
//     pid: 5,
//     lpSymbol: 'MGS-OKT LP',
//     multiplier: '40X',
//     lpAddresses: {
//       65: '0x8b61e6513233b2c1d2d7cdabd7d6423cace832b3',
//       56: '',
//     },
//     token: farmTokens.kns,
//     quoteToken: farmTokens.okt,
//   },
// ]

// export default farms

import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'MGS-USDT LP',
    multiplier: '46X',
    lpAddresses: {
      65: '0x8b61e6513233b2c1d2d7cdabd7d6423cace832b3',
      66: '0xBBdEd711b4Fe8068Aa33285A91B44E092D1E0c81',
    },
    token: tokens.mgs,
    quoteToken: tokens.usdt,
  },
]

export default farms
