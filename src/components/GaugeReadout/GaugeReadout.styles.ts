'use client'
import styled, { keyframes } from 'styled-components'

const sweepAnim = keyframes`
  from { transform: rotate(0deg) }
  to   { transform: rotate(360deg) }
`

export const GaugeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`

export const GaugeHousing = styled.div`
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradient.gaugeHousing};
  box-shadow: ${({ theme }) => theme.shadow.gaugeHousing};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`

export const GaugeFace = styled.div`
  position: relative;
  width: 47px;
  height: 47px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradient.gaugeFace};
  box-shadow: ${({ theme }) => theme.shadow.gaugeFace};
`

export const GaugeGlass = styled.div`
  position: absolute;
  top: 2px;
  left: 4px;
  width: 26px;
  height: 13px;
  background: ${({ theme }) => theme.gradient.glassHighlight};
  border-radius: 50%;
  filter: blur(1px);
  pointer-events: none;
`

export const SweepGroup = styled.g`
  animation: ${sweepAnim} 6s linear infinite;
  transform-origin: 23.5px 23.5px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(0deg);
  }
`

export const SweepNeedle = styled('line')`
  stroke: ${({ theme }) => theme.color.accent};
  stroke-width: 1.6;
  stroke-linecap: round;
`

export const TickRing = styled('circle')`
  fill: none;
  stroke: ${({ theme }) => theme.color.ink};
  stroke-width: 1;
  opacity: 0.14;
`

export const PivotDot = styled('circle')`
  fill: ${({ theme }) => theme.color.ink};
`

export const LcdReadout = styled.div`
  text-align: right;
  background: ${({ theme }) => theme.gradient.lcd};
  border-radius: 6px;
  padding: 5px 10px 4px;
  box-shadow: ${({ theme }) => theme.shadow.lcd};
`

export const LcdDigits = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.lcdGreen};
  line-height: 1;
  letter-spacing: 0.02em;
  text-shadow: 0 0 5px ${({ theme }) => theme.color.lcdGreenFaint};
`

export const LcdLabel = styled.div`
  font-size: 8px;
  color: ${({ theme }) => theme.color.lcdGreenFaint};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 2px;
  white-space: nowrap;
`
