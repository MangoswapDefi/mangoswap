import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { ConnectToChain } from 'connectors'
import { useActiveWeb3React2 } from 'hooks'
import { useFetchPriceList, usePoolFetchPublicData } from 'state/hooks'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import Pools from './Pools'
import Ifos from './Ifos'
import FarmsPage from './Farms'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import Menu from '../components/Menu'
import useGetDocumentTitlePrice from '../hooks/useGetDocumentTitlePrice'
// import NotPage from './404'
import HomePage from './Home'
import HeadMine from './HeadMine'
// import 'antd/dist/antd.css'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 0;
  }
`

export default function App() {
  const { chainId, active } = useActiveWeb3React2()
  // 初始化获取价格
  useFetchPriceList()
  usePoolFetchPublicData()

  useEffect(() => {
    // const storedLangCode = localStorage.getItem(CACHE_KEY)
    // if (storedLangCode) {
    //   setLocale(storedLangCode)
    // }
  }, [])

  useEffect(() => {
    if (chainId) {
      ConnectToChain(chainId)
    }
  }, [chainId, active])

  useGetDocumentTitlePrice()
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <Menu>
            <BodyWrapper>
              <Popups />
              <Web3ReactManager>
                <Switch>
                  <Route exact path="/kns" component={HeadMine} />
                  <Route exact strict path="/swap" component={Swap} />
                  <Route exact strict path="/find" component={PoolFinder} />
                  <Route exact strict path="/pool" component={Pool} />
                  <Route path="/pools" component={Pools} />
                  <Route path="/pools/history" component={Pools} />
                  <Route exact path="/add" component={AddLiquidity} />
                  <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                  <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                  <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                  <Route exact strict path="/home" component={HomePage} />
                  <Route exact strict path="/farms" component={FarmsPage} />
                  <Route exact strict path="/farms/history" component={FarmsPage} />
                  <Route path="/ifo" component={Ifos} />
                  <Route path="/ifo/history" component={Ifos} />
                  {/* <Route exact path="/ifo" component={Ifos2} /> */}
                  <Route
                    exact
                    strict
                    path="/"
                    // component={(location) => <Redirect to={{ ...location, pathname: '/fristminestart' }}
                    component={Swap}
                  />

                  <Route component={RedirectPathToSwapOnly} />
                  {/* <Route exact strict path="/404" component={NotPage} /> */}
                </Switch>
              </Web3ReactManager>
            </BodyWrapper>
          </Menu>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
