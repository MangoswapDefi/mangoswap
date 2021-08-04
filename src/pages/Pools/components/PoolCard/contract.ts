import { AbiItem } from 'web3-utils'
import { getAddress, getKnsPoolAddress, get_KNS_address } from 'utils/addressHelpers'
import { getWeb3NoAccount, GetWeb3Account } from 'utils/web3'
import knsAbi from 'config/abi/fristMine-kns.json'
import knsPoolAbi from 'config/abi/kns-pool.json'
import { ERC20_ABI } from 'constants/abis/erc20'
import { Address } from 'config/constants/types'

export const InitKnsContract = () => {
  const web3 = GetWeb3Account()
  const contract = new web3.eth.Contract(knsAbi as unknown as AbiItem, get_KNS_address())
  return contract
}
export const getTokenContract = (token: Address) => {
  const web3 = GetWeb3Account()
  const contract = new web3.eth.Contract(ERC20_ABI as unknown as AbiItem, getAddress(token))
  return contract
}
export const InitKnsPoolContract = () => {
  const web3 = GetWeb3Account()
  const contract = new web3.eth.Contract(knsPoolAbi as unknown as AbiItem, getKnsPoolAddress())
  return contract
}
