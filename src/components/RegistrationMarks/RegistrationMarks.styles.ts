'use client'
import styled from 'styled-components'

type Position = 'tl' | 'tr' | 'bl' | 'br'

const positionStyles: Record<Position, string> = {
  tl: 'top: 13px; left: 13px;',
  tr: 'top: 13px; right: 13px; transform: scaleX(-1);',
  bl: 'bottom: 13px; left: 13px; transform: scaleY(-1);',
  br: 'bottom: 13px; right: 13px; transform: scale(-1,-1);',
}

export const RegMark = styled.div<{ $position: Position }>`
  position: absolute;
  width: 13px;
  height: 13px;
  opacity: 0.4;
  ${({ $position }) => positionStyles[$position]}
`

export const RegPath = styled('path')`
  fill: none;
  stroke: ${({ theme }) => theme.color.ink};
  stroke-width: 1;
`
