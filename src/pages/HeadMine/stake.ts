import { useState } from 'react'
import { numToWei } from 'utils/useBigNumber';
import { Contract, ContractOptions } from 'web3-eth-contract';
import { supplyContractParams } from './card';

export interface InterfaceUnStake { contract: Contract; account: string; amount: number }
const HeadMineStake = ({ contract, account, amount, erc20, decimals }: supplyContractParams) => {
  // OKT/ETH
  // console.log(contract, account, amount, erc20)
  if (!erc20) {
    return contract.methods.stake(numToWei(amount)).send({ from: account, value: numToWei(amount) })
  }
  // ERC20
  return contract.methods.stake(numToWei(amount, decimals)).send({ from: account })
}
export const HeadMineUnStake = ({ contract, account, amount }: InterfaceUnStake) => {
  return contract.methods.withdraw(numToWei(amount)).send({ from: account })
}

export default HeadMineStake