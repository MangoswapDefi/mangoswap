import React from 'react'
import styled from 'styled-components'
import BannerPng from './banner.png'
import LogoPng from './logo.png'

const HomeBannerBox = styled.div`
  display: flex;
  max-width: 1200px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 33px 48px;
  margin: 0 auto;
  position: relative;
  // border-bottom: 0.254545px solid #C4C4C4 !important;

  p {
    font-size: 14px;
    line-height: 17px;
    margin-top: 15px;
    width: 240px;
    position: relative;
    z-index: 1;
  }
  .banner-logo{
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    background-color: #c4c4c4;
    width: calc(100% - 97px);
    height: 0.25px;
    left: 48px;
    bottom: 0px;
    -webkit-transform: scaleY(0.25);
    transform: scaleY(0.25);
    z-index: 1;
  }
  .bg{
    position: absolute;
    top: -5px;
    left: 40px;
    filter: blur(4px);
    zoom: 0.8;
    ${({ theme }) => theme.mediaQueries.sm} {
      position: relative;
      top: 0px;
      left: 0px;
      filter: none;
    }
  }
`
interface PoolsBannerProps {
  title: string
  describe: string
}

const HomeBanner: React.FC<PoolsBannerProps> = ({ title, describe }) => {
  return (
    <HomeBannerBox>
      <div>
        <img className="banner-logo" src={LogoPng} alt="" style={{marginTop: '60px'}} />
        <p>{describe}</p>
      </div>
      <img className="bg" src={BannerPng} alt="" />
    </HomeBannerBox>
  )
}

export default HomeBanner
