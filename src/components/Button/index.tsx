'use client'
import { ButtonHTMLAttributes } from 'react'
import { StyledButton, type ButtonVariant } from './Button.styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const Button = ({ variant = 'secondary', children, ...rest }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} {...rest}>
      {children}
    </StyledButton>
  )
}

export default Button
