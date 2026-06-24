'use client'
import { RegMark, RegPath } from './RegistrationMarks.styles'

const POSITIONS = ['tl', 'tr', 'bl', 'br'] as const

const RegistrationMarks = () => (
  <>
    {POSITIONS.map((pos) => (
      <RegMark key={pos} $position={pos}>
        <svg viewBox="0 0 14 14" width="100%" height="100%" aria-hidden="true">
          <RegPath d="M0,5 V0 H5" />
        </svg>
      </RegMark>
    ))}
  </>
)

export default RegistrationMarks
