import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  width: 100%;
  padding-top: 70px;
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
  background: url('/images/swapBg.svg') no-repeat center center;
  
  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 90vh;
  }

  #join-pool-button{
    &:hover{
      color: #fff;
      background-color: inherit;
    }
  }
`

export default Container
