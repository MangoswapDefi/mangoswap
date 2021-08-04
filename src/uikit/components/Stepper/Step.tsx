import React from 'react'
import styled from 'styled-components'
import Flex from '../Box/Flex'
import Box from '../Box/Box'
import { StatusProps, StepProps } from './types'

const getStepNumberFontColor = ({ theme, status }: StatusProps) => {
  if (status === 'past') {
    return theme.colors.success
  }
  if (status === 'current') {
    return theme.colors.invertedContrast
  }
  return theme.colors.textDisabled
}

const StyledStep = styled(Flex)`
  padding: 0 0 20px 0;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
  }
` 

const Connector = styled.div<StatusProps>`
  position: absolute;
  width: 4px;
  height: 100%;
  top: 50%;
  left: calc(50% - 2px);
  background-color: ${({ theme, status }) => theme.colors[status === 'past' ? 'success' : 'textDisabled']};
`

const ChildrenWrapper = styled(Box)<{ isVisible: boolean }>`
  ${({ theme }) => theme.mediaQueries.md} {
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  }
`

const ChildrenRightWrapper = styled(ChildrenWrapper)`
  margin-left: 8px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 16px;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
`

export const StepNumber = styled.div<StatusProps>`
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme, status }) => theme.colors[status === 'current' ? 'secondary' : 'invertedContrast']};
  border-radius: ${({ theme }) => theme.radii.circle};
  color: ${getStepNumberFontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 32px;
  width: 48px;
  height: 48px;
  z-index: 1;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
    width: 60px;
    height: 60px;
  }
`

export const Step: React.FC<StepProps> = ({ dot, status, children }) => {
  return (
    <StyledStep>
      <Wrapper>
        <StepNumber status={status}>{dot}</StepNumber>
      </Wrapper>
      <ChildrenRightWrapper isVisible>{children}</ChildrenRightWrapper>
    </StyledStep>
  )
}
