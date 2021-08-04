import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Modal, Text, Button, OpenNewIcon, Link } from 'uikit'
import { BASE_EXCHANGE_URL } from 'config'
import useTheme from 'hooks/useTheme'
import useIntl from 'hooks/useIntl'

interface NotEnoughTokensModalProps {
  tokenSymbol: string
  onDismiss?: () => void
}

const StyledLink = styled(Link)`
  width: 100%;
`

const NotEnoughTokensModal: React.FC<NotEnoughTokensModalProps> = ({ tokenSymbol, onDismiss }) => {
  const TranslateString = useI18n()
  const { theme } = useTheme()
  const intl = useIntl()

  return (
    <Modal
      title={intl({id: 'swap.tokenRequired', data: {tokenSymbol: tokenSymbol}})}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Text color="failure" bold>
        {intl({id: 'swap.balanceInsufficient', data: {symbol: tokenSymbol}})}
      </Text>
      <Text mt="24px">{intl({id: 'swap.tokenStakePool', data: {tokenSymbol: tokenSymbol}})}</Text>
      <Text>
        {intl({id: 'swap.buyTokenHint', data: {tokenSymbol: tokenSymbol}})}
      </Text>
      <Button mt="24px" as="a" external href={BASE_EXCHANGE_URL}>
        {intl({id: 'swap.buyToken', data: {tokenSymbol: tokenSymbol}})}
      </Button>
      <StyledLink href="https://yieldwatch.net" external>
        <Button variant="secondary" mt="8px" width="100%">
          {intl('swap.locateAssets')}
          <OpenNewIcon color="primary" ml="4px" />
        </Button>
      </StyledLink>
      <Button variant="text" onClick={onDismiss}>
        {intl('swap.closeWindow')}
      </Button>
    </Modal>
  )
}

export default NotEnoughTokensModal
