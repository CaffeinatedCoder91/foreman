import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import LockedRoadmapRow from '.'

const meta: Meta<typeof LockedRoadmapRow> = {
  title: 'Components/LockedRoadmapRow',
  component: LockedRoadmapRow,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof LockedRoadmapRow>

export const RepoJanitorV2: Story = {
  args: {
    name: 'Repo Janitor',
    description: 'Nightly dependency & Lighthouse sweep',
    version: 'v2',
    iconType: 'lock',
  },
}

export const CodebaseArchaeologyV3: Story = {
  args: {
    name: 'Codebase Archaeology',
    description: 'On-demand repo explainer',
    version: 'v3',
    iconType: 'clock',
  },
}
