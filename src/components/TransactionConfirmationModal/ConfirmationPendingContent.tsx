import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'
import useIntl from 'hooks/useIntl'
import { Spinner } from '../Shared'
import { AutoColumn } from '../Column'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type ConfirmationPendingContentProps = { onDismiss: () => void; pendingText: string }

const CustomLightSpinner = styled(Spinner)<{ size: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const ConfirmationPendingContent = ({ onDismiss, pendingText }: ConfirmationPendingContentProps) => {
  const intl = useIntl()
  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>{intl('farms.waitForConfirmation')}</ContentHeader>
        <ConfirmedIcon>
          <CustomLightSpinner src="/images/blue-loader.svg" alt="loader" size="64px" />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <AutoColumn gap="12px" justify="center">
            <Text fontSize="14px">
              <strong>{pendingText}</strong>
            </Text>
          </AutoColumn>
          <Text fontSize="14px">{intl('supple.confirmTransaction')}</Text>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default ConfirmationPendingContent
