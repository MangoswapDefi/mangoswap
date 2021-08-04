import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Button, Progress } from 'uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { AutoRow } from 'components/Row'
import { useActiveWeb3React } from 'hooks'
import useIntl from 'hooks/useIntl'
import { Ifo, IfoStatus } from 'config/constants/types'
import dayjs from 'dayjs'
import { useTimer } from 'hooks/useTimer'
import timerIcon from 'assets/png/timer.png'
import IfoCardTopView from './cardTopView'

const diffTime = (time: number | Date) => {
  try {
    const diffM = dayjs(time).diff(new Date(), 'minute')
    const D = diffM / 60 / 24
    const H = (D - parseInt(D.toString())) * 24
    const m = (H - parseInt(H.toString())) * 60
    return `${parseInt(D.toString())}d,${parseInt(H.toString())}h,${parseInt(m.toString())}m`
  } catch (error) {
    return '0d,0h,0m'
  }
}
const IfoCountDownTime = ({ ifo, status, openAt, closeAt }: { ifo: Ifo; status: IfoStatus; openAt: Date; closeAt: Date }) => {
  const { account } = useActiveWeb3React()
  const intl = useIntl()

  const timeReFetch = useTimer(10000)
  
  // eslint-disable-next-line
  const startValue = useCallback(() => diffTime(openAt), [timeReFetch, openAt])
  // eslint-disable-next-line
  const endValue = useCallback(() => diffTime(closeAt), [timeReFetch, closeAt])
  const primaryStep = status === 'coming_soon' ? 0 :
    status === 'live' ? ((+new Date()) - (+openAt)) / ((+closeAt) - (+openAt)) * 100 :
      0
  return (<IfoCountDownTimeStyle>
    <IfoCardTopView ifo={ifo} />
    {status === 'live' && <Progress primaryStep={primaryStep} scale="md" />}
    <AutoRow justify="center">
      <img className="timer" src={timerIcon} alt="timer" />
      <Time>{
        status === 'coming_soon' ? <><span>{startValue()} </span><span>{intl('ifo.untilStart')}</span></> :
          status === 'live' ? <><span>{endValue()} </span><span>{intl('ifo.end')}</span></> :
        ''}</Time>
    </AutoRow>
    {account && <Line />}
  </IfoCountDownTimeStyle>)
}

export default IfoCountDownTime

const IfoCountDownTimeStyle = styled.div`
/* padding: 0px 25px; */
margin-bottom: 24px;
.timer{
  margin-right: 10px;
}
`
const Line = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderColor};
`
const Time = styled.div`
margin-top: 24px;
margin-bottom: 24px;
`