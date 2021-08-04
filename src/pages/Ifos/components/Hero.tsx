import React from 'react'
import styled from 'styled-components'
import { Box, Heading, Text } from 'uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'
import useIntl from 'hooks/useIntl'
import ifosTopBg from 'assets/png/ifoTopBg.png'
import ifosTopBgMobile from 'assets/png/ifotopbg2_mobile.png'
import ifosTopBg2 from 'assets/png/ifotopbg2.png'
import star1 from 'assets/png/star1.png'
import star2 from 'assets/png/star2.png'
import star3 from 'assets/png/star3.png'
import light from 'assets/png/light.png'
import { useIsMobile } from 'uikit/theme/base'

const StyledHero = styled.div`
  position: relative;
  .pc{
    .bg1{
      width: 100%;
      height: 300px;
    }
    .bg2{
      position: absolute;
      width: 375px;
      max-width: 30%;
      right: 4vw;
      bottom: 70px;
    }
    .light{
      position: absolute;
      top: 23px;
      left: 278px;
    }
    .star1{
      position: absolute;
      left: 0px;
      top: 0px;
    }
    .star2{
      position: absolute;
      bottom: 30px;
      right: 0px;
    }
    .star3{
      position: absolute;
      top: 30px;
      left: 20vw;
    }
    h1{
      position: absolute;
      top: 51px;
      left: 20vw;
      font-size: 38px;
    }
    .text{
      position: absolute;
      top: 113px;
      left: 20vw;
      color: rgba(0,0,0,.13);
    }
  }
  .mobile{
    .bg1{
      width: 100%;
    }
    .texts{
      position: absolute;
      left: 20px;
      top: 0px;
      h1{
        font-size: 32px;
        margin-top: 20px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .text{
        font-size: 12px;
        color: rgba(0,0,0,.5);
        margin-top: -3px;
      }
    }
  }
`

const CurtainBottom = styled.div`
  /* background-image: url('/images/curtain-bottom-light.png');
  background-repeat: repeat-x;
  background-size: contain;
  height: 20px; */
`

const Hero = () => {
  const TranslateString = useI18n()
  const intl = useIntl()
  const isMobile = useIsMobile()

  return (
    <StyledHero>
      {isMobile ? <div className="mobile">
        <img className="bg1" src={ifosTopBgMobile} alt="" />
        <div className="texts">
          <Heading as="h1">IFO</Heading>
          <Text className="text" bold mt="12px">{intl('ifo.buyTokens')}</Text>
        </div>
      </div> : <div className="pc">
        <img className="bg1" src={ifosTopBg} alt="" />
        <img className="light" src={light} alt="" />
        <img className="bg2" src={ifosTopBg2} alt="" />
        <img className="star1" src={star1} alt="" />
        <img className="star2" src={star2} alt="" />
        <img className="star3" src={star3} alt="" />
        <Heading as="h1">IFO</Heading>
        <Text className="text" bold  mt="12px" style={{lineHeight: '1.7'}}>{intl('ifo.buyTokens')}</Text>
      </div>}
      </StyledHero>
  )
}

export default Hero
