import styled, { DefaultTheme } from 'styled-components'
import { space } from 'styled-system'
import { CardProps } from './types'

interface StyledCardProps extends CardProps {
  theme: any
  noBoxShadow?: boolean
}

/**
 * Priority: Warning --> Success --> Active
 */
const getBoxShadow = ({ isActive, isSuccess, isWarning, theme }: StyledCardProps) => {
  if (isWarning) {
    return theme.card.boxShadowWarning
  }

  if (isSuccess) {
    return theme.card.boxShadowSuccess
  }

  if (isActive) {
    return theme.card.boxShadowActive
  }

  return theme.card.boxShadow
}

const StyledCard = styled.div<StyledCardProps>`
  background-color: ${({ theme, noBoxShadow }) => {
    return noBoxShadow ? 'red' : theme.card.background
  }};
  /* border: ${({ theme }) => theme.card.boxShadow};*/
  border-radius: 12px;
  /* box-shadow: ${getBoxShadow}; */
  // box-shadow: ${({ noBoxShadow }) => noBoxShadow ? 'none': '6px 0 50px rgba(255, 77, 79, 0.3), -6px 0 50px rgba(24, 144, 255, 0.3)'};
  box-shadow: none;
  color: ${({ theme, isDisabled }) => theme.colors[isDisabled ? 'textDisabled' : 'text']};
  overflow: hidden;
  position: relative;
  ${space}
`

StyledCard.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
  noBoxShadow: false,
}

export default StyledCard
