import { baseColors, buttonColors } from 'uikit/theme/colors'
import { scales, variants } from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '48px',
    padding: '0 24px',
  },
  [scales.SM]: {
    height: '32px',
    padding: '0 16px',
  },
  [scales.XS]: {
    height: '20px',
    fontSize: '12px',
    padding: '0 8px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: 'primary',
    // background: baseColors.linearGradientPrimary,
    color: 'white',
  },
  [variants.SECONDARY]: {
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: 'primary',
    boxShadow: 'none',
    color: 'primary',
    ':disabled': {
      backgroundColor: 'transparent',
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: 'tertiary',
    boxShadow: 'none',
    color: 'primary',
  },
  [variants.SUBTLE]: {
    backgroundColor: 'failure',
    color: 'white',
  },
  [variants.DANGER]: {
    backgroundColor: 'failure',
    color: 'white',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
    color: 'white',
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'primary',
    boxShadow: 'none',
  },
  [variants.GRADUAL]: {
    color: '#fff',
    backgroundImage: buttonColors.linearGradientPrimary,
    ':active': {
      backgroundImage: buttonColors.linearGradientActivePrimary,
    },
  },
  [variants.LIGHT]: {
    backgroundColor: 'light',
    color: 'primary',
    boxShadow: 'none',
  },
}
