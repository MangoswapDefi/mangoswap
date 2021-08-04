import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon } from 'uikit'

const CoreTag = (props) => (
  <Tag variant="primary" outline startIcon={<VerifiedIcon color="secondary" />} {...props}>
    Core
  </Tag>
)

const CommunityTag = (props) => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon color="secondary" />} {...props}>
    Community
  </Tag>
)

const BinanceTag = (props) => (
  <Tag variant="binance" outline startIcon={<BinanceIcon color="secondary" />} {...props}>
    Binance
  </Tag>
)

const DualTag = (props) => (
  <Tag variant="textSubtle" outline {...props}>
    Dual
  </Tag>
)

export { CoreTag, CommunityTag, BinanceTag, DualTag }
