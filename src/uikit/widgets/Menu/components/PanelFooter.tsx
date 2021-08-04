import React from 'react'
import styled from 'styled-components'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { ETHER } from '@mangoswap-libs/sdk'
import { Aligner } from 'components/CurrencyInputPanel'
import CurrencyLogo, { StyledBnbLogo } from 'components/CurrencyLogo'
// import { isMobile } from 'react-device-detect'
import { useIsMobile } from 'uikit/theme/base'
import IconButton from '../../../components/Button/IconButton'
import { MENU_ENTRY_HEIGHT } from '../config'
import { PanelProps, PushedProps } from '../types'
import MenuButton from './MenuButton'
import { HamburgerIcon, HamburgerCloseIcon } from '../icons'
import SocialLinks from './SocialLinks'

interface Props extends PanelProps, PushedProps {}

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
`

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 5px;
`

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  cakePriceUsd,
  currentLang,
  togglePush,
  langs,
  setLang,
}) => {
  const isMobile = useIsMobile()
  const { account } = useActiveWeb3React()

  const relevantTokenBalances = useCurrencyBalances("0x4074A8deA884611F6553932CDF0B8390CDbA427E" ?? undefined, [ETHER])[0]
  const currency = relevantTokenBalances?.currency

  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <HamburgerIcon width="24px" color="textSubtle" />
        </IconButton>
      </Container>
    )
  }

  return (
    <Container>
      {isMobile && <SocialEntry>
        <SocialLinks />
      </SocialEntry>}
      <SocialEntry>
        {isMobile || <MenuButton aria-label="Toggle menu" onClick={togglePush}>
          {isPushed ? (
            <HamburgerCloseIcon width="24px" color="textSubtle" />
          ) : (
            <HamburgerIcon width="24px" color="textSubtle" />
          )}
        </MenuButton>}
        <OKTBalance currency={currency} currencyBalance={relevantTokenBalances} />
        
      </SocialEntry>
    </Container>
  )
}

const OKTBalance = ({ currencyBalance, currency }) => {
  const balance = currencyBalance?.toExact ? (parseInt(currencyBalance?.toExact())?.toFixed(2)) : '--'
  return <BalanceWarpper>
    <Aligner>
      {/* <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} /> */}
      {/* <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} /> */}
      <StyledBnbLogo src="/images/coins/mango.svg" size="24px"  style={{marginRight: '8px', boxShadow: 'none', height: '28px'}} />
      <span>{balance}</span>
    </Aligner>
  </BalanceWarpper>
}

export default PanelFooter

const BalanceWarpper = styled.div`
background: rgba(253, 158, 8, .2);
border-radius: 26px;
padding: 3px 12px;
color: ${({ theme }) => theme.colors.text};
margin-right: 15px;
`