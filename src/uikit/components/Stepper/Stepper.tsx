import React from 'react'
import styled from 'styled-components'
import { baseColors } from 'uikit/theme/colors'
import { ThemedProps } from './types'

const StepperWrapper = styled.div<ThemedProps>`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: relative;
  &::before {
    content: ' ';
    position: absolute;
    width: 6px;
    height: 100%;
    border-radius: 3px;
    top: 2px;
    left: 28px;
    background-image: linear-gradient(to top, ${baseColors.failure}, ${baseColors.primary});
  }
`
export interface StepperProps {
  title?: React.ReactNode
}
const Stepper: React.FC<StepperProps> = ({ title, children }) => {
  const numberOfSteps = React.Children.count(children)
  return (
    <>
      {title}
      <StepperWrapper>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { numberOfSteps })
          }
          return child
        })}
      </StepperWrapper>
    </>
  )
}

export default Stepper
