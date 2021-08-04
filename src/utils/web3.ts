import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'
import { useWeb3React } from '@web3-react/core'

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

let web3Provider
export const GetWeb3Account = () => {
  const { library } = useWeb3React()
  const init = async () => {
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        await (window.ethereum as any)?.enable();
      } catch (error) {
        console.error("User denied account access")
      }
    } else if (window.web3) {
      web3Provider = window.web3.currentProvider;
    } else {
      // web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
  }
  init()
  const provider = library?.provider || web3Provider
  return new Web3(provider)
}

export { getWeb3NoAccount }
export default web3NoAccount
