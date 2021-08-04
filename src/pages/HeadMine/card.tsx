import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BottomGrouping } from 'components/swap/styleds'
import { ETHER } from '@mangoswap-libs/sdk'
import { Button, Flex, Input, Text } from 'uikit'
import Modal from 'components/Modal'
import { baseColors } from 'uikit/theme/colors'
import ConnectWalletButton from 'components/ConnectWalletButton'
import styled from 'styled-components'
import Title from 'antd/lib/typography/Title'
import { Contract } from 'web3-eth-contract'
import AppBody from 'pages/AppBody'
import Row, { AutoRow, RowBetween } from 'components/Row'
import { ContentHeader, Section, Wrapper as HelperWrapper } from 'components/TransactionConfirmationModal/helpers'
import { useActiveWeb3React } from 'hooks'
import useIntl from 'hooks/useIntl'
import { PLATFORM_COIN } from 'utils/config'
import { PlusOutlined } from '@ant-design/icons'
import SVG1 from 'assets/svg/pools/ctk-cake.svg'
import { formatNumber } from 'utils/formatBalance'
import { KNS_ADDRESS } from 'config/constants/contracts'
import { getFristOkbMineAddress, get_OKB_address } from 'utils/addressHelpers'
import { APPROVE_MAX, calcInputRange, getHasApprove } from 'utils'
import { useAllTokenBalances, useCurrencyBalances } from 'state/wallet/hooks'
import { AppState } from 'state'
import { useAllowance } from 'hooks/useAllowance'
import BigNumber from 'bignumber.js'
import okt_kns from 'assets/svg/okt_kns.svg'
import useI18n from 'hooks/useI18n'
import { HeadMineUnStake, InterfaceUnStake } from './stake'
import {
  InitHeadmineContract_Account,
  InitOkbFristMineContractAccount,
  Init_OKB_pure_Contract_Account,
} from './contract'
import ClaimButton from './ClaimButton'

export interface supplyContractParams {
  contract: Contract
  erc20: boolean
  amount: number
  account: string
  decimals: number
}
type onSupply = (params: supplyContractParams) => Promise<void>
type unStake = (data: InterfaceUnStake) => Promise<void>
interface props {
  type: 'OKT' | 'OKB'
  balance: string
  knsBalance: string
  onSupply: onSupply
  unStake: unStake
  isLive: boolean
  totalSupply: string
}

let handleType: 'supply' | 'unStake' | '' = ''
let inputValue = ''
/**
 * frist mine
 * @param param0 {type balance knsBalance}
 * @returns JSX
 */
export default function HeadMineCard({ type, balance = '--', knsBalance, onSupply, unStake, isLive, totalSupply }: props) {
  const { account } = useActiveWeb3React()
  const intl = useIntl()
  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [ETHER])[0]
  const tokenAllBalance = useAllTokenBalances()
  const okbBalance = tokenAllBalance[get_OKB_address()]
  const TranslateString = useI18n()
  // const currency = relevantTokenBalances?.currency
  const contract: { OKT: Contract; OKB: Contract } = {
    OKT: InitHeadmineContract_Account(),
    OKB: InitOkbFristMineContractAccount(),
  }
  const OKB_ADDRESS_CONTRACT = Init_OKB_pure_Contract_Account()
  const fristMine = useSelector((state: AppState) => state.fristMine)
  const globalKnsBalance: string | void = fristMine.knsBalance[KNS_ADDRESS()[type]] ?? '0'
  const ofTatal = formatNumber( (parseFloat(balance) / parseFloat(totalSupply)) * 100 )
  const item = {
    title: `${type} POOL`,
    stakeText: `${balance} ${type}`,
    ofTotal: `${ofTatal} %`,
    earn: formatNumber(parseFloat(knsBalance)),
  }
  const _onSupply = () => {
    handleType = 'supply'
    setIsOpenModel(true)
    initInput()
  }
  const onUnstake = () => {
    handleType = 'unStake'
    setIsOpenModel(true)
    initInput()
  }

  const allowance: BigNumber = useAllowance(OKB_ADDRESS_CONTRACT, getFristOkbMineAddress())
  const hasApprove: boolean = getHasApprove(allowance)

  const onApprove = () => {
    OKB_ADDRESS_CONTRACT.methods.approve(getFristOkbMineAddress(), APPROVE_MAX).send({ from: account })
  }

  const [isOpenModel, setIsOpenModel] = useState(false)
  const onDismissModel = () => {
    setIsOpenModel(false)
  }
  const getAmount = () => {
    const amount: number = parseFloat(inputValue)
    return amount
  }
  const onConfirm = async () => {
    if (handleType === 'supply') {
      const amount: number = getAmount()
      const decimals = await OKB_ADDRESS_CONTRACT.methods.decimals().call()
      onSupply({
        contract: contract[type],
        erc20: type === 'OKB',
        amount,
        account,
        decimals,
      })
    }
    if (handleType === 'unStake') {
      const amount: number = getAmount()
      unStake({ contract: contract[type], amount, account })
    }
    setIsOpenModel(false)
  }
  const [jsxInputValue, setJsxInputValue] = useState('')
  const onInputChange = (v: { target: { value: string } }) => {
    inputValue = v.target.value
    setJsxInputValue(inputValue)
    // TODO error handle
  }
  const currencyBalance = type === 'OKT' ? relevantTokenBalances : okbBalance
  const _balance = currencyBalance?.toExact ? parseFloat(currencyBalance?.toExact())?.toFixed(3) : ''
  const availbleBalance = _balance.substring(0, _balance.length - 1)
  const tipsBalance = handleType === 'supply' ? availbleBalance : balance ?? '0'
  const confirmDisabled = calcInputRange({ value: jsxInputValue, max: tipsBalance })
  const onMax = () => {
    if (handleType === 'supply') {
      inputValue = availbleBalance
    }
    if (handleType === 'unStake') {
      inputValue = balance
    }
    setJsxInputValue(inputValue)
  }
  const initInput = () => {
    inputValue = ''
    setJsxInputValue(inputValue)
  }
  useEffect(initInput, [])

  return (
    <HeadMineAppBody>
      <Wrapper>
        <CardTitle>{item.title}</CardTitle>
        <Flex>
          <AutoRow justify="center">
            <img src={okt_kns} alt={`$${PLATFORM_COIN}-${type}`} />
          </AutoRow>
          {parseFloat(item.earn) ? <ClaimButton contract={contract[type]} /> : <></>}
        </Flex>
        <Text textAlign="center" fontSize="22px" className="earn">
          {item.earn}
        </Text>
        <Text textAlign="center" color={baseColors.unimportant}>
          {intl({ id: 'preMiner.yourCoinEarn', data: {coinName: PLATFORM_COIN}})}
        </Text>
        <BottomGrouping>
          {!account ? (
            <ConnectWalletButton width="100%" />
          ) : type === 'OKT' ? (
            <Flex>
              <RowBetween>
                <Button variant="gradual" onClick={onUnstake}>
                  {intl('global.unstake')}&nbsp;{type}
                </Button>
                <Button disabled={!isLive} onClick={_onSupply}>
                  <PlusOutlined />
                </Button>
              </RowBetween>
            </Flex>
          ) : type === 'OKB' ? (
            <div>
              {!hasApprove ? (
                <AutoRow justify="center">
                <Button onClick={onApprove}>{intl('global.approve')}</Button>
                </AutoRow>
              ) : (
                <RowBetween>
                  <Button variant="gradual" onClick={onUnstake}>
                    {intl('global.unstake')}&nbsp;{type}
                  </Button>
                  <Button disabled={!isLive} onClick={_onSupply}>
                    <PlusOutlined />
                  </Button>
                </RowBetween>
              )}
            </div>
          ) : (
            <></>
          )}
        </BottomGrouping>
        <Info>
          <RowBetween>
            <Text>{intl('preMiner.youStake') }</Text>
            <Text>{item.stakeText}</Text>
          </RowBetween>
          <RowBetween>
            <Text>{intl('preMiner.ofTotal')}</Text>
            <Text>{ item.ofTotal }</Text>
          </RowBetween>
        </Info>
        <Modal isOpen={isOpenModel as any} onDismiss={onDismissModel} maxHeight={200}>
          <HelperWrapper>
            <Section>
              <ContentHeader color={baseColors.title} onDismiss={onDismissModel}>
                {handleType === 'unStake'
                  ? `Withdraw ${type} Tokens`
                  : handleType === 'supply'
                  ? `Deposit ${type} Tokens`
                  : `Waiting for confirmation`}
              </ContentHeader>
              <RowBetween>
                <span />
                <AvailbleText>
                  {tipsBalance} {type} Availble
                </AvailbleText>
              </RowBetween>
              <PriceInputRow className="flex flex-center-y">
                <RowBetween>
                  <Input placeholder="input" value={jsxInputValue} onChange={onInputChange} />
                  <Flex>
                    <RightMaxHandle className="flex flex-center-y">
                      <Text>{type}</Text>
                      <Button onClick={onMax} size="sm">
                        MAX
                      </Button>
                    </RightMaxHandle>
                  </Flex>
                </RowBetween>
              </PriceInputRow>
              <Flex>
                <RowBetween>
                  <Button variant="secondary" onClick={onDismissModel}>
                    Cancel
                  </Button>
                  <Button disabled={confirmDisabled} width={250} variant="gradual" type="submit" onClick={onConfirm}>
                    Confirm
                  </Button>
                </RowBetween>
              </Flex>
            </Section>
          </HelperWrapper>
        </Modal>
      </Wrapper>
    </HeadMineAppBody>
  )
}

const HeadMineAppBody = styled(AppBody)``
const AvailbleText = styled.span`
  color: ${({ theme }) => theme.colors.unimportant};
  font-size: 12px;
  margin-top: 30px;
`
const CardTitle = styled(Title)`
  text-align: center;
`
const Wrapper = styled.div`
  padding: 20px;
  img {
    width: 45px;
  }
  .earn {
    /* display: inline-block; */
    margin-top: 10px;
  }
`
const Info = styled.div`
  margin-top: 20px;
`
const RightMaxHandle = styled.div`
  margin-left: 20px;
  button {
    zoom: 0.7;
    margin-left: 8px;
    border-radius: 25px;
  }
`
const PriceInputRow = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
  input {
    /* color: ${({ theme }) => theme.colors.unimportant}!important; */
    background-color: ${({ theme }) => theme.colors.inputBackground}!important;
    border-width: 0px !important;
    &:focus:not(:disabled) {
    }
  }
`

// var jsxInputValue = '1'
// var tipsBalance = '2'
// {

//   const isNumber = (value) => {
//     const n = parseFloat(value)
//     return Number.isNaN(Number(n))
//   }
//   const isExceedNumber = ({ value, min, max }) => {
//     const n = parseFloat(value)
//     console.log(n, min, max)
//     return isNumber(value) ? true : !(n > min && n <= max)
//   }
//   console.log(
//     isExceedNumber({ value: jsxInputValue, min: 0, max: isNumber(tipsBalance) ? 0 : parseFloat(tipsBalance) })
//   )

// }
