import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouteMatch } from 'react-router-dom'
import { AppState } from 'state'
import {
  CardHeader,
  ExpandableButtonV2,
} from 'uikit'
import { Ifo } from 'config/constants/types'
import { setIfosStatusList } from 'state/ifos'
import useLiveStatus from 'hooks/useLiveStatus'
import getStatusValue from './components/getStatus'
import IfoTagStyle from './styles'
import IfoProjectCard from './components/Card'


const IfoItem = ({ ifos: ifoList }: { ifos: Array<Ifo> }) => {
  const ifo = ifoList[0]
  const dispatch = useDispatch()
  const { isExact } = useRouteMatch()
  const { id } = ifo
  const [isVisible, setIsVisible] = useState(true)
  const { status } = useLiveStatus({ ifo, pid: ifo.pid, ifoContractAddress: ifo.address })
  
  useEffect(() => {
    dispatch(setIfosStatusList({ [ifo.pid]: status }))
  }, [status, dispatch, ifo.pid])
  
  const statusValue = getStatusValue(status)
  return isExact && status === 'finished' ? null :
    !isExact && status !== 'finished' ? null :
    (<IfoItemStyle>
    <Header ifoId={id}>
      <>
        <IfoTagStyle>{statusValue}</IfoTagStyle>
        <ExpandableButtonV2 expanded={isVisible} onClick={() => setIsVisible((prev) => !prev)} />
      </>
    </Header>
    <IfosRow>
      {ifoList.map((_ifo) => <IfoProjectCard isVisible={isVisible} ifo={_ifo} />)}
    </IfosRow>
  </IfoItemStyle>)
}
export default IfoItem

const cardWidth = 458
const cardRadius = 43
const IfosRow = styled.div`
display: block;
${({ theme }) => theme.mediaQueries.sm} {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}
`

const IfoItemStyle = styled.div`
  width: ${cardWidth}px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 956px;
  }
  max-width: 100%;
  padding: 0px 10px;
  margin: auto;
  border-radius: ${cardRadius}px;
  background-color: rgb(246, 246, 246);
  margin-bottom: 17px;
  .site-collapse-custom-collapse{
    background: white;
    .ant-collapse-header{
      text-align: center;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 600;
    }
    .anticon{
      zoom: 0.8;
      display: inline-block;
      margin-left: 6px;
    }
  }
  .site-collapse-custom-panel{}
  .projectIntro{
    p{
      color: ${({ theme }) => theme.colors.unimportant};
      margin-bottom: 10px;
    }
  }
`
const Header = styled(CardHeader) <{ ifoId: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 112px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.svg')`};
  border-radius: ${cardRadius}px;
  position: relative;
`

