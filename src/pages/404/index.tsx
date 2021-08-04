
import NotPageIcon from 'assets/svg/NotPage'
import React from 'react'
import styled from 'styled-components'
import { DEVICESM } from 'uikit/theme/base'

const NotPageStyle = styled.div`
text-align: center;
margin-top: 260px;
`
const NotPage = () => {
  return <NotPageStyle>
    <NotPageIcon {... DEVICESM ?  {width: 207, height: 'auto'} : {width: 407, height: 256}} />
  </NotPageStyle>
}
export default NotPage