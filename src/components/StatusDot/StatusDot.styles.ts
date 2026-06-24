'use client'
import styled from 'styled-components'

export type StatusDotVariant = 'ok' | 'watch'

interface StyledDotProps {
  $variant: StatusDotVariant
}

export const StyledDot = styled.span<StyledDotProps>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => theme.radius.full};
  flex: 0 0 auto;
  background: ${({ theme, $variant }) =>
    $variant === 'ok'
      ? theme.gradient.statusDotOk
      : theme.gradient.statusDotWatch};
  box-shadow: ${({ theme }) => theme.shadow.statusDot};
`
