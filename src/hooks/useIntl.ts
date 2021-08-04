import { useContext, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { Locales } from 'locales/type'

interface translationOption {
  id: string;
  data: Locales
}

const ReplaceAll = (str: string, data: Locales) => {
  const keys = Object.keys(data)
  keys.forEach((key) => {
    str = str?.replace(`{${key}}`, data[key])
  })
  return str
}
const useIntl = () => {
  const { Languages, selectedLanguage } = useSelector((state: AppState) => state.locales)
  
  const {locale} = Languages[selectedLanguage]
  
  const getLocale = (_locale: Locales, key: string, data?: Locales): string => {
    return data ? ReplaceAll(_locale[key], data) : _locale[key]
  }
  return (translation: string | translationOption, fallback?: string): string => {
    if (typeof translation === 'string') {
      if (Object.keys(locale).length === 0) {
        return fallback
      }
      
      return getLocale(locale, translation) || fallback || translation
    }
    return getLocale(locale, translation.id, translation.data) || fallback || translation.id
  }
}

export default useIntl