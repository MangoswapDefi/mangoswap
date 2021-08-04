import BigNumber from 'bignumber.js'
import Collapse from 'antd/lib/collapse'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons/lib/icons'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouteMatch } from 'react-router-dom'
import { AppState } from 'state'
import { useActiveWeb3React, useActiveWeb3React2 } from 'hooks'
import Row, { AutoRow, RowBetween } from 'components/Row'
import {
  Card,
  CardHeader,
  ExpandableButton,
  ExpandableButtonV2,
  Button,
  Flex,
  Text,
  HelpIcon,
  CardBody,
  useTooltip,
  LinkExternal
} from 'uikit'
import { Ifo, IfoPoolInfo, IfoStatus } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import { useIfoV2Contract } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'

const useLiveStatus = ({ ifo, pid, ifoContractAddress }: { pid: number; ifoContractAddress: string; ifo: Ifo }) => {
  const { chainId, active } = useActiveWeb3React2()
  const contract = useIfoV2Contract(ifoContractAddress)
  const [status, setSatus] = useState<IfoStatus>('idle')
  const [poolAmountTotal, setPoolAmountTotal] = useState({
    amountTotal0: 1,
    amountTotal1: 1,
  })
  const [openAt, setOpenAt] = useState<Date>(null)
  const [closeAt, setCloseAt] = useState<Date>(null)
  useEffect(() => {
    const init = async () => {
      const { openAt: _openAt, closeAt: _closeAt, amountTotal0, amountTotal1 }: poolsType | IfoPoolInfo = !chainId ? ifo.poolBasic : await contract.methods.pools(pid).call()
      // const { openAt: _openAt, closeAt: _closeAt, amountTotal0, amountTotal1 } = getTestData()

      const currentTimestamp = +new Date() / 1000
      if (currentTimestamp <= _openAt) {
        setSatus('coming_soon')
      } else if (currentTimestamp >= _openAt && currentTimestamp <= _closeAt) {
        setSatus('live')
      } else if (currentTimestamp >= _openAt && currentTimestamp >= _closeAt) {
        setSatus('finished')
      }
      setPoolAmountTotal({ amountTotal0, amountTotal1 })
      setCloseAt(new Date(_closeAt * 1000))
      setOpenAt(new Date(_openAt * 1000))
    }
    init()
    // eslint-disable-next-line
  }, [pid])
  return { status, poolAmountTotal, openAt, closeAt}
}

export default useLiveStatus

interface poolsType {
  seller: string
  token0: string
  token1: string
  amountTotal0: number
  amountTotal1: number
  openAt: number
  closeAt: number
  claimDelaySec: number
}


const getTestData = () => {
  const openAt = +new Date('2021/05/01') / 1000
  const closeAt = +new Date('2021/07/10') / 1000
  const amountTotal0 = 10000
  const amountTotal1 = 10000
  return {
    openAt,
    closeAt,
    amountTotal0,
    amountTotal1
  }
}
