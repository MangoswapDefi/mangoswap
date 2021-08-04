/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

export interface knsBalance {
  [address: string]: string
}
interface state {
  knsBalance: knsBalance
}

const initialState: state = {
    knsBalance: {},
}

export const FristSlice = createSlice({
  name: 'Frist',
  initialState,
  reducers: {
    setFristMineKnsBalance: (state, action) => {
      const knsBalance = action.payload
      state.knsBalance = {
        ...state.knsBalance,
        ...knsBalance,
      }
    },
  },
})

// Actions
export const { setFristMineKnsBalance } = FristSlice.actions

// Thunks
export const setFristKnsBalanceAsync = (knsBalance: knsBalance) => async (dispatch) => {
  dispatch(setFristMineKnsBalance(knsBalance))
}


export default FristSlice.reducer
