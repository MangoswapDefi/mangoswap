import React from 'react'
import styled from "styled-components"
import { zero } from 'utils'

const CountDownTimeWarpper = styled.span<{color?: string}>`
display: inline-block;
width: 69px;
height: 69px;
position: relative;
text-align: center;
line-height: 69px;
font-size: 26px;
font-weight: 600;
color: ${({ color, theme }) => color ?? theme.colors.text};
svg{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
}
`
const CountDownTimeBox = ({ text, color }) => {
  return <CountDownTimeWarpper color={color}>{zero(text)}
    <svg width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
          <stop stopColor="#5EAFFD" offset="0%" />
          <stop stopColor="#DE539F" offset="100%" />
        </linearGradient>
      </defs>
      <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fillOpacity="0.149173336">
        <g transform="translate(-625.000000, -306.000000)" fill="#FFFFFF" stroke="url(#linearGradient-1)" strokeWidth="2">
          <g transform="translate(625.000000, 306.000000)">
            <rect x="1" y="1" width="98" height="98" rx="14" />
          </g>
        </g>
      </g>
    </svg>
  </CountDownTimeWarpper>
}
export default CountDownTimeBox