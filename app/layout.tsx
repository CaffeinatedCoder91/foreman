import type { Metadata } from 'next'
import './globals.css'
import StyledComponentsRegistry from '../src/app/registry'
import { spaceGrotesk, ibmPlexMono, inter } from '@/styles/fonts'

export const metadata: Metadata = {
  title: 'Foreman',
  description: 'PR Review Crew',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable}`}
    >
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
