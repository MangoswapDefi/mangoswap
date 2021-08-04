import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import { connectorLocalStorageKey } from './config'
import { Login, Config } from './types'

interface Props {
  walletConfig: Config
  login: Login
  onDismiss: () => void
  mb: string
}

const WalletButton = styled(Button)`
  justify-content: space-between;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon } = walletConfig
  return (
    <WalletButton
      width="100%"
      variant="tertiary"
      onClick={() => {
        login(walletConfig.connectorId)
        window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId)
        onDismiss()
      }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text bold color="primary" mr="16px">
        {title}
      </Text>
      <Icon width="32px" style={{ borderRadius: '50%' }} />
    </WalletButton>
  )
}

export default WalletCard
