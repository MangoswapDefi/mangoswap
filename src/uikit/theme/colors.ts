import { Colors } from './types'

export const baseColors = {
  title: '#333',
  failure: '#FF3C88',
  primary: '#FD9E08',
  linearGradientPrimary: '#FD9E08',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  secondary: '#7645D9',
  success: '#FD9E08',
  warning: '#FFB237',
  inputBackground: 'rgba(242, 242, 242, 1)',
  title2: 'rgb(130 130 130)',
  unimportant: 'rgba(51, 51, 51, 0.4)',
  text3: 'rgba(130, 130, 130, 0.4)',
  tag: 'rgba(255, 60, 136, 1)',
  light: 'rgba(51 51 51, 0.1)',
  couponBackgroundColor: 'rgba(174, 215, 254, 0.26)',
  closeIconColor: '#4F4F4F',
  cardNav: '#FFEDCF',
  greenColor: '#27AE60',
  orangeColor: '#FFF1DB',
}

export const brandColors = {
  binance: '#F0B90B',
}
export const buttonColors = {
  linearGradientPrimary: baseColors.linearGradientPrimary,
  linearGradientActivePrimary: '#FD9E08',
}

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: '#f9f9f9',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#FFFFFF',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  toggleDefBg: '#E0E0E0',
  invertedContrast: '#FFFFFF',
  input: '#fff',
  inputSecondary: '#FF3C88',
  tertiary: '#F2F2F2',
  text: 'rgba(51, 51, 51, 1)',
  textDisabled: '#BDC2C4',
  textSubtle: '#828282',
  borderColor: '#E9EAEB',
  linkColor: 'rgb(93,175,253)',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)',
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
    violetAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)',
  },
}

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  secondary: '#9A6AFF',
  background: '#100C18',
  backgroundDisabled: '#3c3742',
  backgroundAlt: '#27262c',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  invertedContrast: '#191326',
  input: '#483f5a',
  toggleDefBg: '#E0E0E0',
  inputSecondary: '#66578D',
  primaryDark: '#0098A1',
  tertiary: '#353547',
  text: '#EAE2FC',
  textDisabled: '#666171',
  textSubtle: '#fff',
  linkColor: '#fff',
  borderColor: '#524B63',
  gradients: {
    bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
    cardHeader: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    violetAlt: 'linear-gradient(180deg, #434575 0%, #66578D 100%)',
  },
}
