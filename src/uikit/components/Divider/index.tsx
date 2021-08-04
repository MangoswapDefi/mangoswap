import React from 'react'
import { variant } from 'styled-system'
import styled from 'styled-components'
import { baseColors } from 'uikit/theme/colors'

export interface DividerProps {
  // className?: string
  // dashed?: boolean
  // orientation?: 'left' | 'right' | 'center'
  // plain?: boolean
  style?: React.CSSProperties
  // type?: 'horizontal' | 'vertical'
  size?: number
  variant?: string
}
export const variants = {
  PRIMARY: 'primary',
  GRADUAL: 'gradual',
} as const

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: 'rgba(0,0,0,.06)',
  },
  [variants.GRADUAL]: {
    height: '3px',
    backgroundImage: baseColors.linearGradientPrimary,
  },
}
const StyledDivider = styled.div`
  margin: 24px 0;
  width: 100%;
  height: 1px;
  clear: both;
  ${variant({
    variants: styleVariants,
  })}
`
const Divider: React.FC<DividerProps> = (props) => {
  return <StyledDivider {...props} />
}

Divider.defaultProps = {
  variant: variants.PRIMARY,
}
export { Divider }
