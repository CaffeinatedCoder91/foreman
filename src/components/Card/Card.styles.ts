'use client'
import styled from 'styled-components'

export const StyledCard = styled.div`
  background: ${({ theme }) => theme.gradient.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 13px 14px;
  box-shadow: ${({ theme }) => theme.shadow.card};
`
