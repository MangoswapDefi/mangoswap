import React from 'react'
import { Button, useWalletModal } from 'uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const intl = useIntl()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props} variant="primary">
      {intl('swap.unlockWallet')}
    </Button>
  )
}

export default UnlockButton
