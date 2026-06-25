import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import AppShell from '.'
import GaugeReadout from '@/components/GaugeReadout'
import PRReviewCard from '@/components/PRReviewCard'
import LockedRoadmapRow from '@/components/LockedRoadmapRow'

const meta: Meta<typeof AppShell> = {
  title: 'Components/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof AppShell>

const seedPRCards = (
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
    <PRReviewCard
      prNumber={12}
      title="Bump eslint config"
      repo="foreman"
      status="clear"
      specialists={[
        { name: 'a11y', status: 'ok' },
        { name: 'perf', status: 'ok' },
        { name: 'security', status: 'ok' },
        { name: 'tests', status: 'ok' },
      ]}
    />
  </>
)

const seedRoadmap = (
  <>
    <LockedRoadmapRow
      name="Repo Janitor"
      description="Nightly dependency & Lighthouse sweep"
      version="v2"
      iconType="lock"
    />
    <LockedRoadmapRow
      name="Codebase Archaeology"
      description="On-demand repo explainer"
      version="v3"
      iconType="clock"
    />
  </>
)

export const SeedData: Story = {
  args: {
    repoCount: 3,
    gauge: <GaugeReadout clearCount={2} total={3} />,
    prCards: seedPRCards,
    roadmap: seedRoadmap,
  },
}
