import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import {
  ButtonMenu,
  ButtonMenuItem,
  Button,
  HelpIcon,
  Toggle,
  Text,
  Flex,
  NotificationDot,
  Link as UiKitLink,
} from 'uikit'
import useI18n from 'hooks/useI18n'
import FarmTabButtons from 'pages/Farms/components/FarmTabButtons'
import useIntl from 'hooks/useIntl'
import { useIsMobile } from 'uikit/theme/base'

const ButtonText = styled(Text)`
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`

const StyledLink = styled(UiKitLink)`
  width: 100%;
`

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()
  const intl = useIntl()
  const isMobile = useIsMobile();

  return (
    <Flex alignItems="center" justifyContent="flexStart" mb="32px">
      <Flex alignItems="center">
        <Flex mr="16px" justifyContent="flexStart" alignItems="center">
          <Text ml="8px" mr="12px">
          {intl('farms.stakedOnly')}
          </Text>
          <Toggle scale="sm" checked={stakedOnly} onChange={() => setStakedOnly((prev) => !prev)} />
        </Flex>
        <Flex ml={isMobile ? '0' : "136px"}>
        <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="primary">
          <ButtonMenuItem as={Link} to="/pools" height="24px">
          {intl('farms.live')}
          </ButtonMenuItem>
          <NotificationDot show={hasStakeInFinishedPools}>
            <ButtonMenuItem as={Link} to="/pools/history" height="24px">
            {intl('farms.paused')}
            </ButtonMenuItem>
          </NotificationDot>
        </ButtonMenu>
        </Flex>
      </Flex>
      {/* <Flex ml="24px" alignItems="center" justifyContent="flex-end">
        <StyledLink external href="https://docs.mangoswap.finance/syrup-pools/syrup-pool">
          <Button px={['14px', null, null, null, '20px']} variant="subtle">
            <ButtonText color="backgroundAlt" bold fontSize="16px">
              {TranslateString(999, 'Help')}
            </ButtonText>
            <HelpIcon color="backgroundAlt" ml={[null, null, null, 0, '6px']} />
          </Button>
        </StyledLink>
      </Flex> */}
    </Flex>
  )
}

export default PoolTabButtons
