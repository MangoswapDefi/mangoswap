import React from 'react'
import { Modal, ModalBody, Text, Image, Button, Link, OpenNewIcon } from 'uikit'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { Token } from 'config/constants/types'
import useI18n from 'hooks/useI18n'

interface Props {
  currency: Token
  onDismiss?: () => void
}

const GetLpModal: React.FC<Partial<Props>> = ({ currency, onDismiss }) => {
  const TranslateString = useI18n()
  return (
    <Modal title="LP Tokens required" onDismiss={onDismiss}>
      <ModalBody maxWidth="288px">
        <Image
          src={`/images/farms/${currency.symbol.split(' ')[0].toUpperCase()}.svg`}
          width={72}
          height={72}
          margin="auto"
          mb="24px"
        />
        <Text mb="16px">
          You’ll need{' '}
          <Text as="span" bold>
            CAKE-OKT LP
          </Text>{' '}
          tokens to participate in the IFO!
        </Text>
        <Text mb="24px">
          {TranslateString(999, 'Get LP tokens, or make sure your tokens aren’t staked somewhere else.')}
        </Text>
        <Button
          as={Link}
          external
          href={`${BASE_ADD_LIQUIDITY_URL}/OKT/0x7c2e817E1E9d40C022c2f08804d3e67D07526f83`}
          endIcon={<OpenNewIcon color="white" />}
          minWidth="100%" // Bypass the width="fit-content" on Links
        >
          {TranslateString(999, 'Get LP tokens')}
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default GetLpModal
