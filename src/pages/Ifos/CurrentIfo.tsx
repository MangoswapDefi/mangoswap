import React from 'react'
import { ifosConfig } from 'config/constants'
import useGetPublicIfoV2Data from 'hooks/ifo/v2/useGetPublicIfoData'
import useGetWalletIfoV2Data from 'hooks/ifo/v2/useGetWalletIfoData'
import BigNumber from 'bignumber.js'
import { PublicIfoData } from 'hooks/ifo/types'
import IfoFoldableCard from './components/IfoFoldableCard'
import IfoLayout from './components/IfoLayout'

import IfoQuestions from './components/IfoQuestions'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  // const publicIfoData = useGetPublicIfoV2Data(activeIfo)
  const walletIfoData = useGetWalletIfoV2Data(activeIfo)

  const publicIfoData: PublicIfoData = {
    status: 'live',
    blocksRemaining: 500,
    secondsUntilStart: 1000,
    progress: 1000,
    secondsUntilEnd: 100,
    startBlockNum: 1000,
    endBlockNum: 10000,
    currencyPriceInUSD: new BigNumber('500'),
    numberPoints: 1122,
    fetchIfoData: () => {
      // 
    },
    // poolBasic ?: PoolCharacteristics
    poolUnlimited: {
      raisingAmountPool: new BigNumber('500'),
      offeringAmountPool: new BigNumber('500'),
      limitPerUserInLP: new BigNumber('500'),
      taxRate: 500,
      totalAmountPool: new BigNumber('500'),
      sumTaxesOverflow: new BigNumber('500'),
    }
  }
  console.log('---publicIfoData---', publicIfoData.status)
  // console.log('---walletIfoData---', walletIfoData)
  return (
    <IfoLayout>
      <IfoFoldableCard ifo={activeIfo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} isInitiallyVisible />
      <IfoQuestions />
    </IfoLayout>
  )
}

export default Ifo
