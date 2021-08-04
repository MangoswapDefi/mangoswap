import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Skeleton, useTooltip } from 'uikit'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface MultiplierProps {
  multiplier: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 14px;
  min-width: 70px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />
  const TranslateString = useI18n()
  const intl = useIntl()
  const multiplierNumber = multiplier.slice(0, -1)
  const tooltipContent = (
    <div>
      {intl('farms.multiplierRepresents')}
      <br />
      <br />
      {intl({
          id: 'farms.multiplierNumberRatio', 
          data: {
            number: multiplierNumber,
            number2: multiplierNumber
          }
        })}
    </div>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, 'top-end', 'hover', undefined, undefined, [
    20,
    10,
  ]) 

  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Multiplier
