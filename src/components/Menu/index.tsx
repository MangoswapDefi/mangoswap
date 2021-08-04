import React, { useContext, useState } from 'react'
import useIntl from 'hooks/useIntl'  
import { Menu as UikitMenu } from 'uikit'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { selectLocalesAsync, selectedLanguageType } from 'state/language'
import { allLanguages } from 'locales'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import links from './config'
import { CAKE } from '../../constants'


const Menu: React.FC = (props) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const priceData = useGetPriceData()
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = priceData ? Number(priceData.data[CAKE.address].price) : undefined
  const profile = useGetLocalProfile()
  const { selectedLanguage } = useSelector((state: AppState) => state.locales)
  const setLang = (value: selectedLanguageType) => {
    selectLocalesAsync(value)(dispatch) 
  }
  return (
    <UikitMenu
      links={links.map(v => {
        return {...v, label: intl(`menu.${ v.label}`)}
      })}
      account={account as string}
      login={login}
      logout={logout} 
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage}
      langs={allLanguages}
      setLang={setLang}
      cakePriceUsd={cakePriceUsd}
      profile={profile}
      {...props}
    />
  )
}

export default Menu
