'use client'
import styled from 'styled-components'

export const LockedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  background: ${({ theme }) => theme.color.lockedBg};
  border: 1px dashed ${({ theme }) => theme.color.borderMid};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 12px 14px;
  margin-bottom: 8px;
`

export const LockedLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
`

export const LockedIcon = styled.span`
  opacity: 0.45;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.inkMuted};
`

export const LockedName = styled.p`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 12px;
  color: ${({ theme }) => theme.color.inkMuted};
  font-weight: 500;
  margin: 0;
`

export const LockedDesc = styled.p`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 10.5px;
  color: ${({ theme }) => theme.color.inkFaint};
  margin: 1px 0 0;
`

export const VersionTag = styled.span`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.color.inkFaint};
  border: 1px solid ${({ theme }) => theme.color.borderMid};
  padding: 3px 7px;
  border-radius: ${({ theme }) => theme.radius.xs};
  flex: 0 0 auto;
  white-space: nowrap;
`
