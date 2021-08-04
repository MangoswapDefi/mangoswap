import React from 'react'
import { Card, CardBody, CardHeader, Text, useTooltip, HelpIcon, Flex } from 'uikit'
import { Ifo } from 'config/constants/types'
import { PublicIfoData, WalletIfoData } from 'hooks/ifo/types'
import IfoCardTokens from './IfoCardTokens'
import IfoCardActions from './IfoCardActions'
import IfoCardDetails from './IfoCardDetails'

interface IfoCardProps {
  poolId: any
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
}

interface CardConfig {
  [key: string]: {
    title: string
    variant: 'blue' | 'violet'
    tooltip: string
  }
}

const cardConfig: CardConfig = {
  poolBasic: {
    title: 'Basic Sale',
    variant: 'blue',
    tooltip: 'Every person can only commit a limited amount, but may expect a higher return per token committed.',
  },
  poolUnlimited: {
    title: 'Unlimited Sale',
    variant: 'violet',
    tooltip: 'No limits on the amount you can commit. Additional fee applies when claiming.',
  },
}

const SmallCard: React.FC<IfoCardProps> = ({ poolId, ifo, publicIfoData, walletIfoData }) => {
  const config = cardConfig[poolId]
  const hasProfile = false
  const { targetRef, tooltip, tooltipVisible } = useTooltip(config.tooltip, 'bottom')

  const isLoading = publicIfoData.status === 'idle'

  return (
    <>
      {tooltipVisible && tooltip}
      <Card>
        <CardHeader variant={config.variant}>
          <Flex justifyContent="space-between" alignItems="center">
            <Text bold fontSize="20px">
              {config.title}
            </Text>
            <div ref={targetRef}>
              <HelpIcon />
            </div>
          </Flex>
        </CardHeader>
        <CardBody>
          <IfoCardTokens
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            hasProfile={hasProfile}
            isLoading={isLoading}
          />
          <IfoCardActions
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            hasProfile={hasProfile}
            isLoading={isLoading}
          />
          <IfoCardDetails poolId={poolId} ifo={ifo} publicIfoData={publicIfoData} />
        </CardBody>
      </Card>
    </>
  )
}

export default SmallCard
