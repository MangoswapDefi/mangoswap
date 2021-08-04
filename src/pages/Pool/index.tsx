import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from '@mangoswap-libs/sdk'
import { Button, CardBody, Text } from 'uikit'
import { Link } from 'react-router-dom'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import Container from 'components/Container'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import Zoom from 'uikit/components/zoom/style'
import { Dots } from 'components/swap/styleds'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'
import PageHeader from 'components/PageHeader'
import AppBody from '../AppBody'

export default function PoolFinderPool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const TranslateString = useI18n()
  const intl = useIntl()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // console.log('---allV2PairsWithLiquidity', allV2PairsWithLiquidity)
  return (
    <Container>
      <CardNav activeIndex={1} />
      <AppBody>
        <PageHeader
          title={intl('pool.liquidity')}
          description={intl('pool.addLiquidityHint')}
        >
          <Button style={{ backgroundColor: '#FD9F09', boxShadow: 'none'}} id="join-pool-button" mb="16px"  as={Link} to="/add">
            {intl('pool.addLiquidity')}
          </Button>
        </PageHeader>
        <AutoColumn gap="lg" justify="center">

          <Zoom zoom={0.9}>
          <CardBody>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 11px 0 0">
                <Text color={theme.colors.text}>{intl('pool.yourLiquidity')}</Text>
                <Question 
                  text={intl('pool.yourLiquidityHint')}
                />
              </RowBetween>

              {!account ? (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    {intl('pool.connectWalletLiquidity')}
                  </Text>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    <Dots>{intl('pool.loading')}</Dots>
                  </Text>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    {intl('pool.noLiquidity')}
                  </Text>
                </LightCard>
              )}

              <div>
                <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                  {intl('pool.notSeePool')}{' '}
                  <StyledInternalLink id="import-pool-link" to="/find">
                    {intl('pool.importIt')}
                  </StyledInternalLink>
                </Text>
                <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0', opacity: 0, height: '0px' }}>
                  {intl('pool.unstakeTokensHint')}
                </Text>
              </div>
            </AutoColumn>
            </CardBody>
            </Zoom>
        </AutoColumn>
      </AppBody>
    </Container>
  )
}
