import { Tabs } from 'antd'
import getTokensOnswap, { getPairsOnswap, GraphPairsParams, GraphTokenParams } from 'contexts/GlobalData'
import { Link } from 'react-router-dom'
import useIntl from 'hooks/useIntl'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAllPairData } from 'components/Info/contexts/PairData'
import { useAllTokenData } from 'components/Info/contexts/TokenData'
import _TopTokenList from 'components/Info/TokenList/index'
import _TopPairList from 'components/Info/PairList'
import { formattedNum } from 'utils'
import { HOMEPADDING, HOMEPOOLSPADDING } from './constant'

const MAINCOLOR = '#FF3C88'

const TopTokenList: any = _TopTokenList
const PairList: any = _TopPairList
type select = 'Pools' | 'Tokens'
export default () => {
  const POOLS = 'Pools'
  const TOKENS = 'Tokens'
  const [select, setSelect] = useState<select>(POOLS)
  const intl = useIntl()

  const [tokens, setToken] = useState([])
  // TODO type
  const [pools, setpools] = useState([])

  const allPairs = useAllPairData()
  const allTokens = useAllTokenData()

  // console.log('---allPairs--', allPairs)
  // console.log('---allTokens--', allTokens)


  const getToken = async (params: GraphTokenParams) => {
    let list = await getTokensOnswap(params)
    // console.log('getToken->>>', list)
    list = list.map(e => {
      return {
        ...e,
        totalLiquidity: formattedNum(e.totalLiquidity, true),
        volume24h: '$0',
        Price: '$0',
        PriceChange24h: '$0',
      }
    })
    setToken(list)
  }
  const getPools = async (params: GraphPairsParams) => {
    let list = await getPairsOnswap(params)
    // console.log('getPools->>>', list)
    list = list.map(e => {
      return {
        ...e,
        name: [e.token0.name, e.token1.name].join('-'),
        liquidity: formattedNum(e.reserveUSD, true),
        volume: formattedNum(parseFloat(e.volumeUSD), true),
        volume7d: formattedNum(parseFloat(e.volumeUSD) * 6.7, true),
        fees24h: '$0',
        fees1y: '$0',
        // oneWeekVolumeUSD: formattedNum(parseFloat(e.oneWeekVolumeUSD), true),
      }
    })
    setpools(list)
  }
  useEffect(() => {
    getToken({ skip: 0 })
    getPools({ skip: 0 })
  }, [])
  // console.log('---allTokens----', tokens)
  // console.log('---pools----', pools)
  return <StylePools>
    <div>
      <Tabs defaultActiveKey={select} onChange={(key: select) => { setSelect(key) }}>
        <Tabs.TabPane tab={intl('home.pools', 'Pools')} key={POOLS}>
          <PairList pairs={allPairs} disbaleLinks maxItems={50} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={intl('home.tokens', 'tokens')} key={TOKENS}>
          <TopTokenList tokens={allTokens} itemMax={50} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  </StylePools>
}


const StylePools = styled.div`
margin: ${HOMEPADDING};
margin-top: 10px;
margin-bottom: 20px;
background-color: #fff;
padding: ${HOMEPOOLSPADDING};
border-radius: 12px;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
.ant-tabs-nav-list{
  background-color: #fff;
  padding: 5px;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.04);
}
.ant-tabs-ink-bar-animated{
  display: none;
}
.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap, .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap{
  height: 44px;
}
.ant-tabs-top > .ant-tabs-nav::before, .ant-tabs-bottom > .ant-tabs-nav::before, .ant-tabs-top > div > .ant-tabs-nav::before, .ant-tabs-bottom > div > .ant-tabs-nav::before{
  border-bottom-width: 0px;
}
.ant-tabs-tab{
  border-radius: 37.5px;
  width: 80px!important;
  font-size: 14px;
  height: 32px!important;
  line-height: 332px!important;
  text-align: center!important;
  >div{
    width: 100%;
  }
}
.ant-table-thead > tr > th {
    border-bottom-width: 0px;
    color: rgba(93, 175, 253, 1);
}
.ant-table-tbody > tr > td{
  border-bottom: 0px solid #f0f0f0;
}
.ant-tabs-tab-active{
  background: ${MAINCOLOR};
  color: white;
  >div{
    color: white!important;
  }
}
.ant-tabs-tab + .ant-tabs-tab{
    margin: 0 0 0 0px!important;
}
.ant-tabs-tab{
  &:hover{
    color: ${MAINCOLOR}!important;
  }
  &:active{
    color: ${MAINCOLOR}!important;
  }
}
.ant-tabs-tab-btn:focus, .ant-tabs-tab-remove:focus, .ant-tabs-tab-btn:active, .ant-tabs-tab-remove:active{
    color: ${MAINCOLOR};
}
.ant-table-thead > tr > th{
    background: #fff!important;
}

.ant-table-pagination-right{
    justify-content: center;
}
`
const StyleSwitch = styled.div`
`

const ActionIconLink = styled(Link)`
display: inline-block;
width: 23px;
height: 23px;
border-radius: 50%;
background: #F2F2F2;
text-align: center;
line-height: 25px;
cursor: pointer;
`