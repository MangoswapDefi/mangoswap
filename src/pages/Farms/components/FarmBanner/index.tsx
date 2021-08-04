import React from 'react'
import styled from 'styled-components'
import { PoolsBannerBox } from 'pages/Pools/components/PoolsBanner'
import { useIsMobile } from 'uikit/theme/base'

const FarmBannerBox = styled.div`
  display: flex;
  max-width: 1200px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 30px 54px;
  margin: 0 auto;
  position: relative;

  h3 {
    margin-top: 100px;
    font-size: 46px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.title};
  }
  p {
    font-size: 14px;
    margin-top: 30px;
  }

  &::after {
    content: '';
    position: absolute;
    background-color: #C4C4C4;
    width: calc(100% - 97px);
    height: 0.25px;
    left: 48px;
    bottom: 0px;
    -webkit-transform: scaleY(0.25);
    transform: scaleY(0.25);
  }
`
interface FarmBannerProps {
  title: string
  describe: string
}

const FarmBanner: React.FC<FarmBannerProps> = ({ title, describe }) => {
  const isMobile = useIsMobile()
  const bannerStyle: any = isMobile ? {
    background: "url('/images/farms/farmBannerMobile.svg') no-repeat", 
    backgroundSize: '60%',
    backgroundPosition: 'right',
    padding: '24px'
  } : 
    {
      background: "url('/images/farms/farmBanner.svg') no-repeat", 
      backgroundPosition: 'right'
    }
  

  return (
    <PoolsBannerBox style={bannerStyle}>
      <div>
        <h3>{title}</h3>
        <p style={{width: isMobile ? '160px' : '240px'}}>{describe}</p>
      </div>
    </PoolsBannerBox>
  )
}

export default FarmBanner
