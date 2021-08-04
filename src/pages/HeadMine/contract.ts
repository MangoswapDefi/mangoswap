import { AbiItem } from 'web3-utils'
import { getFristOkbMineAddress, getFristOktMineAddress, get_KNS_address, get_OKB_address } from "utils/addressHelpers"
import { getWeb3NoAccount, GetWeb3Account } from "utils/web3"
import oktAbi from '../../config/abi/headmine-okt.json'
import okbAbi from '../../config/abi/fristMine-okb.json'
import knsAbi from '../../config/abi/fristMine-kns.json'
import okbPoolAbi from '../../config/abi/fristMine-okb-pool.json'


export const getFristMineContract = (address: string, isOkb?: boolean) => {
  const web3 = getWeb3NoAccount()
  const contract = new web3.eth.Contract((isOkb ? okbPoolAbi : oktAbi as unknown) as AbiItem, address)
  return contract
}

export const InitHeadmineContract_Account = () => {
  const web3 = GetWeb3Account()
  const contract = new web3.eth.Contract((oktAbi as unknown) as AbiItem, getFristOktMineAddress())
  return contract
}
export const InitOkbFristMineContractAccount = () => {
  const web3 = GetWeb3Account()
  const contract = new web3.eth.Contract((okbPoolAbi as unknown) as AbiItem, getFristOkbMineAddress())
  return contract
}
export const Init_KNS_Contract_Account = () => {
  const web3 = GetWeb3Account()
  const contract = new web3.eth.Contract((knsAbi as unknown) as AbiItem, get_KNS_address())
  return contract
}
export const Init_OKB_pure_Contract_Account = () => {
  const web3 = GetWeb3Account()
  const contract = new web3.eth.Contract((okbAbi as unknown) as AbiItem, get_OKB_address())
  return contract
}