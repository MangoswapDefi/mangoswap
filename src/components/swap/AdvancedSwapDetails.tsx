import React from 'react'
import { Trade, TradeType } from '@mangoswap-libs/sdk'
import { Card, CardBody, Text } from 'uikit'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'
import { Field } from '../../state/swap/actions'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import { SectionBreak } from './styleds'
import SwapRoute from './SwapRoute'

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  const TranslateString = useI18n()
  const intl = useIntl()

  return (
    <Card>
      <CardBody>
        <RowBetween>
          <RowFixed>
            <Text fontSize="14px">
              {isExactIn ? intl('swap.minimumReceived') : intl('swap.maximumSold')}
            </Text>
            <QuestionHelper
              text={intl('swap.minimumReceivedHint')}
            />
          </RowFixed>
          <RowFixed>
            <Text fontSize="14px">
              {isExactIn
                ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                  '-'
                : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                  '-'}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize='14px'>{intl('swap.priceImpact')}</Text>
            <QuestionHelper
              text={intl('swap.priceImpactHint')}
            />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <Text fontSize="14px">{intl('swap.liquidityProviderFee')}</Text>
            <QuestionHelper
              text={intl('supple.feePaid')}
            />
          </RowFixed>
          <Text fontSize="14px">
            {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
          </Text>
        </RowBetween>
      </CardBody>
    </Card>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const [allowedSlippage] = useUserSlippageTolerance()
  const TranslateString = useI18n()
  const intl = useIntl()
  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="md">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <SectionBreak />
              <AutoColumn style={{ padding: '0 24px' }}>
                <RowFixed>
                  <Text fontSize="14px">{intl('swap.route')}</Text>
                  <QuestionHelper
                    text={intl('swap.routeTokens')}
                  />
                </RowFixed>
                <SwapRoute trade={trade} />
              </AutoColumn>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
