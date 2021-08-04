import React from 'react'
import styled from 'styled-components'
import BG from './bg'

const PoolsBannerBox = styled.div`
  display: flex;
  max-width: 1200px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 33px 48px;
  margin: 0 auto;
  position: relative;
  // border-bottom: 0.254545px solid #C4C4C4 !important;

  h3 {
    margin-top: 36px;
    font-size: 22px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.title};
  }
  p {
    font-size: 14px;
    line-height: 17px;
    margin-top: 30px;
    width: 240px;
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
  }
`
interface PoolsBannerProps {
  title: string
  describe: string
}

const PoolsBanner: React.FC<PoolsBannerProps> = ({ title, describe }) => {
  return (
    <PoolsBannerBox>
      <div>
        <h3>{title}</h3>
        <p>{describe}</p>
      </div>
      <BG width={435} height={170} />
    </PoolsBannerBox>
  )
}

export default PoolsBanner
