export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}
export interface Address {
  65?: string
  56?: string
  66?: string
}

export const PoolIds = {
  poolBasic: 'poolBasic',
  poolUnlimited: 'poolUnlimited',
}

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

export interface IfoPoolInfo {
  saleAmount: string
  raiseAmount: string
  raiseAmountNumber: number
  cakeToBurn: string
  distributionRatio: number // Range [0-1]
  amountTotal0: number
  amountTotal1: number
  duration: number
  openAt: number
  closeAt: number
  claimDelaySec: number
}

export interface Ifo {
  id: string
  pid: number
  isActive: boolean
  projectSite: string
  projectIntro: string[]
  address: string
  name: string
  name2: string
  currency: Token
  token: Token
  quoteToken: Token
  sellToken: Token
  releaseBlockNumber: number
  articleUrl: string
  campaignId: string
  tokenOfferingPrice: number
  isV1: boolean
  poolBasic?: IfoPoolInfo
  poolUnlimited: IfoPoolInfo
}

export const PoolCategory = {
  COMMUNITY: 'Community',
  CORE: 'Core',
  BINANCE: 'Binance', // Pools using native OKT behave differently than pools using a token
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId?: number
  earningToken?: Token
  stakingToken?: Token
  stakingLimit?: number
  contractAddress?: Address
  poolCategory?: any
  tokenPerBlock?: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type NftSource = {
  [key in NftType]: {
    address: Address
    identifierKey: string
  }
}

export enum NftType {
  PANCAKE = 'pancake',
  MIXIE = 'mixie',
}

export type Nft = {
  description: string
  name: string
  images: NftImages
  sortOrder: number
  type: NftType
  video?: NftVideo

  // Uniquely identifies the nft.
  // Used for matching an NFT from the config with the data from the NFT's tokenURI
  identifier: string

  // Used to be "bunnyId". Used when minting NFT
  variationId?: number | string
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo' | 'teambattle'

export type Campaign = {
  id: string
  type: CampaignType
  title?: any
  description?: any
  badge?: string
}

export type PageMeta = {
  title: string
  description: string
  image: string
}
