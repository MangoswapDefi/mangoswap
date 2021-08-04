import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTimer } from './useTimer'

// Retrieve IFO allowance
export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any): BigNumber => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(BIG_ZERO)
  const reload = useTimer()
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, spenderAddress).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        console.error(e)
      }
    }

    if (account) {
      fetch()
    }

  // eslint-disable-next-line
  }, [account, spenderAddress, reload])

  return allowance
}

// Retrieve allowance
export const useAllowance = useIfoAllowance

export default useIfoAllowance



// import { AbiItem } from 'web3-utils'
// import Web3 from 'web3'
// import { useCake } from './useContract'
// import useRefresh from './useRefresh'
// import useWeb3 from './useWeb3'
// import bep20Abi from '../config/abi/erc20.json'

// const web3 = new Web3("https://exchaintestrpc.okex.org");
// const _tokenContract = new web3.eth.Contract(
//   (bep20Abi as unknown) as AbiItem,
//   '0xE9a78F7fB9c0E5aA3a77B02c087084e7D46748C3'
// )
// console.log('_tokenContract',_tokenContract)
// _tokenContract.methods
//   .allowance('0x4074A8deA884611F6553932CDF0B8390CDbA427E', '0x6137B571f7F1E44839ae10310a08be86D1A4D03B')
//   .call().then(console.log)