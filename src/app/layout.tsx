import type { ReactNode } from 'react'
import StyledComponentsRegistry from './registry'
import { spaceGrotesk, ibmPlexMono, inter } from '@/styles/fonts'

export const metadata = {
  title: 'Foreman',
  description: 'PR Review Crew',
}

export default function RootLayout({ children }: { children: ReactNode }) {
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
