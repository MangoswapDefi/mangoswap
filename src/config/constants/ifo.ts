import tokens from './tokens'
import farms from './farms'
import { Ifo, Token } from './types'

export const IfosDefaultActiveKey = []
export const ifoMasterAddress = '0x902F930C53A7B475cAF9782ea02d00EaDaFEb20E'
export const ifoProjectKey = 'id'
const ifos: Ifo[] = [
  {
    id: 'horizon',
    pid: 2,
    address: ifoMasterAddress,
    // address: '0x52ab9455eec37727a69a90e29b0ce86ebd9c1338',
    isActive: true,
    projectSite: 'https://baidu.com',
    projectIntro: ['A decentralized oracle network on OKchainA decentralized oracle network on OKchainA decentralized oracle.', 'network on OKchainA decentralized oracle network od oracle network on OKchainA decentralized oracle network on OKchain Adecentralized oracle network on OKchain.'],
    name: 'Ifo Coin 1',
    name2: 'A decentralized oracle network on OKExchain',
    poolBasic: {
      saleAmount: '3,000,000 HZN',
      raiseAmount: '$750,000',
      raiseAmountNumber: 750000,
      cakeToBurn: '$375,000',
      distributionRatio: 0.3,
      amountTotal0: 10000,
      amountTotal1: 10000,
      duration: 172800,
      openAt: 1622455000,
      closeAt: 1623576000,
      claimDelaySec: 60,
    },
    poolUnlimited: {
      saleAmount: '7,000,000 HZN',
      raiseAmount: '$1,750,000',
      raiseAmountNumber: 750000,
      cakeToBurn: '$875,000',
      distributionRatio: 0.7,
      amountTotal0: 10000,
      amountTotal1: 10000,
      duration: 172800,
      openAt: 1622455000,
      closeAt: 1623576000,
      claimDelaySec: 60,
    },
    /**
     * lp address
     */
    currency: {
      symbol: 'okt-kns',
      address: {
        65: '0x8b61e6513233b2c1d2d7cdabd7d6423cace832b3'
      },
      decimals: 18,
    },
    token: tokens.okt,
    quoteToken: tokens.kns,
    sellToken: {
      symbol: 'Ifo Coin 1',
      address: {
        65: ' 0x294D88b17f858b9a57B23bd922D4Ef8C1a23416c',
      },
      decimals: 18,
    },
    releaseBlockNumber: 6581111,
    campaignId: '511090000',
    articleUrl: 'https://pancakeswap.medium.com/horizon-protocol-hzn-ifo-to-be-hosted-on-pancakeswap-51f79601c9d8',
    tokenOfferingPrice: 0.25,
    isV1: false,
  },
  {
    id: 'horizon',
    pid: 3,
    address: ifoMasterAddress,
    // address: '0x52ab9455eec37727a69a90e29b0ce86ebd9c1338',
    isActive: true,
    projectSite: 'https://baidu.com',
    projectIntro: ['A decentralized oracle network on OKchainA decentralized oracle network on OKchainA decentralized oracle.', 'network on OKchainA decentralized oracle network od oracle network on OKchainA decentralized oracle network on OKchain Adecentralized oracle network on OKchain.'],
    name: 'Ifo Coin 2',
    name2: 'A decentralized oracle network on OKExchain',
    poolBasic: {
      saleAmount: '3,000,000 HZN',
      raiseAmount: '$750,000',
      raiseAmountNumber: 750000,
      cakeToBurn: '$375,000',
      distributionRatio: 0.3,
      amountTotal0: 10000,
      amountTotal1: 10000,
      duration: 172800,
      openAt: 1622455000,
      closeAt: 1623576000,
      claimDelaySec: 60,
    },
    poolUnlimited: {
      saleAmount: '7,000,000 HZN',
      raiseAmount: '$1,750,000',
      raiseAmountNumber: 750000,
      cakeToBurn: '$875,000',
      distributionRatio: 0.7,
      amountTotal0: 10000,
      amountTotal1: 10000,
      duration: 172800,
      openAt: 1622455000,
      closeAt: 1623576000,
      claimDelaySec: 60,
    },
    /**
     * lp address
     */
    currency: {
      symbol: 'okb-kns',
      address: {
        65: '0x2f491993f4025c668d356fc04a79b477eec9624e'
      },
      decimals: 18,
    },
    token: tokens.okb,
    quoteToken: tokens.kns,
    sellToken: {
      symbol: 'Ifo Coin 2',
      address: {
        65: ' 0x46724c2a365474a0c7981E4BC2Df81586BF6834B',
      },
      decimals: 18,
    },
    releaseBlockNumber: 6581111,
    campaignId: '511090000',
    articleUrl: 'https://pancakeswap.medium.com/horizon-protocol-hzn-ifo-to-be-hosted-on-pancakeswap-51f79601c9d8',
    tokenOfferingPrice: 0.25,
    isV1: false,
  },
]

export default ifos
