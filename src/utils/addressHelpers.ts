import address from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (_address: Address): string => {
  const mainNetChainId = 66
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? _address[chainId] : _address[mainNetChainId]
}

export const getCakeAddress = () => {
  return getAddress(tokens.kns.address)
}
export const getMasterChefAddress = () => {
  return getAddress(address.masterChef)
}

export const getOKTChefAddress = () => {
  return getAddress(address.oktChef)
}
export const getOktAddress = () => {
  return getAddress(tokens.okt.address)
}
export const getMulticallAddress = () => {
  return getAddress(address.multiCall)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(address.pointCenterIfo)
}
export const getFristOktMineAddress = () => {
  return getAddress(address.oktHeadMine)
}
export const getFristOkbMineAddress = () => {
  return getAddress(address.okbHeadMine)
}
export const getKnsPoolAddress = () => {
  return getAddress(address.KNSPOOL)
}
export const get_KNS_address = () => {
  return getAddress(tokens.kns.address)
}
export const get_OKB_address = () => {
  return getAddress(tokens.okb.address)
}
