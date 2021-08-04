import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'
import Container from 'components/layout/Container'
import { Image, Button, Cell, Divider, Stepper, Step, Card, Flex, ButtonMenu, ButtonMenuItem } from 'uikit'
import { Link, useRouteMatch } from 'react-router-dom'
import { baseColors } from 'uikit/theme/colors'
import { fetchIfosUserDataAsync } from 'state/ifos'
import { AppState, useAppDispatch } from 'state'
import { useActiveWeb3React } from 'hooks'
import { Ifo, IfoStatus } from 'config/constants/types'
import ifos, { ifoProjectKey } from 'config/constants/ifo'
import { useTimer } from 'hooks/useTimer'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useIntl from 'hooks/useIntl'
import { AutoRow } from 'components/Row'
import { IconNullData } from 'assets/svg/nullData'
import Hero from './components/Hero'
import emptyIcon from '../../assets/svg/empty_icon.svg'
import emptyBg from '../../assets/svg/empty_bg.svg'
import StepSvg from './components/step.svg'
import IfoQuestions from './components/IfoQuestions'
import IfoItem from './IfoItem'


const FarmsNullRander = () => {
  const { isExact } = useRouteMatch()
  // eslint-disable-next-line
  const { statusList } = useSelector(({ ifos }: AppState): AppState['ifos'] => ifos)
  const View = () => <FarmsNullStyle>
    <AutoRow justify="center">
      <IconNullData width={150} height={150} />
    </AutoRow>
  </FarmsNullStyle>
  return (isExact && !Object.keys(statusList).find(((e: IfoStatus) => statusList[e] === 'live'))) ? <View /> :
    (!isExact && !Object.keys(statusList).find(((e: IfoStatus) => statusList[e] === 'finished'))) ? <View /> :
    <></>
}

const IfoEmpty: React.FC = () => {
  const intl = useIntl()
  const { isExact } = useRouteMatch()
  const dispatch = useAppDispatch()
  const { account } = useActiveWeb3React()
  const notProject = ifos.length <= 0
  const reload = useTimer()
  useEffect(() => {
    fetchIfosUserDataAsync(account)(dispatch)
  }, [dispatch, account, reload])
  const ifosMap = new Map<string, Ifo[]>()
  ifos.forEach((item) => {
    ifosMap.set(item[ifoProjectKey], [...(ifosMap.get(item[ifoProjectKey]) ?? []), item])
  })
  
  return notProject ? (
    <>
      <Hero />
      <Container>
        <IfoLayout>
          <div className="card">
            <div className="card-header">
              <div className="card-header_desc">{intl('ifo.applyFor')}</div>
              <div className="card-header_content">
                <Image src={emptyIcon} width={46} height={46} />
                <span className="title">{intl('ifo.yourProject')}</span>
              </div>
            </div>
            <div className="card-content">
              <p>{intl('ifo.createIFO')}</p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '30px auto',
                }}
              >
                <Image src={emptyBg} width={155} height={102} />
              </div>
              <Button width="100%" variant="gradual">
                {intl('ifo.applyNow')}
              </Button>
              <div className="card-descript">
                <Cell title={intl('ifo.launchTime')} value="---" />
                <Cell title={intl('ifo.forSale')} value="---" />
                <Cell title={intl('ifo.raiseUSD')} value="---" />
                <Cell title={intl('ifo.totalRaised')} value="---" />
              </div>
            </div>
          </div>
          <Divider variant="gradual" />
          <div className="own-ifo">
            <BlockTitle className="title">{intl('ifo.launchIFOHint')}</BlockTitle>
            <p>
              {intl('ifo.launchProject')}
            </p>
            <div className="step-img">
              <Image src={StepSvg} width={610} height={125} />
            </div>
            <div className="step-btn">
              <Button>{intl('ifo.applyNow')}</Button>
            </div>
            <Stepper title={<BlockTitle>{intl('ifo.takePartHint')}</BlockTitle>}>
              <Step dot={<span style={{ color: baseColors.primary }}>A</span>} status="past">
                <PartCard ribbon={<PartTitleText color={baseColors.primary}>{intl('ifo.activateProfile')}</PartTitleText>}>
                  <PartContentText>{intl('ifo.activatePartIFo')}</PartContentText>
                  <br />
                  <Button width={200}>{intl('ifo.activateProfile')}</Button>
                </PartCard>
              </Step> 
              <Step dot={<span style={{ color: '#7B65FF' }}>B</span>} status="past">
                <PartCard ribbon={<PartTitleText color="#7B65FF">{intl('ifo.activateProfile')}e</PartTitleText>}>
                  <PartContentText>{intl('ifo.stakeLiquidity')}</PartContentText>
                  <PartContentText>{intl('ifo.buySaleTokens')}</PartContentText>
                  <Button width={200}>{intl('ifo.getLPTokens')}</Button>
                </PartCard>
              </Step>
              <Step dot={<span style={{ color: '#FF67F9' }}>C</span>} status="past">
                <PartCard ribbon={<PartTitleText color="#FF67F9">{intl('ifo.commitLPTokens')}</PartTitleText>}>
                  <PartContentText>
                    {intl('ifo.salesLive')}
                  </PartContentText>
                  <PartContentText>
                    {intl('ifo.recommendCommit')}
                  </PartContentText>
                </PartCard>
              </Step>
              <Step dot={<span style={{ color: '#FF3C88' }}>D</span>} status="past">
                <PartCard ribbon={<PartTitleText color="#FF3C88">{intl('ifo.claimTokens')}</PartTitleText>}>
                  <PartContentText>
                    {intl('ifo.afterSalesFinish')}
                  </PartContentText>
                </PartCard>
              </Step>
            </Stepper>
          </div>
          <IfoQuestions />
        </IfoLayout>
      </Container>
    </>
  ) : (<>
      <Hero />
      {false ? <AutoRow justify="center">
        <ConnectWalletButton width="500px" />
      </AutoRow>  : <>
        <Flex justifyContent="center" alignItems="center" mb="32px">
          <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="subtle">
            <ButtonMenuItem as={Link} to="/ifo">
                {intl('ifo.nextIfo')}
            </ButtonMenuItem>
            <ButtonMenuItem as={Link} to="/ifo/history">
                {intl('ifo.pastIfos')}
              </ButtonMenuItem>
          </ButtonMenu>
        </Flex>
        {Array.from(ifosMap).map((map) => <IfoItem key={map[0]} ifos={map[1]} />)}
        <FarmsNullRander />
      </>}
  </>)
}

export default IfoEmpty


const BlockTitle = styled.h3`
  font-size: 22px;
  padding: 25px 0;
`
const PartContentText = styled.p`
  font-size: 14px;
  color: #4f4f4f;
  line-height: 30px;
`
const PartTitleText = styled.h4`
  font-size: 16px;
  color: ${({ color }) => {
    return color
  }};
  padding-bottom: 10px;
  font-weight: bold;
`
const PartCard = styled(Card)`
  padding: 20px;
  width: 600px;
`

const IfoLayout = styled.div`
  button{
    font-size: 14px;
  }
  .card {
    max-width: 460px;
    width: 100%;
    margin: 20px auto 80px;
    background-color: #fff;
    border-radius: 38px;
    overflow: hidden;
    box-shadow:1px 1px 5px 0px #f1f1f1;
    .card-header{
      position: relative;
      height: 81px;
      width: 100%;
      background: rgba(93, 175, 253, .5);
      .card-header_desc{
            position: absolute;
            top: 0;
            right: 40px;
            padding: 8px 15px;
            color: #fff;
            font-size: 14px;
            border-radius: 0 0 10px 10px;
            background-color:${({ theme }) => theme.colors.failure};
      }
      .card-header_content{
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 30px;
        .title{
          padding-left: 20px;
          color: #333;
          font-size: 26px;
          font-weight: bold;
        }
      }
    }
  }
    .card-content {
      padding:  30px;
      p{
        font-size: 14px;
        color: #4f4f4f;
      }
    }
    .card-descript{
      padding: 30px 0;
    }
  }

  .own-ifo{
    width: 680px;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.title}
    p{
      font-size: 15px;
      color: #4f4f4f;
    }
    .step-img{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
    }
    .step-btn{
      text-align: right;
    }
  }
`

const FarmsNullStyle = styled.div`

`