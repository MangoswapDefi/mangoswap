import React from 'react'
import styled from 'styled-components'
import useIntl from 'hooks/useIntl'

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`

interface CellLayoutProps {
  label?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children }) => {
  const intl = useIntl()
  return (
    <div>
      {label && <Label>{intl(label)}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout
