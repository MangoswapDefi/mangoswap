import React from 'react'
import styled from 'styled-components'
import { Link as HistoryLink } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { RowBetween } from 'components/Row'
import QuestionHelper from 'components/QuestionHelper'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.colors.text};
`

export function FindPoolTabs() {
  const TranslateString = useI18n()
  const intl = useIntl()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{intl('find.importPool')}</ActiveText>
        <QuestionHelper
          text={intl('find.importPoolHint')}
        />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  const TranslateString = useI18n()
  const intl = useIntl()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? intl('find.add') : intl('find.remove')}&nbsp;{intl('pool.liquidity')}</ActiveText>
        <QuestionHelper
          text={
            adding
              ? intl('find.yourLiquidityHint')
              : intl('find.removeTokensHint')
          }
        />
      </RowBetween>
    </Tabs>
  )
}
