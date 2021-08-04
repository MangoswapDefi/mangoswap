import React from 'react'
import styled from 'styled-components'
import { HEAD_MINE_OKT_TOTAL } from 'utils/config'
import { formatNumber } from 'utils/formatBalance'

import img_Finished from './assets/Finished.png'
import img_Live from './assets/Live.png'

const CardWrapper = styled.div`
  width: 322px;
  height: 306px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 18px 0px rgba(255, 255, 255, 0.18);
  border-radius: 22px;
  border: 1px solid #b3b3b3;
  position: relative;

  img.img_liveOrFinish {
    width: 75px;
    height: 71px;
    z-index: 5;
    position: absolute;
    left: -1px;
  }

  .card_content {
    display: flex;
    flex-direction: column;
    align-items: center;

    span.pool_name {
      font-size: 21px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 29px;
      margin-top: 24px;
    }

    span.pool_description {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      opacity: 0.76px;
      line-height: 20px;
      margin-top: 5px;
    }

    img.pool_icon {
      width: 70px;
      height: 70px;
      margin-top: 20px;
      margin-bottom: 27px;
    }

    .table {
      width: 292px;
      display: grid;
      row-gap: 14px;
      grid-template-rows: repeat(2, 22px);
      grid-template-columns: auto max-content;
      justify-content: space-between;
      margin-left: 14px;
      margin-right: 14px;

      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 22px;

      span.number {
        text-align: right;
      }
    }
  }
`

function index({ isLive, poolIcon, data }) {
  return (
    <>
      <CardWrapper>
        <img className="img_liveOrFinish" src={isLive ? img_Live : img_Finished} alt="" />
        <div className="card_content">
          <span className="pool_name">{data.type} POOL</span>
          <span className="pool_description">Deposit {data.type} and Earn KNS</span>
          <img className="pool_icon" src={poolIcon} alt="" />
          <div className="table">
            <span>Total Volume</span>
            <span className="number">{ formatNumber(parseInt(HEAD_MINE_OKT_TOTAL), 0, 0) } KNS</span>
            <span>Total {data.type} </span>
            <span className="number">{ data.total } {data.type}</span>
            <span>Remaining</span>
            <span className="number">{data.remain}</span>
            {/* <span>Participants</span>
            <span className="number">{ data.participants }</span> */}
          </div>
        </div>
      </CardWrapper>
    </>
  )
}

export default index
