'use client'
import {
  GaugeWrap,
  GaugeHousing,
  GaugeFace,
  GaugeGlass,
  SweepGroup,
  SweepNeedle,
  TickRing,
  TickMark,
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

const CENTER = 23.5
const OUTER_R = 18
const INNER_R = 15.5
const TICK_COUNT = 8

const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
  const angle = (i * 2 * Math.PI) / TICK_COUNT
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  return {
    x1: CENTER + OUTER_R * s,
    y1: CENTER - OUTER_R * c,
    x2: CENTER + INNER_R * s,
    y2: CENTER - INNER_R * c,
  }
})

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
            {ticks.map((t, i) => (
              <TickMark key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
            ))}
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
