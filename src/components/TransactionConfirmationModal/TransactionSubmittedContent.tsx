import { ChainId } from '@mangoswap-libs/sdk'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from 'uikit'
import { ArrowUpCircle } from 'react-feather'
import useIntl from 'hooks/useIntl'
import { AutoColumn } from '../Column'
import { getBscScanLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)
  const intl = useIntl()

  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>{intl('supple.transactionSubmitted')}</ContentHeader>
        <ConfirmedIcon>
          <ArrowUpCircle strokeWidth={0.5} size={97} color="#27AE60" />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <LinkExternal color="greenColor" href={getBscScanLink(chainId, hash, 'transaction')}>{intl('supple.viewOklink')}</LinkExternal>
          )}
          <Button onClick={onDismiss} mt="20px">
            {intl('supple.close')}
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
