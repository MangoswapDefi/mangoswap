import styled from 'styled-components'
import { InputProps, scales } from './types'

interface StyledInputProps extends InputProps {
  theme: any
}

/**
 * Priority: Warning --> Success
 */
const getBoxShadow = ({ isSuccess = false, isWarning = false, theme }: StyledInputProps) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  if (isSuccess) {
    return theme.shadows.success
  }

  return theme.shadows.inset
}

const getHeight = ({ scale = scales.MD }: StyledInputProps) => {
  return '32px'
}

const Input = styled.input<InputProps>`
  background-color: ${({ theme }) => theme.colors.input};
  border: 0;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px;
  height: ${getHeight};
  outline: 0;
  padding: 0 16px;
  width: 100%;
  border: 1px solid #d8d8d8;
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    // box-shadow: ${({ theme }) => theme.shadows.focus};
    border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  }
`

Input.defaultProps = {
  scale: scales.MD,
  isSuccess: false,
  isWarning: false,
}

export default Input
