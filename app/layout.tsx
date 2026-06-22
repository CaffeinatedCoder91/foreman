import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '../src/app/registry'

export const metadata: Metadata = {
  title: 'Foreman',
  description: 'Foreman v1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
