import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, LinkExternal } from 'uikit'
import useIntl from 'hooks/useIntl'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const intl = useIntl()

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{intl('farms.totalLiquidity')}:</Text>
        <Text>{totalValueFormatted}</Text>
      </Flex>
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>
          {TranslateString(999, `Get ${lpLabel}`, { name: lpLabel })}
        </StyledLinkExternal>
      )}
      <StyledLinkExternal href={bscScanAddress}>{intl('farms.viewContract')}</StyledLinkExternal>
      <StyledLinkExternal href={infoAddress}>{intl('farms.seePairInfo')}</StyledLinkExternal>
    </Wrapper>
  )
}

export default DetailsSection
