import styled from 'styled-components'

const IfoLayout = styled.div`
  display: grid;
  grid-gap: 32px;
  padding: 40px 0;
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
`


export const CouponStyle = styled.div`
background-color: ${({ theme }) => theme.colors.couponBackgroundColor};
border-radius: 10px;
padding: 21px 15px;
margin-bottom: 19px;
position: relative;
::after{
  content: "";
  display: block;
  width: 29px;
  height: 29px;
  border-radius: 100%;
  background-color: white;
  position: absolute;
  right: -14.5px;
  top: 50%;
  margin-top: -14.5px;
}
::before{
  content: "";
  display: block;
  width: 29px;
  height: 29px;
  border-radius: 100%;
  background-color: white;
  position: absolute;
  left: -14.5px;
  top: 50%;
  margin-top: -14.5px;
  z-index: 1;
}
.line{
  position: absolute;
  top: 50%;
  left: 0px;
  right: 0px;
  margin: auto;
  height: 1px;
  margin-top: -1px;
  background: linear-gradient(to right, #fff, #fff 5px, transparent 5px, transparent);
  background-size: 10px 100%;
}
`

export default IfoLayout
