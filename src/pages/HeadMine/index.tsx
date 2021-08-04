import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import Container from 'components/Container'
import Countdown from 'components/countdown'
import { RowBetween } from 'components/Row'
import { useActiveWeb3React } from 'hooks'
import useIntl from 'hooks/useIntl'
import { AppBodyBox } from 'pages/AppBody'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import React, {  useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useIsMobile } from 'uikit/theme/base'
import { Button, Flex, Progress, Text } from 'uikit'
import { formatNumber } from 'utils/formatBalance'
import { baseColors } from 'uikit/theme/colors'
import { HEAD_MINE_END_TIME, HEAD_MINE_OKB_TOTAL, HEAD_MINE_OKT_TOTAL, PLATFORM_COIN } from 'utils/config'
import { AppState, useAppDispatch } from 'state'
import { setFristKnsBalanceAsync } from 'state/fristMine'
import { KNS_ADDRESS } from 'config/constants/contracts'
import { message } from 'antd'
import { getFristOkbMineAddress, getFristOktMineAddress, get_OKB_address } from 'utils/addressHelpers'
import { BrowserView, MobileOnlyView } from 'react-device-detect'
import useHeadMinetotalSupply from 'pages/HeadMine/totalSupplyHook'
import HeadMineCard, { supplyContractParams } from './card'
import useBalance, { useHeadMine_OKT_KNS_Balance, useHeadMineGlobalBalance, useHeadMine_OKB_KNS_Balance } from './balanceHooks'
// import use_OKT_totalSupply from './totalSupplyHook'
import getProgress from './progress'
import HeadMineStake, { HeadMineUnStake, InterfaceUnStake } from './stake'

const HeadMine = () => {
  const history = useHistory()
  const intl = useIntl()
  const [showConfirm, setShowConfirm] = useState(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [pendingText, setPendingText] = useState('')
  const dispatch = useAppDispatch()
  const { account } = useActiveWeb3React()
  const oktBalance = useBalance({ account, address: getFristOktMineAddress() })
  const okbBalance = useBalance({ account, address: getFristOkbMineAddress(), isOkt: false, decimals: 10 })
  const user_okt_kns_balance = useHeadMine_OKT_KNS_Balance({ account, address: getFristOktMineAddress() })
  const user_okb_kns_balance = useHeadMine_OKB_KNS_Balance({ account, address: getFristOkbMineAddress() })
  const kns_balance = useHeadMineGlobalBalance({ account })
  const fristMine = useSelector((state: AppState) => state.fristMine)
  const getKnsBalance = (type: 'OKT' | 'OKB'): string  => fristMine.knsBalance[KNS_ADDRESS()[type]]


  // total OKB/OKT
  const OKBSupply = useHeadMinetotalSupply(getFristOkbMineAddress(), true)
  const OKTSupply = useHeadMinetotalSupply(getFristOktMineAddress(), false)

  const statedOKT = parseFloat(HEAD_MINE_OKT_TOTAL) - parseFloat( getKnsBalance('OKT'))
  const statedOKB = parseFloat(HEAD_MINE_OKT_TOTAL) - parseFloat( getKnsBalance('OKB'))
  
  // const totalSupply = use_OKT_totalSupply()
  useEffect(() => {
    setFristKnsBalanceAsync(kns_balance)(dispatch)
  }, [kns_balance, dispatch])
  const onDismiss = () => {
    setShowConfirm(false)
  }
  const isLive = +new Date() < HEAD_MINE_END_TIME
  const handleTx = (promise) => {
    promise
      .on('transactionHash', (hash: string) => {
        console.log('pendding', hash)
        setTxHash(hash)
      })
    .on('receipt', async (receipt: any) => {
      console.log('success', receipt)
      setAttemptingTxn(false)
      // message.success('success !')
      // Reload
      // window.location.reload()
      // history.go(0)
    })
    .on('error', (error) => {
      try {
        console.log('error', error)
        message?.error('error')
        setShowConfirm(false)
      } catch (err) {
        console.log('error', err)
      }
    })
  }
  const onSupply = async (data: supplyContractParams) => {
    setShowConfirm(true)
    setAttemptingTxn(true)
    handleTx(HeadMineStake(data))
  }
  const unStake = async (data: InterfaceUnStake) => {
    setShowConfirm(true)
    setAttemptingTxn(true)
    handleTx(HeadMineUnStake(data))
  }
  const isMobile = useIsMobile()
  return <>
    <Container>
      {!isMobile ? <>
    <div style={{ height: 40 }} />
    {isLive ? <Countdown /> : <div style={{ filter: 'grayscale(100%)', userSelect: 'none', opacity: 0.4 }}>
      <Countdown />
    </div>}
    <div style={{ height: 40 }} />
    <Flex style={{zIndex: 0}}>
      <OKTCard>
        <HeadMineCard isLive={isLive} balance={oktBalance} knsBalance={user_okt_kns_balance} onSupply={onSupply} unStake={unStake} type="OKT" totalSupply={OKTSupply} />
        <AppBodyBox>
          <TotalVolume>
            <Progress primaryStep={100 - getProgress(getKnsBalance('OKT'), undefined, HEAD_MINE_OKT_TOTAL)} scale="md" />
            <RowBetween className="totalVolume">
              <Text fontSize="12px">{intl('preMiner.volumeMined')}</Text>
              <Text fontSize="12px">{`${formatNumber(statedOKT, 0, 0)} / ${formatNumber(parseInt(HEAD_MINE_OKT_TOTAL), 0, 0)} `}  { PLATFORM_COIN }</Text>
            </RowBetween>
          </TotalVolume>
        </AppBodyBox>
      </OKTCard>
      <OKBCard>
        <HeadMineCard isLive={isLive} balance={okbBalance} knsBalance={user_okb_kns_balance} onSupply={onSupply} unStake={unStake} type="OKB" totalSupply={OKBSupply} />
        <AppBodyBox>
          <TotalVolume>
            <Progress primaryStep={100 - getProgress(getKnsBalance('OKB'), undefined, HEAD_MINE_OKB_TOTAL)} scale="md" />
            <RowBetween className="totalVolume">
              <Text fontSize="12px">{intl('preMiner.volumeMined')}</Text>
              <Text fontSize="12px">{`${formatNumber(statedOKB, 0, 0)} / ${formatNumber(parseInt(HEAD_MINE_OKT_TOTAL), 0, 0)} `} { PLATFORM_COIN }</Text>
            </RowBetween>
          </TotalVolume>
        </AppBodyBox>
      </OKBCard>
    </Flex>
    <Tips />
    <TransactionConfirmationModal
      isOpen={showConfirm}
      onDismiss={onDismiss}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      pendingText={pendingText}
      content={() => (<div>test</div>)}
    />
 </>:
   
        <MobileBox>
          {isLive ? <Countdown /> : <div style={{ filter: 'grayscale(100%)', userSelect: 'none', opacity: 0.4 }}>
            <Countdown />
          </div>}
          <div style={{ height: 40 }} />
          <HeadMineCard isLive={isLive} balance={oktBalance} knsBalance={user_okt_kns_balance} onSupply={onSupply} unStake={unStake} type="OKT" totalSupply={OKTSupply} />
          <AppBodyBox>
            <TotalVolume>
              <Progress primaryStep={100 - getProgress(getKnsBalance('OKT'), undefined, HEAD_MINE_OKT_TOTAL)} scale="md" />
              <RowBetween className="totalVolume">
                <Text fontSize="12px">{intl('preMiner.volumeMined')}</Text>
                <Text fontSize="12px">{`${formatNumber(statedOKT, 0, 0)} / ${formatNumber(parseInt(HEAD_MINE_OKT_TOTAL), 0, 0)} `}  { PLATFORM_COIN }</Text>
              </RowBetween>
            </TotalVolume>
          </AppBodyBox>
          <div style={{ height: 40 }} />
          <HeadMineCard isLive={isLive} balance={okbBalance} knsBalance={user_okb_kns_balance} onSupply={onSupply} unStake={unStake} type="OKB" totalSupply={OKBSupply} />
          <AppBodyBox>
            <TotalVolume>
              <Progress primaryStep={100 - getProgress(getKnsBalance('OKB'), undefined, HEAD_MINE_OKB_TOTAL)} scale="md" />
              <RowBetween className="totalVolume">
                <Text fontSize="12px">{intl('preMiner.volumeMined')}</Text>
                <Text fontSize="12px">{`${formatNumber(statedOKB, 0, 0)} / ${formatNumber(parseInt(HEAD_MINE_OKT_TOTAL), 0, 0)} `} { PLATFORM_COIN }</Text>
              </RowBetween>
            </TotalVolume>
          </AppBodyBox>
      </MobileBox>
    }
  </Container>
</>
}
const Tips = () => {
  return (
    <TipsStyle>
      <p>1. KNS Address 0x35500253DEB46fa8c2b271628c65DcF159206882. </p>
      <p>2. Only 3 days： Stake OKT and OKB for platformcoin(KNS) mining, get KNS rewards. </p>
      <p>3. Each pool has 15,000,000 KNS, your earned will be based on the amount of OKT/OKB you put in as a percentage of all funds in the pool.</p>
      <p>4. You can stake tokens, withdraw tokens and Claim your KNS earning at any time.</p>
      <p>5. When the App launch, you can find the entrance at Home Page to Claim&amp;Unstake.</p>
    </TipsStyle>
  )
}

const TipsStyle = styled.div`
text-align: left;
margin-top: 36px;
width: 675px;
opacity: 0.4;
p{
  color: ${({ theme }) => theme.colors.unimportant};
  line-height: 19px;
  font-size: 14px;
}
`
const TotalVolume = styled.div`
margin-top: 43px;
`
const CardWidth = '280px'
const OKTCard = styled.div`
width: ${CardWidth};
.totalVolume{
  margin-top: 5px;
}
`
const OKBCard = styled(OKTCard)`
width: ${CardWidth};
margin-left: 115px;
`

// mobile
const MobileBox = styled.div`
width: 100vw;
padding: 40px 15px;
`

export default HeadMine
