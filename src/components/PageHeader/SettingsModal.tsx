import React from 'react'
import { Modal } from 'uikit'
import useIntl from 'hooks/useIntl'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'
// import AudioSetting from './AudioSetting'

type SettingsModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => string
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss, translateString }: SettingsModalProps) => {
  const intl = useIntl()
  return (
    <Modal title={intl('swap.settings', 'Settings')} onDismiss={onDismiss}>
      <SlippageToleranceSetting translateString={translateString} />
      <TransactionDeadlineSetting translateString={translateString} />
      {/* <AudioSetting translateString={translateString} /> */}
    </Modal>
  )
}

export default SettingsModal
