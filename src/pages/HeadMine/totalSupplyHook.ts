import { useState } from 'react'
import { weiToNum } from 'utils/useBigNumber'
import { getFristMineContract } from './contract'

const totalDefaultValue = '--'
const useHeadMinetotalSupply = (address: string, isOKB: boolean): string => {
  const [total, setTotal] = useState(totalDefaultValue)
  getFristMineContract(address, isOKB).methods.totalSupply().call().then((e: string) => {
    setTotal(weiToNum(e))
  })
  return total
}

export default useHeadMinetotalSupply