import React, { useState, useRef, useEffect } from 'react'
import { Button, Skeleton } from 'uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import useIntl from 'hooks/useIntl'
import { useKnsPriceUsdt } from 'state/hooks'
import { useCountUp } from 'react-countup'
import { FarmWithStakedValue } from '../../FarmCard/FarmCard'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  // const cakePrice = usePriceCakeBusd()
  // const knsPrice = usePriceKNSUSDT();
  const knsPrice = useKnsPriceUsdt()
  let earnings = 0
  const intl = useIntl()
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default abalance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(knsPrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsBusd,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(earningsBusd)
  }, [earningsBusd, updateValue])

  // console.log(earnings, pendingTx, userDataReady)
  return (
    <ActionContainer>
      <ActionTitles>
        <Title style={{ color: '#333333' }}>MGS </Title>
        <Subtle>{intl('farms.earned')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          {countUp > 0 && <Staked>~{countUp}USD</Staked>}
        </div>
        <Button
          disabled={!earnings || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
          ml="4px"
          style={{ color: '#fff' }}
        >
          {intl('farms.harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
