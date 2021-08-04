import React from 'react'
import styled from 'styled-components'

export interface CellProps {
  title: string
  value?: string
}
const StyledCell = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 14px;
  > span {
    &:first-child {
      color: ${({ theme }) => theme.colors.title};
    }
    &:last-child {
      color: ${({ theme }) => theme.colors.textSubtle};
    }
  }
`
const Cell: React.FC<CellProps> = ({ title, value }) => {
  return (
    <StyledCell>
      <span>{title}</span>
      <span>{value}</span>
    </StyledCell>
  )
}

export { Cell }
export default Cell
