import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Button } from 'uikit'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()
  const intl = useIntl()
  return (
    <StyledNav>
      {/* <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {TranslateString(1142, 'Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(262, 'Liquidity')}
        </ButtonMenuItem>
      </ButtonMenu> */}
      <Button as={Link} className={`${activeIndex === 0 ? 'active' : ''}`} variant={activeIndex === 0 ? 'primary' : 'text'} scale="sm" to="/swap">{intl('swap.swap', 'Swap')}</Button>
      <Button as={Link} className={`${activeIndex === 1 ? 'active' : ''}`} variant={activeIndex === 1 ? 'primary' : 'text'}  scale="sm" to="/pool">{intl('swap.liquidity', 'Liquidity')}</Button>
    </StyledNav>
  )
}

export default Nav


const StyledNav = styled.div`
  margin-bottom: 40px;
  margin-top: 0px;
  background: #FFEDCF;
  border: 1px solid #FFDA9E;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 10px;

  a{
    color: #000000;
    font-size: 16px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    position: relative;
    &:nth-child(2){
      margin-left: 27px;
    }
  }
  .active{
    color: #FFFFFF; 
    border-radius: 6px;
  }
`