'use client'
import { Tag, TagDot } from './SpecialistTag.styles'

export interface SpecialistTagProps {
  name: string
  status: 'ok' | 'watch'
  noteCount?: number
}

const SpecialistTag = ({ name, status, noteCount }: SpecialistTagProps) => {
  const label = noteCount
    ? `${name} · ${noteCount} ${noteCount === 1 ? 'note' : 'notes'}`
    : name
  return (
    <Tag>
      <TagDot $status={status} aria-hidden="true" />
      {label}
    </Tag>
  )
}

export default SpecialistTag
