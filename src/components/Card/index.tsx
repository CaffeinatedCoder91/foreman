'use client'
import { HTMLAttributes, ReactNode } from 'react'
import { StyledCard } from './Card.styles'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Card = ({ children, ...rest }: CardProps) => {
  return <StyledCard {...rest}>{children}</StyledCard>
}

export default Card
