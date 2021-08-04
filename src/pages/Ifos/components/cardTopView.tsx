import React from 'react'
import { Ifo } from 'config/constants/types'
import styled from "styled-components"

const IfoCardTopView = ({ ifo }: { ifo: Ifo }) => {
  return (<IfoCardTopViewStyle>
    <div className="class1">{ifo.sellToken.symbol}</div>
    <div className="class2">{ifo.name2} </div>
  </IfoCardTopViewStyle>)
}

export default IfoCardTopView

const IfoCardTopViewStyle = styled.div`
.class1{
}
.class2{
  margin-top: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.title2};
  margin-bottom: 30px;
}
`