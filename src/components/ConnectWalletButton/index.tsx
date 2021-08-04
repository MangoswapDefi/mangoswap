import React from 'react'
import { Button, ButtonProps, useWalletModal} from 'uikit'
import useI18n from 'hooks/useI18n'
import useAuth from 'hooks/useAuth'
import { baseColors } from 'uikit/theme/colors'
import useIntl from 'hooks/useIntl'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const intl = useIntl()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button variant="primary" onClick={onPresentConnectModal} {...props} style={{ background: baseColors.linearGradientPrimary, boxShadow: 'none'}}>
      {intl('swap.unlockWallet', 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
