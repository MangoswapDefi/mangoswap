import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useLocation } from 'react-router-dom'
import store, { useAppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { RowType, Toggle, Text } from 'uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceCakeBusd, useGetApiPrices, useKnsPriceUsdt } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { useTimer } from 'hooks/useTimer'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { fetchFarmsPublicDataAsync, setLoadArchivedFarmsData } from 'state/farms'
import { PageContainerStyle } from 'components/styles'
import useIntl from 'hooks/useIntl'
import { PoolPage } from 'pages/Pools'
import { useIsMobile } from 'uikit/theme/base'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import FarmBanner from './components/FarmBanner'
import { fetchFarmUserDataAsync } from '../../state/actions'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 0;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 18px;
  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`
const NUMBER_OF_FARMS_VISIBLE = 12

const Farms: React.FC = () => {
  const { pathname } = useLocation()
  const { data: farmsLP, userDataLoaded } = useFarms()

  // console.log('---farmsLP----', farmsLP)
  const cakePrice = usePriceCakeBusd() // cakePrice 即 cake对Busd 的price
  const knsPrice = useKnsPriceUsdt()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, 'pancake_farm_view')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const prices = useGetApiPrices()
  const intl = useIntl()

  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const refresh = useTimer()
  useEffect(() => {
    if (account) {
      fetchFarmUserDataAsync(account)(dispatch, store.getState)
    }
  }, [account, dispatch, fastRefresh, refresh])

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  useEffect(() => {
    // Makes the main scheduled fetching to request archived farms data
    dispatch(setLoadArchivedFarmsData(isArchived))

    // Immediately request data for archived farms so users don't have to wait
    // 60 seconds for public data and 10 seconds for user data
    if (isArchived) {
      fetchFarmsPublicDataAsync()(dispatch, store.getState)
      if (account) {
        fetchFarmUserDataAsync(account)(dispatch, store.getState)
      }
    }
  }, [isArchived, dispatch, account])

  /** Farms Data */
  const activeFarms = farmsLP.filter((farm) => farm.pid !== -1 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== -1 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  // console.log('---activeFarms----', farmsLP, activeFarms, inactiveFarms, archivedFarms)

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0)
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }
        const priceSymbol = farm.quoteToken.symbol === 'OKB' ? 'OKT' : farm.quoteToken.symbol // OKB >> OKT

        const quoteTokenPriceUsd = (prices[priceSymbol] as any)?.price || 0
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        // TODO cakePrice => KNSPrice
        // console.log('----farm.lpTotalInQuoteToken', farm.lpTotalInQuoteToken, quoteTokenPriceUsd)
        // console.log('----farm.poolWeight, knsPrice, totalLiquidity', farm.poolWeight, knsPrice.toNumber(), totalLiquidity.toNumber())
        const apr = isActive ? getFarmApr(farm.poolWeight, knsPrice, totalLiquidity) : 0
        // const apr = isActive ? 55 : 0

        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return farm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [prices, query, isActive, knsPrice]
  )

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc'
          )
        case 'earned':
          return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet])

  const rowData = farmsStakedMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    // console.log('--apr--', farm.apr)
    const row: RowProps = {
      apr: {
        value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id as string,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <div>
        <FlexLayout justify={isMobile ? 'center' : "flex-start"}>
          <Route exact path="/farms">
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path="/farms/history">
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }
  const isMobile = useIsMobile();

  return (
    <PoolPage>
      <PageContainerStyle>
        <FarmBanner title={intl('farms.farms')} describe={intl('farms.stakeLiquidityPool')} />
        <Page>
          <ControlContainer>
            <ViewControls>
              <ToggleView viewMode={viewMode} onToggle={(mode: string) => setViewMode(mode)} />
              <ToggleWrapper style={{marginLeft: isMobile ? '-14px' : '10px'}}>
                <Text mr={isMobile ? '0' : '12px'} fontSize={isMobile ? '14px' : '16px'} > {intl('farms.stakedOnly')}</Text>
                <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              </ToggleWrapper>
              <FarmTabButtons
                hasStakeInFinishedFarms={stakedInactiveFarms.length > 0}
                hasStakeInArchivedFarms={stakedArchivedFarms.length > 0}
              />
            </ViewControls>
            {/* <FilterContainer>
            <LabelWrapper>
              <Text color="textSubtle">{intl('farms.sortBy')}</Text>
              <Select
                options={[
                  {
                    label: intl('farms.hot'),
                    value: 'hot',
                  },
                  {
                    label: intl('farms.apr'),
                    value: 'apr',
                  },
                  {
                    label: intl('farms.multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: intl('farms.earned'),
                    value: 'earned',
                  },
                  {
                    label: intl('farms.liquidity'),
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text color="textSubtle">{intl('farms.search')}</Text>
              <SearchInput onChange={handleChangeQuery} />
            </LabelWrapper>
          </FilterContainer> */}
          </ControlContainer>
          {renderContent()}
          <div ref={loadMoreRef} />
        </Page>
      </PageContainerStyle>
    </PoolPage>
  )
}

export default Farms
