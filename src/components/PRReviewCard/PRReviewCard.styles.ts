'use client'
import styled, { css } from 'styled-components'

export const Card = styled.article<{ $stale?: boolean }>`
  background: ${({ theme }) => theme.gradient.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 13px 14px;
  margin-bottom: 8px;
  box-shadow: ${({ theme }) => theme.shadow.card};
  ${({ $stale, theme }) =>
    $stale &&
    css`
      background: ${theme.color.lockedBg};
      border-color: ${theme.color.borderMid};
      border-style: dashed;
      box-shadow: none;
    `}
`

export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 9px;
`

export const CardMeta = styled.div`
  min-width: 0;
`

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.ink};
  line-height: 1.35;
  margin: 0;
`

export const CardRepo = styled.p`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 10.5px;
  color: ${({ theme }) => theme.color.inkFaint};
  margin: 2px 0 0;
`

export const StatusBadge = styled.span<{ $status: 'clear' | 'flagged' | 'stale' }>`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radius.xs};
  flex: 0 0 auto;
  white-space: nowrap;
  background: ${({ theme, $status }) => {
    if ($status === 'clear') return theme.color.status.clearBg
    if ($status === 'flagged') return theme.color.status.flaggedBg
    return theme.color.panel
  }};
  color: ${({ theme, $status }) => {
    if ($status === 'clear') return theme.color.status.clearFg
    if ($status === 'flagged') return theme.color.status.flaggedFg
    return theme.color.inkFaint
  }};
`

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`
