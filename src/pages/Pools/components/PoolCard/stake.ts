import { useState } from 'react'
import { numToWei } from 'utils/useBigNumber'
import { Contract } from 'web3-eth-contract'

export interface supplyContractParams {
  contract: Contract
  amount: number
  account: string
  decimals: number
  pid: number
}

export interface InterfaceUnStake {
  contract: Contract
  account: string
  amount: number
}
// 2020/08 add pid
const knsStake = ({ contract, account, amount, decimals, pid }: supplyContractParams) => {
  return contract.methods.deposit(pid, numToWei(amount)).send({ from: account })
}
export const knsUnStake = ({ contract, account, amount }: InterfaceUnStake) => {
  return contract.methods.withdraw(numToWei(amount)).send({ from: account })
}

export default knsStake
