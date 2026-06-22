'use client'
import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface StyledButtonProps {
  $variant?: ButtonVariant
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radius.xs};
  font-family: ${({ theme }) => theme.font.body};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    box-shadow 0.15s ease,
    opacity 0.1s ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadow.buttonActive};
  }

  ${({ theme, $variant = 'secondary' }) => {
    if ($variant === 'primary') {
      return css`
        background: ${theme.color.accent};
        color: ${theme.color.white};
        border-color: ${theme.color.accentDim};
        box-shadow: ${theme.shadow.button};
        &:hover:not(:disabled) {
          background: ${theme.color.accentLight};
          box-shadow: ${theme.shadow.cardElevated};
        }
      `
    }
    if ($variant === 'ghost') {
      return css`
        background: transparent;
        color: ${theme.color.inkMuted};
        border-color: ${theme.color.border};
        box-shadow: ${theme.shadow.button};
        &:hover:not(:disabled) {
          color: ${theme.color.ink};
          background: ${theme.color.panel};
          box-shadow: ${theme.shadow.button};
        }
      `
    }
    return css`
      background: ${theme.color.panel};
      color: ${theme.color.ink};
      border-color: ${theme.color.border};
      box-shadow: ${theme.shadow.button};
      &:hover:not(:disabled) {
        box-shadow: ${theme.shadow.cardElevated};
      }
    `
  }}
`
