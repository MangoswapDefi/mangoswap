import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import throttle from 'lodash/throttle'
// import Row, { AutoRow, RowBetween } from 'components/Row'
// import { isMobile } from 'react-device-detect'
import { useIsMobile } from 'uikit/theme/base'
import { LeftOutlined } from '@ant-design/icons'
import { HEAD_MINE_ORTHER, HEAD_NAV_HEIGHT } from 'utils/config'
import Overlay from '../../components/Overlay/Overlay'
import Flex from '../../components/Box/Flex'
import LangSelector from "./components/LangSelector"
import { useMatchBreakpoints } from '../../hooks'
import Logo from './components/Logo'
import Panel from './components/Panel'
import UserBlock from './components/UserBlock'
import { NavProps } from './types'
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL, NOT_MENU_LIST, NOT_ALL_MENU_LIST } from './config'
import SocialLinks from './components/SocialLinks'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  z-index: 20;
  transform: translate3d(0, 0, 0);
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(225, 225, 225, 0.5);
`

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  >div{
      height: calc(100vh - ${HEAD_NAV_HEIGHT + 1}px);
      /* padding-bottom: 20px; */
      overflow: auto;
  }

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  // profile,
  children,
}) => {
  const isMobile = useIsMobile()
  const [isPushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)
  const refPrevOffset = useRef(window.pageYOffset)

  useEffect(() => {
    if (isMobile) {
      setIsPushed(false)
    }
  }, [isMobile])
  const location = useLocation()  
  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === 'Home')

  return (
    <Wrapper>
      {NOT_ALL_MENU_LIST.includes(location.pathname) || <StyledNav showMenu={showMenu}>
        {NOT_MENU_LIST.includes(location.pathname) ? <Link to="/" style={{marginLeft: '10px'}}><LeftOutlined /></Link> : <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? '/'}
        />}
        <Flex className="flex-center-y">
          <UserBlock account={account} login={login} logout={logout} />
          {/* {profile && <Avatar profile={profile} />} */}
          {isMobile || <>
            <SocialLinks />
            <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />
          </>}
        </Flex>
      </StyledNav>}
      <BodyWrapper>
        {NOT_MENU_LIST.includes(location.pathname) ? <div style={{width: '100vw'}} className="flex flex-center-x">
            {children}
        </div> : <>
            <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            pushNav={setIsPushed}
            links={links}
          />
          <Inner isPushed={isPushed} showMenu={showMenu}>
            {children}
          </Inner>
        </>}
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  )
}

export default Menu
