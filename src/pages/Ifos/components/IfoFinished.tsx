import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import message from 'antd/lib/message'
import BigNumber from 'bignumber.js'
import { Ifo } from 'config/constants/types'
import styled from "styled-components"
import ConnectWalletButton from 'components/ConnectWalletButton'
import useIntl from 'hooks/useIntl'
import { useActiveWeb3React } from 'hooks'
import { AutoRow, RowBetween } from 'components/Row'
import { Button } from 'uikit'
import address from 'config/constants/contracts'
import { AppState } from 'state'
import { useIfoLpContract, useIfoV2Contract } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import { approveNoPromise } from 'utils/callHelpers'
import Flex from 'components/layout/Flex'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import IfoCardTopView from './cardTopView'
import { CouponStyle } from './IfoLayout'

interface Iprops { ifo: Ifo; rewardValue: number; totalLpStakeValue: string; reclaim: number }

const IfoFinished = ({ ifo, rewardValue, totalLpStakeValue, reclaim }: Iprops) => {
  const intl = useIntl()
  const { account } = useActiveWeb3React()
  const { lpStake, lpAllowance, lpBalance } = useSelector(({ ifos }: AppState): AppState['ifos'] => ifos)
  const masterContract = useIfoV2Contract(ifo.address)
  const lpContract = useIfoLpContract(getAddress(ifo.currency.address))

  const [showTxConfirm, setShowTxConfirm] = useState(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [pendingText, setPendingText] = useState('')
  const onTxDismiss = () => {
    setShowTxConfirm(false)
  }

  const handleTx = (promise) => {
    promise.on('transactionHash', (hash) => {
      console.log('pendding', hash)
      setTxHash(hash)
    })
      .on('receipt', async (receipt: any) => {
        console.log('success', receipt)
        setAttemptingTxn(false)
      })
      .on('error', (error) => {
        try {
          console.log('error', error)
          message?.error('error')
          setShowTxConfirm(false)
        } catch (err) {
          console.log('error', err)
        }
      })
  }
  const onApprove = async () => {
    setShowTxConfirm(true)
    setAttemptingTxn(true)
    const _approve = (approveNoPromise(lpContract, masterContract, account) as any)
    handleTx(_approve)
  }
  const allowance = new BigNumber(lpAllowance[getAddress(ifo.currency.address)])
  const lpTokenBalance = new BigNumber(lpBalance[getAddress(ifo.currency.address)])
  const lpStakeValue = lpStake[getAddress(ifo.currency.address)]
  // const lpStakeValue = '0.00'
  const hasApprove = account && allowance && allowance.isGreaterThan(0)

  const onClaim =  () => {
    setShowTxConfirm(true)
    setAttemptingTxn(true)
    handleTx(
      masterContract.methods.claim(ifo.pid)
        .send({ from: account, gas: 200000 })
    )
  }
  return <IfoFinishedStyle>
    <IfoCardTopView ifo={ifo} />
    {!account ? <ConnectWalletButton width="100%" /> : (<>
      <CouponStyle>
        <div>
          <div className="row-title">{intl('ifo.YOUR_LP_TOKENS_COMMITTED')}</div>
          <RowBetween>
            <div className="row-value-1">{lpStakeValue || '0.00'}</div>
            {reclaim > 0 && <Reclaim>{reclaim.toFixed(6)} {intl('ifo.toReclaim') }</Reclaim>}
          </RowBetween>
        </div>
        <div>
          <div className="row-title">{ifo.sellToken.symbol} {intl('ifo.TO_RECEIVE')}</div>
          <div className="row-value-3">{rewardValue || '0.00'}</div>
        </div>
        <div className="line" />
      </CouponStyle>
      {!hasApprove ? (
        <AutoRow justify="center">
          <Button width="100%" variant="gradual" onClick={onApprove}>{intl('global.approve')}</Button>
        </AutoRow>
      ) : (
        <AutoRow justify="center">
            {lpStakeValue && parseFloat(lpStakeValue) > 0 ? <Button width="100%" variant="gradual" onClick={onClaim}>Claim</Button> :
              <Button width="100%" disabled variant="tertiary">{intl('ifo.nothingtoClaim')}</Button>}
        </AutoRow>
      )}
      <div className="tips">{intl('ifo.overToken')}</div>
    </>)}
    <TransactionConfirmationModal
      isOpen={showTxConfirm}
      onDismiss={onTxDismiss}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      pendingText={pendingText}
      content={() => (<div>test</div>)}
    />
  </IfoFinishedStyle>
}

export default IfoFinished

const IfoFinishedStyle = styled.div`
.row-title{
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text3}
}
.row-value-1
{
  font-size: 22px;
  font-weight: 600;
  padding-top: 17px;
  padding-bottom: 40px;
}

.row-value-3{
  font-size: 22px;
  font-weight: 600;
  padding-top: 17px;
}
button{
  margin-bottom: 20px
}
.tips{
  font-size: 14px;
  margin-bottom: 20px;
  color: ${({theme}) => theme.colors.unimportant}
}
`
const Reclaim = styled.div`
margin-bottom: 10px;
color: ${({theme}) => theme.colors.unimportant};
`