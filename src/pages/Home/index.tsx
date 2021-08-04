import React from 'react'
import styled from 'styled-components'
import ThemeProvider from 'components/Info/Theme'
import useIntl from 'hooks/useIntl'
import { Search } from 'components/Info/Search'
import { PageContainerStyle } from 'components/styles'
import { PoolPage } from 'pages/Pools'
import Statistics from './Statistics'
import Pools from './Pools'
import HomeBanner from './components/HomeBanner'
// import { DEVICESM } from '../../uikit/theme/base'



const HomePage = () => {
  const intl = useIntl()
  return (
    <ThemeProvider>
      <PoolPage>
        <PageContainerStyle>
          <HomeBanner title='MangoSwap' describe={intl('home.topText') } />
          <Statistics />
          <Search />
          <Pools />
        </PageContainerStyle>
      </PoolPage>
      
    </ThemeProvider>
  )
}
export default HomePage

// http://13.229.91.62:8000/subgraphs/name/davekaj/uniswap/graphql
