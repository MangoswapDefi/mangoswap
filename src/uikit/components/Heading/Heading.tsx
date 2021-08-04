import styled from 'styled-components'
import Text from '../Text/Text'
import { HeadingProps } from './types'

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  font-size: ${(props) => props?.fontSize || '16px'};
  font-weight: 500;
  color: ${(props) => props?.color || '#fff'};
`

export default Heading
