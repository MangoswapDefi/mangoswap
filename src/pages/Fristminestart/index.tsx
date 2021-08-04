import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { BrowserView, MobileOnlyView } from 'react-device-detect'
import styled from 'styled-components'
import { HEAD_MINE_END_TIME, PLATFORM_COIN } from 'utils/config'

import useHeadMinetotalSupply from 'pages/HeadMine/totalSupplyHook'
import { getFristOkbMineAddress, getFristOktMineAddress } from 'utils/addressHelpers'
/* import { formatNumber } from 'utils/formatBalance' */
import { RowBetween } from 'components/Row'
import TranslationsContext from 'hooks/TranslationsContext'
import { formatNumber } from 'utils/formatBalance'
import { AppState } from 'state'
import { KNS_ADDRESS } from 'config/constants/contracts'

import Countdown from 'components/countdown'
import okt_kns from 'assets/svg/okt_kns.svg'
import PoolCard from './components/PoolCard'
 
import logo_MangoSwap from './assets/logo_MangoSwap.png'

const StyledHome2 = styled.div<{ hintVisible?: boolean }>`
  padding-top: 58px;
  padding-bottom: 40px;
  width: 100vw;
  height: 100vh!important;
  overflow: auto;
  background-image: url('/images/start-bg.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    display: flex;
    justify-content: space-between;
    width: 1145px;
    min-width: 1145px;
    position: relative;

    img {
      width: 225px;
      height: 32px;
    }

    button.launch_app_button {
      width: 155px;
      height: 44px;
      border: none;
      background-color: #fff;
      font-size: 40px;
      cursor: pointer;
      box-sizing: border-box;
      background-image: linear-gradient(#2e2e2e, #2e2e2e), linear-gradient(to right, #5daffd, #ff3c88);
      font-weight: 300;
      color: #ffffff;
      padding: 2px;
      border-radius: 50px;
      background-clip: content-box, padding-box;
      transition: filter 0.5s ease;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
    }

    .hint {
      width: 248px;
      height: 65px;
      background: #171717;
      border-radius: 8px;
      position: absolute;
      top: 54px;
      right: -48px;
      padding: 11px 19px 10px 20px;
      /* font-size: 16px; */
      font-size: 14px;
      /* font-weight: 600; */
      font-weight: 400;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: #ffffff;
      line-height: 22px;
      text-align: center;
      display: none;
    }

    .launch_app_button:hover + .hint {
      display: block;
    }
  }

  span.title {
    font-size: 48px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 67px;
    margin-top: 73px;
  }

  span.description {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.39;
    line-height: 25px;
    margin-top: 25px;
    margin-bottom: 43px;
    white-space: nowrap;
  }

  .poolcards_list {
    width: 1145px;
    margin-top: 45px;
    display: flex;
    justify-content: space-evenly;
  }

  button.earn {
    margin-top: 40px;
    background: ${({ theme }) => theme.colors.linearGradientPrimary};
    border-style: none;
    width: 270px;
    height: 74px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 33px;
    border-radius: 7px;
    cursor: pointer;
    flex: none;
  }
`


function Fristminestart () {
  // const { translations } = useContext(TranslationsContext)

  function useTranslationsContext () {
    return useContext(TranslationsContext)
  }
  const { translations } = useTranslationsContext()
  const history = useHistory()

  // total OKB/OKT
  const OKBSupply = useHeadMinetotalSupply(getFristOkbMineAddress(), true)
  const OKTSupply = useHeadMinetotalSupply(getFristOktMineAddress(), false)

  // remaining Volume
  const fristMine = useSelector((state: AppState) => state.fristMine)
  const OKTGlobalKnsBalance: string | void = fristMine.knsBalance[KNS_ADDRESS().OKT] ?? '0'
  const OKBGlobalKnsBalance: string | void = fristMine.knsBalance[KNS_ADDRESS().OKB] ?? '0'
  const OKTRemain = `${formatNumber(parseFloat(OKTGlobalKnsBalance))} ${PLATFORM_COIN}`
  const OKBRemain = `${formatNumber(parseFloat(OKBGlobalKnsBalance))} ${PLATFORM_COIN}`

  /* console.log("formatNumber(OKBSupply): ", formatNumber(parseFloat(OKBSupply)))
  console.log("formatNumber(OKTSupply): ", formatNumber(parseFloat(OKTSupply))) */

  console.log('translations', translations)
  const toMine = () => {
    history.push('/kns')
  }
  const isLive = +new Date() < HEAD_MINE_END_TIME
  return (
    <>
      <BrowserView>
      <StyledHome2>
        <div className="header">
          <img className="logo" src={logo_MangoSwap} alt="" />
          <button className="launch_app_button" type="button">
            Launch APP
          </button>
          <div className="hint">Launch APP after the Head Mine is finished</div>
        </div>

        <span className="title">Be the Chef with MangoSwap</span>
        <span className="description">
          Swap,earn stack yields,borrow,leveraga all on one decentralized,community drivn pleatform.Welcome home to
          MangoSwap.
        </span>

          {isLive ? <Countdown /> : <div style={{ filter: 'grayscale(100%)', userSelect: 'none'}}>
            <Countdown />
          </div>}

        <div className="poolcards_list">
          <PoolCard
            isLive={isLive}
            poolIcon={okt_kns}
            data={{
              type: 'OKT',
              total: OKTSupply,
              remain: OKTRemain
              /* participants: '0', */
            }}
          />
          <PoolCard
            isLive={isLive}
            poolIcon={okt_kns}
            data={{
              type: 'OKB',
              total: OKBSupply,
              remain: OKBRemain
              /* participants: '0', */
            }}
          />
        </div>

        <div style={{ height: '40px', flex: 'none' }} />
        <button onClick={toMine} className="earn" type="button">
          Earn MGS
        </button>
      </StyledHome2>
      </BrowserView>
      <MobileOnlyView>
        <MobileStyle>
          <RowBetween>
            <img className="logo" src={logo_MangoSwap} alt="" />
            <MobileLanchAppButton>
              <button className="launch_app_button" type="button">
                Launch APP
              </button>
              <div className="hint">Launch APP after the Head Mine is finished</div>
            </MobileLanchAppButton>
          </RowBetween>
          <span className="title">Be the Chef with MangoSwap</span>
          <span className="description">
            Swap,earn stack yields,borrow,leveraga all on one decentralized,community drivn pleatform.Welcome home to
            MangoSwap.
          </span>
          <div style={{width: '100%'}}>
            <Countdown />

          </div>
          <button onClick={toMine} className="earn" type="button">
            Earn MGS
        </button>
        </MobileStyle>
      </MobileOnlyView>
    </>
  )
}

export default Fristminestart

const MobileStyle = styled.div`
  padding: 10px;
  width: 100vw;
  height: 100vh!important;
  overflow: auto;
  background-image: url('/images/firt-mine-start-mobile-bg.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo{
    width: 150px;
  }
.title{
  font-size: 18px;
  color: white;
  text-align: center;
  margin-top: 50px;
}
.description{
  margin-top: 10px;
  margin-bottom: 25px;
  color: rgba(102, 102, 102, 1);
  font-size: 10px;
  line-height: 14px;
  text-align: center;
}
button.earn {
    margin-top: 40px;
    background: ${({ theme }) => theme.colors.linearGradientPrimary};
    border-style: none;
    width: 140px;
    height: 40px;
    font-size: 18px;
    color: #ffffff;
    line-height: 40px;
    border-radius: 7px;
    cursor: pointer;
    flex: none;
    outline: none;
  }
`
const MobileLanchAppButton = styled.div`
position: relative;
button{
      width: 84px;
      height: 29px;
      border: none;
      background-color: #fff;
      cursor: pointer;
      box-sizing: border-box;
      background-image: linear-gradient(#2e2e2e, #2e2e2e), linear-gradient(to right, #5daffd, #ff3c88);
      font-weight: 300;
      color: #ffffff;
      padding: 2px;
      border-radius: 14px;
      background-clip: content-box, padding-box;
      transition: filter 0.5s ease;
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
}
.hint{
  position: absolute;
  display: none;
}
`