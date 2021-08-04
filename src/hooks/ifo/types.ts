import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { IfoStatus } from 'config/constants/types'

// PoolCharacteristics retrieved from the contract
export interface PoolCharacteristics {
  raisingAmountPool: BigNumber
  offeringAmountPool: BigNumber
  limitPerUserInLP: BigNumber
  taxRate: number
  totalAmountPool: BigNumber
  sumTaxesOverflow: BigNumber
}

// IFO data unrelated to the user returned by useGetPublicIfoData
export interface PublicIfoData {
  status: IfoStatus
  blocksRemaining: number
  secondsUntilStart: number
  progress: number
  secondsUntilEnd: number
  startBlockNum: number
  endBlockNum: number
  currencyPriceInUSD: BigNumber
  numberPoints: number
  fetchIfoData: () => void
  poolBasic?: PoolCharacteristics
  poolUnlimited: PoolCharacteristics
}

// User specific pool characteristics
export interface UserPoolCharacteristics {
  amountTokenCommittedInLP: BigNumber // @contract: amountPool
  offeringAmountInToken: BigNumber // @contract: userOfferingAmountPool
  refundingAmountInLP: BigNumber // @contract: userRefundingAmountPool
  taxAmountInLP: BigNumber // @contract: userTaxAmountPool
  hasClaimed: boolean // @contract: claimedPool
  isPendingTx: boolean
}

// Use only inside the useGetWalletIfoData hook
export interface WalletIfoState {
  poolBasic?: UserPoolCharacteristics
  poolUnlimited: UserPoolCharacteristics
}

// Returned by useGetWalletIfoData
export interface WalletIfoData extends WalletIfoState {
  allowance: BigNumber
  contract: Contract
  setPendingTx: (status: boolean, poolId: any) => void
  setIsClaimed: (poolId: any) => void
  fetchIfoData: () => void
}
