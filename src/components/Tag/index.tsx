'use client'
import { ReactNode } from 'react'
import { StyledTag } from './Tag.styles'

interface TagProps {
  children: ReactNode
}

const Tag = ({ children }: TagProps) => {
  return <StyledTag>{children}</StyledTag>
}

export default Tag
