import styled from 'styled-components'
import Button from '../../../components/Button/Button'

const MenuButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  border-radius: 8px;
  min-height: 32px;
  height: auto;
  text-align: left;
  display: inline-block;
  &:hover{
    color: ${({ theme }) => theme.colors.primary};
  }
`
MenuButton.defaultProps = {
  variant: 'text',
  size: 'sm',
}

export default MenuButton
