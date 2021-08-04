import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, Text, ErrorAlertIcon } from 'uikit'
import { AlertTriangle } from 'react-feather'
import useIntl from 'hooks/useIntl'
import { AutoColumn } from '../Column'
import { Wrapper, Section, BottomSection, ContentHeader } from './helpers'

type TransactionErrorContentProps = { message: string; onDismiss: () => void }

const TransactionErrorContent = ({ message, onDismiss }: TransactionErrorContentProps) => {
  const theme = useContext(ThemeContext)
  const intl = useIntl()
  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>{intl('supple.error')}</ContentHeader>
        <AutoColumn style={{ marginTop: 20, padding: '2rem 0' }} gap="24px" justify="center">
          <ErrorAlertIcon />
          <Text fontSize="16px" color="failure" style={{ textAlign: 'center', width: '85%' }}>
            {message}
          </Text>
        </AutoColumn>
      </Section>
      <BottomSection gap="12px">
        <Button onClick={onDismiss}>{intl('supple.dismiss')}</Button>
      </BottomSection>
    </Wrapper>
  )
}

export default TransactionErrorContent
