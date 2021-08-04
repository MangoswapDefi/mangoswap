import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, LinkExternal } from 'uikit'
import { Ifo } from 'config/constants/types'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { AutoRow, RowBetween } from 'components/Row'
import { useActiveWeb3React } from 'hooks'
import NumberSelect from 'components/NumberSelect'
import { approveNoPromise } from 'utils/callHelpers'
import { useIfoLpContract, useIfoV2Contract } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import message from 'antd/lib/message'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import useIntl from 'hooks/useIntl'
import { BASE_ADD_LIQUIDITY_URL, DEFAULT_TOKEN_DECIMAL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { CouponStyle } from './IfoLayout'

const IfoStakeView = ({ ifo, rewardValue, totalLpStakeValue }: { ifo: Ifo; rewardValue: number; totalLpStakeValue: string }) => {
  const intl =  useIntl()
  const { account } = useActiveWeb3React()
  const {lpStake, lpAllowance, lpBalance} = useSelector(({ifos}: AppState): AppState['ifos'] => ifos)
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
  const _onSupply = () => {
    setIsOpen(true)
  }
  const allowance = new BigNumber(lpAllowance[getAddress(ifo.currency.address)])
  const lpTokenBalance = new BigNumber(lpBalance[getAddress(ifo.currency.address)])
  const lpStakeValue = lpStake[getAddress(ifo.currency.address)]
  const hasApprove = account && allowance && allowance.isGreaterThan(0)
  const isLive = true

  const [isOpen, setIsOpen] = useState(false)
  const onStakeDismiss = () => {
    setIsOpen(false)
  }
  const onStakeConfirm = async (value: string) => {
    setIsOpen(false)
    setShowTxConfirm(true)
    setAttemptingTxn(true)
    handleTx(
      masterContract.methods
        .swap(ifo.pid, new BigNumber(value).times(DEFAULT_TOKEN_DECIMAL).toString())
        .send({ from: account })
    )
  }
  const CoinType = ifo.currency.symbol
  const numberSelectTitleText = 'Stake Lp'
  const tipsBalance = lpTokenBalance.toFixed(2) ?? '0.00'
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress: ifo.quoteToken.address, tokenAddress: ifo.token.address })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const totalRetio = (parseFloat(lpStakeValue) / parseFloat(totalLpStakeValue)) || 0
  return (<IfoSatkeBoxStyle isAccount={Boolean(account)}>
    {!account ? <ConnectWalletButton width="100%" /> : (<>
      <CouponStyle>
        <div>
          <div className="row-title">{intl('ifo.YOUR_LP_TOKENS_COMMITTED') }</div>
          <RowBetween>
            <div className="row-value-1">{lpStakeValue || '0.00'}</div>
            <div className="row-value-2">~{totalRetio ? totalRetio * ifo.poolBasic.raiseAmountNumber : 0} USD | {totalRetio ? (totalRetio * 100).toFixed(2) : '0.00'}% {intl('ifo.ofTotal')}</div>
          </RowBetween>
        </div>
        <div>
          <div className="row-title">{ifo.sellToken.symbol} {intl('ifo.TO_RECEIVE')}</div>
          <div className="row-value-3">~{rewardValue || '0.00'}</div>
        </div>
        <div className="line" />
      </CouponStyle>
      {!hasApprove ? (
        <AutoRow justify="center">
          <Button width="100%" variant="gradual" onClick={onApprove}>{intl('global.approve') }</Button>
        </AutoRow>
      ) : (
        <AutoRow justify="center">
            <Button width="100%" variant="gradual" disabled={!isLive} onClick={_onSupply}>{intl('ifo.commitLPTokens')}</Button>
        </AutoRow>
      )}
    </>)}
    <NumberSelect
      isOpen={isOpen}
      onConfirm={onStakeConfirm}
      onDismiss={onStakeDismiss}
      titleText={numberSelectTitleText}
      CoinType={CoinType}
      tipsBalance={tipsBalance}
      Footer={() => (<div style={{marginTop: '20px'}}>
        <AutoRow justify="center">
          <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
            {intl('farms.get')} {CoinType}
          </LinkExternal>
        </AutoRow>
      </div>)}
    />
    <TransactionConfirmationModal
      isOpen={showTxConfirm}
      onDismiss={onTxDismiss}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      pendingText={pendingText}
      content={() => (<div>test</div>)}
    />
  </IfoSatkeBoxStyle>)
}

export default IfoStakeView

const IfoSatkeBoxStyle = styled.div<{isAccount: boolean}>`
margin-bottom: ${({ isAccount }) => isAccount ? '24px' : '0px'};
.row-title{
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text3};
  /* margin-bottom: 25px; */
}
.row-value-1{
  font-size: 22px;
  color: ${({ theme }) => theme.colors.title};
  /* margin-top: 8px; */
  font-weight: 600;
  padding-top: 17px;
  padding-bottom: 50px;
}
.row-value-2{
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text3};
  margin-top: 16px;
  margin-bottom: 45px;
  font-weight: 500;
}
.row-value-3{
  font-weight: 600;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 600;
  padding-top: 10px;
}
`