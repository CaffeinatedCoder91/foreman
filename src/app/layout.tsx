import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from './registry'
import { theme } from '@/styles/theme'
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
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
