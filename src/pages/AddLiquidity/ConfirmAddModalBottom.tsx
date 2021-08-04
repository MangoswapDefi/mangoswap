import { Currency, CurrencyAmount, Fraction, Percent } from '@mangoswap-libs/sdk'
import React from 'react'
import { Button, Text } from 'uikit'
import useIntl from 'hooks/useIntl'
import { TranslateString } from 'utils/translateTextHelpers'
import { RowBetween, RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { Field } from '../../state/mint/actions'

export function ConfirmAddModalBottom({ 
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const intl = useIntl()
  return (
    <>
      <RowBetween>
        <Text>{intl({id: 'add.symbolDeposited', data: {symbol: currencies[Field.CURRENCY_A]?.symbol}})}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>{intl({id: 'add.symbolDeposited', data: {symbol: currencies[Field.CURRENCY_B]?.symbol}})}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>{intl('add.rates')}</Text>
        <Text>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Text>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween>
        <Text>{intl('add.shareOfPool')}:</Text>
        <Text>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </RowBetween>
      <Button mt="20px" onClick={onAdd} variant='primary'>
        {noLiquidity ? intl('add.createPoolSupply') : intl('add.confirmSupply')}
      </Button>
    </>
  )
}

export default ConfirmAddModalBottom
