import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useIsMobile } from 'uikit/theme/base'
import { Link } from 'react-router-dom'
import Flex from '../../../components/Box/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from '../icons'
import MenuButton from './MenuButton'
import IconLogin from '../../../../assets/svg/Logo'

interface Props {
  isPushed: boolean
  isDark: boolean
  togglePush: () => void
  href: string
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 13px;
  .desktop-icon {
    width: 138px;
    /*
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }*/
  }
  .right-eye {
    animation-delay: 20ms;
  }
  transition: transform 0.3s ease;
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
    transform: rotate(-5deg);
  }
`

const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {

  const isMobile = useIsMobile()
  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <>
      {/* <IconLogin width={32} height={27} className="mobile-icon" /> */}
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  )

  return (
    <Flex>
      {isMobile && <MenuButton aria-label="Toggle menu" onClick={togglePush}>
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>}
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark)
