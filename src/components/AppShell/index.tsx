'use client'
import type { ReactNode } from 'react'
import RegistrationMarks from '@/components/RegistrationMarks'
import {
  Shell,
  Wrap,
  Frame,
  Panel,
  PanelHeader,
  Brand,
  BrandDot,
  Subtitle,
  SectionLabel,
} from './AppShell.styles'

interface AppShellProps {
  repoCount: number
  gauge: ReactNode
  prCards: ReactNode
  roadmap: ReactNode
}

const AppShell = ({ repoCount, gauge, prCards, roadmap }: AppShellProps) => (
  <Shell>
    <Wrap>
      <Frame>
        <Panel>
          <RegistrationMarks />
          <PanelHeader>
            <div>
              <Brand>
                <BrandDot />
                FOREMAN
              </Brand>
              <Subtitle>
                PR review crew · {repoCount} repos connected
              </Subtitle>
            </div>
            {gauge}
          </PanelHeader>
          <SectionLabel>pull requests</SectionLabel>
          {prCards}
          <SectionLabel>roadmap</SectionLabel>
          {roadmap}
        </Panel>
      </Frame>
    </Wrap>
  </Shell>
)

export default AppShell
