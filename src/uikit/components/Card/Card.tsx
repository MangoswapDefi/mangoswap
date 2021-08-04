import React from 'react'
import StyledCard from './StyledCard'
import { CardProps } from './types'

const Card: React.FC<CardProps> = ({ ribbon, children, ...props }) => {
  return (
    <StyledCard {...props} id="noshade">
      {ribbon}
      <div className="content">{children}</div>
    </StyledCard>
  )
}
export default Card
