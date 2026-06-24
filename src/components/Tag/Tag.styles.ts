'use client'
import styled from 'styled-components'

export const StyledTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  background: ${({ theme }) => theme.color.panel};
  color: ${({ theme }) => theme.color.inkMuted};
  border: 1px solid ${({ theme }) => theme.color.border};
  font-family: ${({ theme }) => theme.font.body};
  font-size: 10px;
  letter-spacing: 0.02em;
  box-shadow: ${({ theme }) => theme.shadow.card};
  white-space: nowrap;
`
