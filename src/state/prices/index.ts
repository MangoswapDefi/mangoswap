// import { PriceApiThunk } from 'state/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ALL_PRICES, client as ApolloClient } from 'apollo'

export const PricesSlice = createSlice({
  name: 'Prices',
  initialState: {},
  reducers: {
    setPrices: (state, action: PayloadAction<any>) => {
      return {
        data: action.payload
      }
    },
  },
})

// Actions
export const { setPrices } = PricesSlice.actions
// Thunks
export const fetchPrices = async (dispatch) => {
  // 获取价格列表
  const {
    data: { tokens, bundles },
  } = (await ApolloClient.query({
    query: ALL_PRICES,
  })) as any

  const prices = {
    OKT: {
      symbol: 'OKT',
      name: 'OKT',
      price: bundles?.[0].ethPrice,
    },
  }
  tokens?.forEach((token) => {
    const { symbol, derivedETH } = token
    prices[symbol] = {
      ...token,
      price: derivedETH,
    }
  })
  return dispatch(setPrices(prices))
}

export default PricesSlice.reducer
