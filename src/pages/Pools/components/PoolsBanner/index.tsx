import React from 'react'
import styled from 'styled-components'
import { useIsMobile } from 'uikit/theme/base'
import BannerPng from './banner.png'


export const PoolsBannerBox = styled.div`
  display: flex;
  max-width: 1200px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 48px 40px;
  margin: 0 auto;
  position: relative;
  // border-bottom: 0.254545px solid #C4C4C4 !important;

  h3 {
    margin-top: 36px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.title};
    position: relative;
    z-index: 1;
    font-size: 32px;
    position: relative;
    z-index: 1;
    top: 13px;
    ${({ theme }) => theme.mediaQueries.sm} {
        top: 0px;
        font-size: 38px;
        font-size: 46px;
      }
    }
  p {
    font-size: 14px;
    line-height: 17px;
    margin-top: 30px;
    width: 240px;
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    background-color: #c4c4c4;
    width: 100%;
    height: 0.25px;
    bottom: 0px;
    -webkit-transform: scaleY(0.25);
    transform: scaleY(0.25);
  }
  img{
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

const PoolsBanner: React.FC<PoolsBannerProps> = ({ title, describe }) => {
  const isMobile = useIsMobile();
  const bannerStyle = isMobile ? 
    {background: "url('/images/pools/poolBannerMobile.svg') no-repeat", backgroundSize: '50%',  backgroundPosition: 'right', padding: '0 24px 24px'}
   : {background: "url('/images/pools/poolBanner.svg') no-repeat", backgroundPosition: 'right', padding: '40px 24px'}
  return (
    <PoolsBannerBox style={bannerStyle}>
      <div>
        <h3 style={{width: isMobile ? '80px' : 'auto'}}>{title}</h3>
        <p style={{width: isMobile ? '220px' : '365px'}}>{describe}</p>
      </div>
    </PoolsBannerBox>
  )
}

export default PoolsBanner
