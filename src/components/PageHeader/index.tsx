import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, Text, Flex, useModal, TuneIcon, HistoryIcon } from 'uikit'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'
import SettingsModal from './SettingsModal'
import RecentTransactionsModal from './RecentTransactionsModal'

interface PageHeaderProps {
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
}

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  const TranslateString = useI18n()
  const intl = useIntl()
  const [onPresentSettings] = useModal(<SettingsModal translateString={TranslateString} />)
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal translateString={TranslateString} />)

  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px" fontSize="22px" style={{fontWeight: 900}} >{title}</Heading>
          {description && (
            <Text color="rgba(189, 189, 189, 1)" fontSize="14px">
              {description}
            </Text>
          )}
        </Details>
        <IconButton variant="text" onClick={onPresentSettings} title={intl('swap.settings', 'Settings')}>
          <TuneIcon width="24px" color="#828282" />
        </IconButton>
        <IconButton
          variant="text"
          onClick={onPresentRecentTransactions}
          title={intl('swap.recentTransactions', 'Recent transactions')}
        >
          <HistoryIcon width="24px" color="#828282" />
        </IconButton>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledPageHeader>
  )
}

export default PageHeader
