'use client'
import { LockedRow, LockedLeft, LockedIcon, LockedName, LockedDesc, VersionTag } from './LockedRoadmapRow.styles'

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="1.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
)

interface LockedRoadmapRowProps {
  name: string
  description: string
  version: string
  iconType: 'lock' | 'clock'
}

const LockedRoadmapRow = ({ name, description, version, iconType }: LockedRoadmapRowProps) => (
  <LockedRow>
    <LockedLeft>
      <LockedIcon>
        {iconType === 'lock' ? <LockIcon /> : <ClockIcon />}
      </LockedIcon>
      <div>
        <LockedName>{name}</LockedName>
        <LockedDesc>{description}</LockedDesc>
      </div>
    </LockedLeft>
    <VersionTag>{version}</VersionTag>
  </LockedRow>
)

export default LockedRoadmapRow
