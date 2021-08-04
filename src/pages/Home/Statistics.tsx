import { getTotalLiquidUSDSANDPairData } from 'contexts/GlobalData'
import useIntl from 'hooks/useIntl'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { formattedNum } from 'utils'
import { HOMEPADDING } from './constant'

const StyleStatistics = styled.div`
padding: ${HOMEPADDING};
margin-top: 20px;
h3{
  font-size:16px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 20px;
}
`
const StyleList = styled.div`
display: flex;
padding-bottom: 15px;
.row{
  width: 50%;
  /* height: 115px; */
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-right: 12px;
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 115px;
  }
  &:last-child{
    margin-right: 0px;
  }
  svg{
    position: absolute;
    top: 12px;
    right: 15px;
  }
  .title{
    margin-top: 25px;
    margin-left: 15px;
    color: rgba(130, 130, 130, 1);
    font-size: 12px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 14px;
    }
  }
  .price{
    margin-left: 15px;
    margin-top: 15px;
    font-size: 14px;
    padding-bottom: 20px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-bottom: 0px;
      margin-top: 35px;
      font-size: 16px;
    }
  }
}
`

interface dataRow {
  v1: string;
  v2: string;
}
const Statistics = () => {
  const [list, setList] = useState<Array<dataRow>>([])
  const intl = useIntl()
  useEffect(() => {
    const init = async () => {
      const data = await getTotalLiquidUSDSANDPairData()
      setList([
        { v1: 'home.totalLiquidity', v2: `$${formattedNum(data.totalLiquidityUSD)}` },
        { v1: 'home.Volume24', v2: `$${formattedNum(data.pairDayData)}` },
        { v1: 'home.priceMGS', v2: `$${formattedNum(data.KNSPrice)}` },
      ])
    }
    init()
  // eslint-disable-next-line
  }, [])
  return <StyleStatistics>
    <h3>{intl('home.statistics', 'Statistics')}</h3>
    <StyleList>{list.map((item, key) => (<div key={item.v1[0]} className="row">
      <RightSvg />
      <p className="title">{ intl(item.v1) }</p>
      <p className="price">{ item.v2 }</p>
    </div>))}</StyleList>
  </StyleStatistics>
 }

export default Statistics

const RightSvg = () => (<svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.2" d="M17.3631 20.3946C19.0444 22.3657 22.0816 22.3912 23.7957 20.4485L35.5957 7.07516C38.0217 4.32574 36.0695 -0.000125885 32.4029 -0.000125885H9.19616C5.56313 -0.000125885 3.59883 4.25705 5.95646 7.02119L17.3631 20.3946Z" fill="#FF3C88" />
  <g opacity="0.2">
    <path d="M13.8535 13.3866C15.5423 11.5343 18.4577 11.5343 20.1465 13.3866L32.5019 26.9376C34.9945 29.6714 33.0549 34.0646 29.3554 34.0646H4.64462C0.945061 34.0646 -0.99449 29.6714 1.4981 26.9376L13.8535 13.3866Z" fill="#5DAFFD" style={{mixBlendMode:'multiply'}} />
  </g>
</svg>)