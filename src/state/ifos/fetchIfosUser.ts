import BigNumber from "bignumber.js";
import { AbiItem } from 'web3-utils'
// import { useIfoV2Contract } from "hooks/useContract"
import { getAddress } from "utils/addressHelpers"
import multicall from "utils/multicall"
import erc20ABI from 'config/abi/erc20.json'
import { Ifo } from "config/constants/types";
import ifoV2Abi from 'config/abi/ifoV2.json'
import { weiToNum } from "utils/useBigNumber";
import { useIfoV2Contract } from "hooks/useContract";
import { ifoMasterAddress } from "config/constants/ifo";
import { getWeb3NoAccount } from "utils/web3";

export const fetchIfosAllowances = async (account: string, IfoToFetch: Ifo[]) => {
  
  const calls = IfoToFetch.map((ifo) => {
    const masterChefAddress = ifo.address
    const lpContractAddress = getAddress(ifo.currency.address)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchIfosBalance = async (account: string, IfoToFetch: Ifo[]) => {
  
  const calls = IfoToFetch.map((ifo) => {
    const lpContractAddress = getAddress(ifo.currency.address)
    return { address: lpContractAddress, name: 'balanceOf', params: [account] }
  })

  const rawLpBlance = await multicall(erc20ABI, calls)
  return rawLpBlance.map((tokenBalance) => {
    return weiToNum(tokenBalance)
  })
}

export const fetchIfosLpStakeInfo = async (account: string, IfoToFetch: Ifo[]) => {
  const web3 = getWeb3NoAccount()
  const calls = IfoToFetch.map((ifo) => {
    return { name: 'myAmountSwapped1', params: [account, ifo.pid] }
  })
  const contract = new web3.eth.Contract((ifoV2Abi as unknown) as AbiItem, ifoMasterAddress)
  const stakes = await Promise.all(
    calls.map(v => {
      return contract.methods[v.name](...v.params).call()
    })
  )
  return stakes.map((tokenBalance) => {
    return weiToNum(tokenBalance)
  })
}

export const fetchIfosTotalStakeInfo = async (IfoToFetch: Ifo[]) => {
  const web3 = getWeb3NoAccount()
  const calls = IfoToFetch.map((ifo) => {
    return { name: 'amountSwap1P', params: [ifo.pid] }
  })
  const contract = new web3.eth.Contract((ifoV2Abi as unknown) as AbiItem, ifoMasterAddress)
  const stakes = await Promise.all(
    calls.map(v => {
      return contract.methods[v.name](...v.params).call()
    })
  )
  return stakes.map((tokenBalance) => {
    return weiToNum(tokenBalance)
  })
}
