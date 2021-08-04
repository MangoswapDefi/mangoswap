import styled from 'styled-components'

const FlexLayout = styled.div < { justify?: 'flex-start' | 'left' | 'center' | 'flex-end' | 'space-between' | 'space-around'}>`
  display: flex;
  justify-content: ${({ justify }) => justify ?? 'center'};
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
