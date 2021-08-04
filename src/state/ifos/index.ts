/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ifos from 'config/constants/ifo'
import { IfoStatus } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import { fetchIfosAllowances, fetchIfosBalance, fetchIfosLpStakeInfo, fetchIfosTotalStakeInfo } from './fetchIfosUser'

export interface IfosLpAllowanceType {
  [address: string]: string
}
export interface IfosTotalLpStakeType {
  [pid: number]: string
}
export type IfosLpBalanceType = IfosLpAllowanceType
export type IfosLpStakeType = IfosLpAllowanceType
export interface statusListType {
  [pid: number]: IfoStatus;
}
interface state {
  lpAllowance: IfosLpAllowanceType;
  lpBalance: IfosLpBalanceType;
  lpStake: IfosLpStakeType;
  totalLpStake: IfosTotalLpStakeType;
  statusList: statusListType;
}

const initialState: state = {
  lpAllowance: {},
  lpBalance: {},
  /**
   * user stake lp amount
   */
  lpStake: {},
  /**
   * all user stake lp amount
   */
  totalLpStake: {},
  statusList: {},
}

export const IfoSlice = createSlice({
  name: 'Ifo',
  initialState,
  reducers: {
    setIfosAllowances: (state, action) => {
      const lpAllowance = action.payload
      state.lpAllowance = {
        ...state.lpAllowance,
        ...lpAllowance,
      }
    },
    setIfosBalance: (state, action) => {
      const lpBalance = action.payload
      state.lpBalance = {
        ...state.lpBalance,
        ...lpBalance,
      }
    },
    setIfosLpStake: (state, action) => {
      const lpStake = action.payload
      state.lpStake = {
        ...state.lpStake,
        ...lpStake,
      }
    },
    setIfosTotalLpStake: (state, action) => {
      const totalLpStake = action.payload
      state.totalLpStake = {
        ...state.totalLpStake,
        ...totalLpStake,
      }
    },
    setIfosStatusList: (state, action: PayloadAction<statusListType>) => {
      const statusList = action.payload
      state.statusList = {
        ...state.statusList,
        ...statusList,
      }
    },
  }
})

// Actions
export const { setIfosAllowances, setIfosBalance, setIfosLpStake, setIfosTotalLpStake, setIfosStatusList } = IfoSlice.actions

// Thunks
export const setIfosAllowancesAsync = (list: IfosLpAllowanceType) => async (dispatch) => {
  dispatch(setIfosAllowances(list))
}
export const setIfosBalancesAsync = (list: IfosLpBalanceType) => async (dispatch) => {
  dispatch(setIfosBalance(list))
}
export const setIfosLpStakeAsync = (list: IfosLpStakeType) => async (dispatch) => {
  dispatch(setIfosLpStake(list))
}
export const setIfosTotalLpStakeAsync = (list: IfosTotalLpStakeType) => async (dispatch) => {
  dispatch(setIfosTotalLpStake(list))
}


export const fetchIfosUserDataAsync = (account: string) => async (dispatch, getState?) => {
  if (!account) {
    return
  }
  const ifoToFetch = ifos
  const userAllowances = await fetchIfosAllowances(account, ifoToFetch)
  const userBalances = await fetchIfosBalance(account, ifoToFetch)
  const userLpStakeInfo = await fetchIfosLpStakeInfo(account, ifoToFetch)
  const userLpTotalStakeInfo = await fetchIfosTotalStakeInfo(ifoToFetch)

  const lpAllowance: IfosLpAllowanceType = {}
  const lpBalances: IfosLpBalanceType = {}
  const lpStake: IfosLpStakeType = {}
  const lpTotalStake: IfosTotalLpStakeType = {}
  
  let i = 0
  const ifoLen = ifos.length
  for (i; i < ifoLen; i++) {
    const _ifo = ifos[i]
    lpAllowance[getAddress(_ifo.currency.address)] = userAllowances[i]
    lpBalances[getAddress(_ifo.currency.address)] = userBalances[i]
    lpStake[getAddress(_ifo.currency.address)] = userLpStakeInfo[i]
    lpTotalStake[_ifo.pid] = userLpTotalStakeInfo[i]
  }

  setIfosAllowancesAsync(lpAllowance)(dispatch)
  setIfosBalancesAsync(lpBalances)(dispatch)
  setIfosLpStakeAsync(lpStake)(dispatch)
  setIfosTotalLpStakeAsync(lpTotalStake)(dispatch)
}


export default IfoSlice.reducer
