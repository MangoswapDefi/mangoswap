import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import locales from './language/index'
import toasts from './toasts'
import { getThemeCache } from '../utils/theme'
import fristMineReducer from './fristMine'
import farmsReducer from './farms'
import ifosReducer from './ifos'
import poolsReducer from './pools'
import pricesReducer from './prices'
import blockReducer from './block'

type MergedState = {
  user: {
    [key: string]: any
  }
  transactions: {
    [key: string]: any
  }
}
const PERSISTED_KEYS: string[] = ['user', 'transactions']
const loadedState = load({ states: PERSISTED_KEYS }) as MergedState
if (loadedState.user) {
  loadedState.user.userDarkMode = getThemeCache()
}

const store = configureStore({
  reducer: {
    locales,
    block: blockReducer,
    fristMine: fristMineReducer,
    farms: farmsReducer,
    ifos: ifosReducer,
    pools: poolsReducer,
    prices: pricesReducer,
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    toasts,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],
  preloadedState: loadedState,
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch | any
export const useAppDispatch = () => useDispatch<AppDispatch>()
