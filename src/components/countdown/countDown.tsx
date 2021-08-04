import React, { memo } from 'react'
import styled, { css } from 'styled-components'
import { useLocation } from 'react-router-dom'
import { BrowserView, MobileOnlyView } from 'react-device-detect'
import { AutoRow, RowBetween } from 'components/Row'
import useTimeRefesh_ from 'hooks/timeRefesh'
import { NOT_ALL_MENU_LIST } from 'uikit/widgets/Menu/config'
import { useIsMobile } from 'uikit/theme/base'
import CountDownTimeBox from './timeBox'

const Countdown = memo(() => {
  const isMobile = useIsMobile()
  const location = useLocation()
  const time = useTimeRefesh_()
  const DHMS_COLOR = NOT_ALL_MENU_LIST.includes(location.pathname) ? 'white' : ''
  return (
    <CountdownWarpper>
      {time && (
        <>
          <CountDownTimeStyle>
            {time.state && (<>
              {!isMobile ? <>
                <CountDownTimeBox color={DHMS_COLOR} text={time.val.d} />
                <DHMS isMobile={isMobile} color={DHMS_COLOR}>days</DHMS>
                <CountDownTimeBox color={DHMS_COLOR} text={time.val.h} />
                <DHMS isMobile={isMobile} color={DHMS_COLOR}>hours</DHMS>
                <CountDownTimeBox color={DHMS_COLOR} text={time.val.m} />
                <DHMS isMobile={isMobile} color={DHMS_COLOR}>mins</DHMS>
                <CountDownTimeBox color={DHMS_COLOR} text={time.val.s} />
                <DHMS isMobile={isMobile} color={DHMS_COLOR}>left</DHMS>
              </>:<>
                <AutoRow justify="space-around">
                  <CountDownTimeBox color={DHMS_COLOR} text={time.val.d} />
                  <CountDownTimeBox color={DHMS_COLOR} text={time.val.h} />
                  <CountDownTimeBox color={DHMS_COLOR} text={time.val.m} />
                  <CountDownTimeBox color={DHMS_COLOR} text={time.val.s} />
                </AutoRow>
                <AutoRow justify="space-around">
                  <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>days</MOBILE_DHMS>
                  <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>hours</MOBILE_DHMS>
                  <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>mins</MOBILE_DHMS>
                  <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>left</MOBILE_DHMS>
                </AutoRow>
              </>}
            </>)}
          </CountDownTimeStyle>
          {/* <div>{time.state || <div> Action Pack PLM </div>}</div> */}
          {
              !time.state && (
              <>
                {!isMobile ? <>
                  <CountDownTimeBox color={DHMS_COLOR} text={0} />
                  <DHMS isMobile={isMobile} color={DHMS_COLOR}>days</DHMS>
                  <CountDownTimeBox color={DHMS_COLOR} text={0} />
                  <DHMS isMobile={isMobile} color={DHMS_COLOR}>hours</DHMS>
                  <CountDownTimeBox color={DHMS_COLOR} text={0} />
                  <DHMS isMobile={isMobile} color={DHMS_COLOR}>mins</DHMS>
                  <CountDownTimeBox color={DHMS_COLOR} text={0} />
                  <DHMS isMobile={isMobile} color={DHMS_COLOR}>left</DHMS>
                </> : <>
                  <AutoRow justify="space-around">
                    <CountDownTimeBox color={DHMS_COLOR} text={0} />
                    <CountDownTimeBox color={DHMS_COLOR} text={0} />
                    <CountDownTimeBox color={DHMS_COLOR} text={0} />
                    <CountDownTimeBox color={DHMS_COLOR} text={0} />
                  </AutoRow>
                  <AutoRow justify="space-around">
                    <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>days</MOBILE_DHMS>
                    <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>hours</MOBILE_DHMS>
                    <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>mins</MOBILE_DHMS>
                    <MOBILE_DHMS isMobile={isMobile} color={DHMS_COLOR}>left</MOBILE_DHMS>
                    </AutoRow>
                </>}
              </>
              )
            }
        </>
      )}
      {/* <Endtip>time until the end</Endtip> */}
    </CountdownWarpper>
  )
})
export default Countdown

const CountdownWarpper = styled.div``
const Endtip = styled.div`
  text-align: center;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.unimportant};
  font-size: 21px;
  font-weight: 500;
  line-height: 29px;
  opacity: 0.39;
`
const CountDownTimeStyle = styled.div``

const DHMS = styled.span<{ color?: string; isMobile?: boolean}>`
  display: inline-block;
  padding: 0px 20px;
  font-size: 21px;
  font-weight: 600;
  line-height: 29px;
  color: ${(props) => props.color || ''};
`

const MOBILE_DHMS = styled(DHMS) <{ color?: string; }>`
font-size: 14px;
font-weight: 500;
`