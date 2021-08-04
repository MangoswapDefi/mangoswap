import BigNumber from 'bignumber.js'
import Collapse from 'antd/lib/collapse'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons/lib/icons'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouteMatch } from 'react-router-dom'
import { AppState } from 'state'
import { useActiveWeb3React, useActiveWeb3React2 } from 'hooks'
import Row, { AutoRow, RowBetween } from 'components/Row'
import {
  Card,
  CardHeader,
  ExpandableButton,
  ExpandableButtonV2,
  Button,
  Flex,
  Text,
  HelpIcon,
  CardBody,
  useTooltip,
  LinkExternal
} from 'uikit'
import { Ifo, IfoStatus } from 'config/constants/types'
import useLiveStatus from 'hooks/useLiveStatus'
import { IfosDefaultActiveKey } from 'config/constants/ifo'
import { getAddress } from 'utils/addressHelpers'
import useIntl from 'hooks/useIntl'
import { useIsMobile } from 'uikit/theme/base'
import { useIfoV2Contract } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import IfoCountDownTime from './IfoCountDownTime'
import IfoPoolCard from './IfoFoldableCard/IfoPoolCard'
import IfoStakeView from './stake'
import IfoFinished from './IfoFinished'
import getStatusValue from './getStatus'
import IfoTagStyle from '../styles'

export interface IfoCardProps {
  ifo: Ifo;
  isVisible: boolean;
}

const IfoProjectCard: React.FC<IfoCardProps> = ({ ifo, isVisible }) => {
  const isMobile = useIsMobile()
  const intl = useIntl()
  const { account } = useActiveWeb3React()
  const { chainId, active } = useActiveWeb3React2()

  const { lpStake, totalLpStake } = useSelector(({ ifos }: AppState): AppState['ifos'] => ifos)

  const { status, poolAmountTotal, openAt, closeAt } = useLiveStatus({ ifo, pid: ifo.pid, ifoContractAddress: ifo.address })

  const lpStakeValue = lpStake[getAddress(ifo.currency.address)]
  const totalLpStakeValue = totalLpStake[ifo.pid]
  const rewardValue = poolAmountTotal.amountTotal0 > 0 ? poolAmountTotal.amountTotal0 * parseFloat(lpStakeValue) / poolAmountTotal.amountTotal1 : 0

  const statusValue = getStatusValue(status)
  const HeadNode = ({ isActive }: { isActive: boolean }) => {
    return isActive ? <>
      <span>{intl('ifo.Hide')}</span>
      <CaretUpOutlined />
    </> : <>
        <span>{intl('ifo.Detail')}</span>
      <CaretDownOutlined />
    </>
  }
  const totalCommitted = (parseFloat(totalLpStakeValue) / poolAmountTotal.amountTotal0) || 0

  const cardWidth = isMobile ? 389 : 458
  const reclaim = totalCommitted > 100 ? parseFloat(lpStakeValue) / parseFloat(totalLpStakeValue) * totalCommitted  : 0
  return <Flex>
    <AutoRow justify="center">
      <FoldableContent>
        <IfoCard isVisible={isVisible} cardWidth={cardWidth}>
          <Card>
            <CardHeader variant="default">
              <Flex justifyContent="space-between" alignItems="center">
                <Text bold fontSize="20px">{ifo.name}</Text>
                <IfoTagStyle>{statusValue}</IfoTagStyle>
              </Flex>
            </CardHeader>
            <CardBody>
              {status !== 'finished' && <IfoCountDownTime openAt={openAt} closeAt={closeAt} status={status} ifo={ifo} />}
              {status === 'live' && <>
                <IfoStakeView rewardValue={rewardValue} totalLpStakeValue={totalLpStakeValue} ifo={ifo} />
                {account && <Line />}
              </>}
              {status === 'finished' && <IfoFinished reclaim={reclaim} rewardValue={rewardValue} totalLpStakeValue={totalLpStakeValue} ifo={ifo} />}
              {status === 'coming_soon' && !account && <ConnectWalletButton width="100%" />}
              {account && <>
                <RowBetween>
                  <Text>{intl('ifo.totalCommitted')}:   </Text>
                  <Text>${ifo.poolBasic.raiseAmountNumber * totalCommitted} ({totalCommitted}%)</Text>
                </RowBetween>
              </>}
            </CardBody>
            <Collapse
              bordered={false}
              defaultActiveKey={IfosDefaultActiveKey}
              expandIcon={({ isActive }) => <HeadNode isActive={isActive} />}
              className="site-collapse-custom-collapse"
            >
              <Collapse.Panel header="" key={ ifo.pid } className="site-collapse-custom-panel">
                <div className="projectIntro">{ifo.projectIntro.map(v => (<p>{v}</p>))}</div>
                <RowBetween>
                  <Text small>{intl('ifo.endTime', 'End Time')}</Text>
                  <Text small>{dayjs(closeAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </RowBetween>
                <RowBetween>
                  <Text small>{intl('ifo.forSale', 'For Sale')}</Text>
                  <Text small>{ifo.poolBasic.saleAmount}</Text>
                </RowBetween>
                <RowBetween>
                  <Text small>{intl('ifo.raiseUSD', 'To raise(USD)')}</Text>
                  <Text small>{ifo.poolBasic.raiseAmount}</Text>
                </RowBetween>
                <RowBetween>
                  <Text small>{intl('ifo.totalRaised', 'Total raised(% of target)')}</Text>
                  <Text small>{!chainId ? '--' : `${totalCommitted}%`}</Text>
                </RowBetween>
                <RowBetween>
                  <Text small>{intl('ifo.totalBurn', 'Total burn')}</Text>
                  <Text small>{ifo.poolBasic.cakeToBurn}</Text>
                </RowBetween>
                <div style={{ height: '20px' }} />
                <AutoRow justify="center">
                  <LinkExternal href={ifo.projectSite} style={{ alignSelf: 'center' }}>{intl('ifo.viewProjectSite', 'View project site')}</LinkExternal>
                </AutoRow>
              </Collapse.Panel>
            </Collapse>
          </Card>
        </IfoCard>
      </FoldableContent>
    </AutoRow>
  </Flex>
}

export default IfoProjectCard
  


const FoldableContent = styled.div`
`

const Line = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderColor};
  margin-bottom: 25px;
`



const IfoCard = styled.div<{
  isVisible: boolean;
  cardWidth: number;
}>`
width: ${({ cardWidth }) => `${cardWidth}px`};
max-width: calc(100vw - 10px);
display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
position: relative;
padding: 35px 25px;
.site-collapse-custom-collapse{
background-color: white;
}
  #noshade{
    box-shadow: none;
    background-color: rgba(255,255,255,0.7);
  }
  .ant-collapse > .ant-collapse-item{
    border-width: 0px;
  }
`