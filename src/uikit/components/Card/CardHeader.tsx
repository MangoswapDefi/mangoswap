import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { CardTheme } from './types'

export interface CardHeaderProps extends SpaceProps {
  variant?: keyof CardTheme['cardHeaderBackground']
}

const CardHeader = styled.div<CardHeaderProps>`
  background: rgba(93, 175, 253, .5);
  ${space}
`

CardHeader.defaultProps = {
  p: '24px',
}

export default CardHeader
