import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider, DefaultTheme } from 'styled-components'
import { light, dark } from 'uikit'

const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: false, toggleTheme: () => null })

const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  }) 

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }
  const theme = (isDark ? dark : light) as DefaultTheme
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
