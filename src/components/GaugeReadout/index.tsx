'use client'
import {
  GaugeWrap,
  GaugeHousing,
  GaugeFace,
  GaugeGlass,
  SweepGroup,
  SweepNeedle,
  TickRing,
  PivotDot,
  LcdReadout,
  LcdDigits,
  LcdLabel,
} from './GaugeReadout.styles'

interface GaugeReadoutProps {
  clearCount: number
  total: number
}

function computeLabel(clearCount: number, total: number): string {
  if (total === 0) return 'nothing open'
  if (clearCount === total) return 'all clear'
  const flagged = total - clearCount
  return `${flagged} needs attention`
}

const GaugeReadout = ({ clearCount, total }: GaugeReadoutProps) => {
  const label = computeLabel(clearCount, total)
  const digits = total === 0 ? '--' : `${clearCount}/${total}`

  return (
    <GaugeWrap>
      <GaugeHousing>
        <GaugeFace>
          <GaugeGlass />
          <svg
            width="47"
            height="47"
            viewBox="0 0 47 47"
            style={{ position: 'absolute', top: 0, left: 0 }}
            aria-hidden="true"
          >
            <TickRing cx="23.5" cy="23.5" r="18" />
            <SweepGroup>
              <SweepNeedle x1="23.5" y1="23.5" x2="23.5" y2="7" />
            </SweepGroup>
            <PivotDot cx="23.5" cy="23.5" r="2.6" />
          </svg>
        </GaugeFace>
      </GaugeHousing>
      <LcdReadout>
        <LcdDigits>{digits}</LcdDigits>
        <LcdLabel>{label}</LcdLabel>
      </LcdReadout>
    </GaugeWrap>
  )
}

export default GaugeReadout
