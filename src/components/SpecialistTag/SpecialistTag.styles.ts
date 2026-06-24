'use client'
import styled from 'styled-components'

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: ${({ theme }) => theme.font.body};
  font-size: 10px;
  letter-spacing: 0.02em;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  background: ${({ theme }) => theme.color.panel};
  color: ${({ theme }) => theme.color.inkMuted};
  border: 1px solid ${({ theme }) => theme.color.border};
`

export const TagDot = styled.span<{ $status: 'ok' | 'watch' }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => theme.radius.full};
  flex: 0 0 auto;
  background: ${({ theme, $status }) =>
    $status === 'ok' ? theme.gradient.statusDotOk : theme.gradient.statusDotWatch};
`
