/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { Languages, LOCALE_CACHE_KEY } from 'locales'
import { LanguagesMap, Locales } from 'locales/type'


interface localesState {
  locales: Locales;
  Languages: LanguagesMap;
  selectedLanguage: selectedLanguageType;
}

export type selectedLanguageType = 'zhCN' | 'enUS'
const initialState: localesState = {
  Languages,
  selectedLanguage: (localStorage.getItem(LOCALE_CACHE_KEY) as selectedLanguageType) ?? 'enUS',
  locales: Languages.zhCN.locale,
}

export const LocalesSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocales: (state, action) => {
      const locales = action.payload
      state.locales = {
        ...locales
      }
    },
    setSelectedLanguage: (state, action) => {
      const type = action.payload
      localStorage.setItem(LOCALE_CACHE_KEY, type)
      state.selectedLanguage = type
    }
  },
})

// Actions
export const { setLocales, setSelectedLanguage } = LocalesSlice.actions

// Thunks
export const setLocalesAsync = (locales: Locales) => async (dispatch: Dispatch<any>) => {
  dispatch(setLocales(locales))
}
export const selectLocalesAsync = (type: selectedLanguageType) => async (dispatch: Dispatch<any>) => {
  dispatch(setSelectedLanguage(type))
  dispatch(setLocales(Languages[type].locale))
}


export default LocalesSlice.reducer
