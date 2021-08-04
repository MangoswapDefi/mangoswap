import React from 'react'
import styled from 'styled-components'
// import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { customMeta, DEFAULT_META } from 'config/constants/meta'
import { HEAD_NAV_HEIGHT } from 'utils/config'
// import { usePriceCakeBusd } from 'state/hooks'
import Container from './Container'

const StyledPage = styled(Container)`
  min-height: calc(100vh - ${HEAD_NAV_HEIGHT}px);
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

const PageMeta = () => {
  const { pathname } = useLocation()
  // const cakePriceUsd = usePriceCakeBusd()
  const cakePriceUsd = 0 // ?需要获取
  const cakePriceUsdDisplay =
    cakePriceUsd === 0
      ? ''
      : `$${Number(cakePriceUsd).toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`
  const pageMeta = customMeta[pathname] || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = cakePriceUsdDisplay ? [title, cakePriceUsdDisplay].join(' - ') : title

  return (
    <div>
      <title>{pageTitle}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </div>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
