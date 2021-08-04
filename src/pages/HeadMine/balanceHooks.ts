import { useEffect, useState } from 'react'
import { weiToNum } from 'utils/useBigNumber'
import addresses from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { knsBalance } from 'state/fristMine'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
// import useRefresh from 'hooks/useRefresh'
import { useTimer } from 'hooks/useTimer'
import { getFristMineContract, Init_KNS_Contract_Account } from './contract'

/**
 * OKT/OKB balance
 */
export const balanceDefaultValue = '0'
const useHeadMineBalance = ({ account, address, isOkt = true, decimals }: { account: string; address: string; isOkt?: boolean; decimals?: number }): string => {
  const [balance, setbalance] = useState(balanceDefaultValue)
  const reload = useTimer()
  useEffect(() => {
    if (account) {
      const contract = getFristMineContract(address)
      contract.methods.balanceOf(account).call().then(async (e: string) => {
        if (isOkt) {
          setbalance(weiToNum(e))
          return
        }
        let _decimals = decimals
        if (!_decimals) {
          try {
            _decimals = await contract.methods.decimals().call()
          } catch (error) {
            console.log(error)
          }
        }
        setbalance(weiToNum(e, _decimals))
      })
    }
  }, [account, address, isOkt, decimals, reload])
  return balance
}


/**
 * OKT KNS balance
 */
export const OKT_KNS_balanceDefaultValue = '0'
export const useHeadMine_OKT_KNS_Balance = ({ account, address }: { account: string; address: string }): string => {
  const [balance, setbalance] = useState(OKT_KNS_balanceDefaultValue)
  const reload = useTimer()
  useEffect(() => {
    if (account) {
      getFristMineContract(address).methods.earned(account).call().then((e) => {
        setbalance(weiToNum(e))
      })
    }
  }, [account, address, reload])
  return balance
}

/**
 * OKT KNS balance
 */
export const OKB_KNS_balanceDefaultValue = '0'
export const useHeadMine_OKB_KNS_Balance = ({ account, address }: { account: string; address: string; }): string => {
  const [balance, setbalance] = useState(OKB_KNS_balanceDefaultValue)
  const reload = useTimer()
  useEffect(() => {
    if (account) {
      getFristMineContract(address, true).methods.earned(account).call().then((e) => {
        setbalance(weiToNum(e))
      })
    }
  }, [account, address, reload])
  return balance
}

/**
 * OKT global balance
 */
export const useHeadMineGlobalBalance = ({ account }: { account: string }): knsBalance => {
  const contractOktAddress = getAddress(addresses.oktHeadMine)
  const contractOkbAddress = getAddress(addresses.okbHeadMine)
  const [balance, setbalance] = useState<knsBalance>({})
  const fristMineKnsBalances = useSelector((state: AppState) => state.fristMine.knsBalance)
  const _contract = Init_KNS_Contract_Account()
  const reload = useTimer()
  useEffect(() => {
    if (account && !fristMineKnsBalances[contractOktAddress]) {
      Promise.all([
        _contract.methods.balanceOf(contractOktAddress).call(),
        _contract.methods.balanceOf(contractOkbAddress).call(),
      ])
      .then((res: Array<string>) => {
        setbalance({
          [contractOktAddress]: weiToNum (res[0]),
          [contractOkbAddress]: weiToNum (res[1]),
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [account, _contract, fristMineKnsBalances, contractOktAddress, contractOkbAddress, reload])
  return balance
}

export default useHeadMineBalance