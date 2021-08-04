import React from 'react'
import { useHistory } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { AutoRenewIcon, Button } from 'uikit'
import { PoolIds } from 'config/constants/types'
import { WalletIfoData } from 'hooks/ifo/types'
import useI18n from 'hooks/useI18n'
import useToast from 'hooks/useToast'
import { TranslateString } from 'utils/translateTextHelpers'
import { Contract } from 'web3-eth-contract';
import styled from 'styled-components'

interface Props {
  contract: Contract
}

const ClaimButton = ({ contract }: Props) => {
  const history = useHistory()
  const { account } = useWeb3React()
  const { toastError, toastSuccess } = useToast()

  const handleClaim = async () => {
    try {
      // setPendingTx(true)
      await contract.methods.getReward().send({ from: account }).on('receipt', async (receipt: any) => {
        // history.go(0)
      })
      toastSuccess('Success!', 'You have successfully claimed your rewards.')
    } catch (error) {
      toastError('Error', error?.message)
      console.error(error)
    } finally {
      // setPendingTx(false)
    }
  }

  return (<ClaimButtonStyle onClick={handleClaim} type="button">
    <div>Claim</div>
  </ClaimButtonStyle>)
}

export default ClaimButton

const ClaimButtonStyle = styled.button<{ type: string }>`
position: relative;
width: 0px;
height: 0px;
margin: 0px;
padding: 0px;
border-color: transparent;
cursor: pointer;
>div{
  width: 66px;
  height: 24px;
  line-height: 20px;
  position: absolute;
  top: 10px;
  left: -65px;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid;
  border-radius: 12px;
}
`