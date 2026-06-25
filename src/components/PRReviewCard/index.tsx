'use client'
import SpecialistTag, { type SpecialistTagProps } from '@/components/SpecialistTag'
import {
  Card,
  CardTop,
  CardMeta,
  CardTitle,
  CardRepo,
  StatusBadge,
  TagRow,
} from './PRReviewCard.styles'

export type PRStatus = 'clear' | 'flagged' | 'stale'

interface PRReviewCardProps {
  prNumber: number
  title: string
  repo: string
  status: PRStatus
  flagCount?: number
  specialists: SpecialistTagProps[]
  stale?: boolean
}

function badgeText(status: PRStatus, flagCount: number): string {
  if (status === 'clear') return 'all clear'
  if (status === 'stale') return 'reviewing'
  return flagCount === 1 ? '1 flag' : `${flagCount} flags`
}

const PRReviewCard = ({
  prNumber,
  title,
  repo,
  status,
  flagCount = 0,
  specialists,
  stale,
}: PRReviewCardProps) => (
  <Card $stale={stale}>
    <CardTop>
      <CardMeta>
        <CardTitle>#{prNumber} · {title}</CardTitle>
        <CardRepo>{repo}</CardRepo>
      </CardMeta>
      <StatusBadge $status={status}>{badgeText(status, flagCount)}</StatusBadge>
    </CardTop>
    <TagRow>
      {specialists.map((s) => (
        <SpecialistTag key={s.name} {...s} />
      ))}
    </TagRow>
  </Card>
)

export default PRReviewCard
