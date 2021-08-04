import React, { useState } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Flex, CardFooter, ExpandableLabel } from 'uikit'
import { RowBetween } from 'components/Row'
import { Pool } from 'state/types'
import useIntl from 'hooks/useIntl'
import { CoreTag } from 'components/Tags'
import ExpandedFooter from './ExpandedFooter'

interface FooterProps {
  pool?: Pool
  account: string
  totalStake: number
}

const ExpandableButtonWrapper = styled(Flex)`
  button {
    padding: 0;
  }
`

const FooterStyled = styled.div`
  display:flex;
  justify-content:flex-end;
  margin-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  >div{
    border-top-width: 0px;
  }
  div{
    padding: 0px;
  }
`

const Footer: React.FC<FooterProps> = ({ pool, account, totalStake }) => {
  const TranslateString = useI18n()
  const [isExpanded, setIsExpanded] = useState(false)
  const intl = useIntl()

  return (
    <FooterStyled>
      <CardFooter style={{width: '100%'}}>
        <div className="flex flex-center-x flex-space-x">
          <TagsContainer>
            <CoreTag />
          </TagsContainer>
          <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? intl('farms.detailsHide') : intl('farms.detailsOpen')}
          </ExpandableLabel>
        </div>
        {isExpanded && <ExpandedFooter totalStake={totalStake} pool={pool} account={account} />}
      </CardFooter>
    </FooterStyled>
  )
}

export default Footer


const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  } */
  user-select: none;

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 12px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`