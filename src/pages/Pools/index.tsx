import React, { useEffect, useState } from 'react'
// import { useRouteMatch } from 'react-router-dom'
import Page from 'components/layout/Page'
import styled from 'styled-components'
import message from 'antd/lib/message'
import { getKnsPoolContract } from 'utils/contractHelpers'
import { GetWeb3Account } from 'utils/web3'
import { PageContainerStyle } from 'components/styles'
import { getApr } from 'utils/apr'
import { useActiveWeb3React } from 'hooks'
import useIntl from 'hooks/useIntl'
import backgroundPng from 'assets/png/background.png'
import { useKnsPoolInfo, useKnsReward, usePoolTotalStake } from 'state/hooks'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import POOLS from 'config/constants/pools'
// import { Token } from 'config/constants/types'
import PoolsCard from './components/PoolCard'
import PoolsBanner from './components/PoolsBanner'
import knsStake, { InterfaceUnStake, knsUnStake, supplyContractParams } from './components/PoolCard/stake'
// import PoolTabButtons from './components/PoolTabButtons'

export const PoolPage = styled.div`
  // background-image: url(${backgroundPng});
  // background-repeat: no-repeat;
  // z-index: -1;
  // background-attachment: fixed;
  // background-size: cover;
`

const CardWidth = '280px'
const CardWrap = styled.div`
  width: ${CardWidth};
  margin: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0px;
  }
  .totalVolume {
    margin-top: 5px;
  }
`

const Pools: React.FC = () => {
  // const { isExact } = useRouteMatch()
  // const [stakedOnly, setStakedOnly] = useState(false)
  // const stakedOnlyPools = false
  // const hasStakeInFinishedPools = false
  const intl = useIntl()

  const [showConfirm, setShowConfirm] = useState(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [pendingText] = useState('')
  const { account } = useActiveWeb3React()

  const MgsInfo_a = useKnsPoolInfo({ account, pid: POOLS[0].sousId })
  const earnBalance_a = useKnsReward({ pid: POOLS[0].sousId, account, contract: getKnsPoolContract(GetWeb3Account()) })
  const MgsTotalStake_a = usePoolTotalStake({ pid: POOLS[0].sousId, contract: getKnsPoolContract(GetWeb3Account()) })
  const [mgsApr_a, setMgsApr_a] = useState('0')

  useEffect(() => {
    if (MgsTotalStake_a) {
      setMgsApr_a(getApr({ totalStake: MgsTotalStake_a }))
    }
  }, [MgsTotalStake_a])

  const pools = [
    {
      id: POOLS[0].sousId,
      stakeBalance: MgsInfo_a.amount,
      earnBalance: earnBalance_a,
      totalStake: MgsTotalStake_a,
      apr: mgsApr_a,
      stakingToken: POOLS[0].stakingToken,
      earningToken: POOLS[0].earningToken,
    },
  ]

  const onDismiss = () => {
    setShowConfirm(false)
  }
  const handleTx = (promise: any) => {
    promise
      .on('transactionHash', (hash: string) => {
        setTxHash(hash)
      })
      .on('receipt', async () => {
        setAttemptingTxn(false)
      })
      .on('error', (err) => {
        console.error(err)
        message?.error('error')
        setShowConfirm(false)
      })
  }
  const onSupply = async (data: supplyContractParams) => {
    setShowConfirm(true)
    setAttemptingTxn(true)
    handleTx(knsStake(data))
  }
  const unStake = async (data: InterfaceUnStake) => {
    setShowConfirm(true)
    setAttemptingTxn(true)
    handleTx(knsUnStake(data))
  }

  return (
    <PoolPage>
      <PageContainerStyle>
        <PoolsBanner title={intl('pools.mangoPOOLS')} describe={intl('pools.mangoPOOLSInfo')} />
        <Page>
          {/* <PoolTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedPools={hasStakeInFinishedPools}
          /> */}

          <CardWrap>
            {pools.map((item) => (
              <PoolsCard
                balance={item.stakeBalance}
                knsBalance={item.earnBalance}
                onSupply={onSupply}
                unStake={unStake}
                APR={item.apr}
                totalStake={item.totalStake}
                type="MGS"
                key={item.id}
                stakingToken={item.stakingToken}
                earningToken={item.earningToken}
                pid={item.id}
              />
            ))}
          </CardWrap>

          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={onDismiss}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            pendingText={pendingText}
            content={() => <div />}
          />
        </Page>
      </PageContainerStyle>
    </PoolPage>
  )
}

export default Pools
