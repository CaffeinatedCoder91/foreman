import { render, cleanup } from '@testing-library/react'
import { commands } from 'vitest/browser'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import AppShell from '@/components/AppShell'
import GaugeReadout from '@/components/GaugeReadout'
import PRReviewCard from '@/components/PRReviewCard'
import LockedRoadmapRow from '@/components/LockedRoadmapRow'

function SeedDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <AppShell
        repoCount={3}
        gauge={<GaugeReadout clearCount={2} total={3} />}
        prCards={
          <>
            <PRReviewCard
              prNumber={47}
              title="Add dropzone resize util"
              repo="leaflet-app"
              status="flagged"
              flagCount={1}
              specialists={[
                { name: 'a11y', status: 'watch', noteCount: 1 },
                { name: 'perf', status: 'ok' },
                { name: 'security', status: 'ok' },
                { name: 'tests', status: 'ok' },
              ]}
            />
            <PRReviewCard
              prNumber={46}
              title="Fix Lighthouse font preload"
              repo="leaflet-app"
              status="clear"
              specialists={[
                { name: 'a11y', status: 'ok' },
                { name: 'perf', status: 'ok' },
                { name: 'security', status: 'ok' },
                { name: 'tests', status: 'ok' },
              ]}
            />
          </>
        }
        roadmap={
          <LockedRoadmapRow
            name="Repo Janitor"
            description="Nightly dependency & Lighthouse sweep"
            version="v2"
            iconType="lock"
          />
        }
      />
    </ThemeProvider>
  )
}

afterEach(() => {
  cleanup()
})

test.each([360, 390, 600])(
  'dashboard has no horizontal overflow at %ipx',
  async (width) => {
    await commands.setViewport(width, 900)
    render(<SeedDashboard />)
    await new Promise(requestAnimationFrame)

    expect(document.documentElement.clientWidth).toBe(width)
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(width)

    for (const element of document.querySelectorAll('article, section')) {
      const bounds = element.getBoundingClientRect()
      expect(bounds.left).toBeGreaterThanOrEqual(0)
      expect(bounds.right).toBeLessThanOrEqual(width)
    }
  },
)
