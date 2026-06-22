'use client'
import { StyledDot, type StatusDotVariant } from './StatusDot.styles'

interface StatusDotProps {
  variant: StatusDotVariant
  'aria-label'?: string
}

const StatusDot = ({ variant, 'aria-label': ariaLabel }: StatusDotProps) => {
  return <StyledDot $variant={variant} role="img" aria-label={ariaLabel ?? (variant === 'ok' ? 'Clear' : 'Flagged')} />
}

export default StatusDot
