import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PRReviewCard from '.'

const meta: Meta<typeof PRReviewCard> = {
  title: 'Components/PRReviewCard',
  component: PRReviewCard,
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof PRReviewCard>

const ALL_CLEAR_SPECIALISTS = [
  { name: 'a11y', status: 'ok' as const },
  { name: 'perf', status: 'ok' as const },
  { name: 'security', status: 'ok' as const },
  { name: 'tests', status: 'ok' as const },
]

export const AllClear: Story = {
  args: {
    prNumber: 46,
    title: 'Fix Lighthouse font preload',
    repo: 'leaflet-app',
    status: 'clear',
    flagCount: 0,
    specialists: ALL_CLEAR_SPECIALISTS,
  },
}

export const OneFlag: Story = {
  args: {
    prNumber: 47,
    title: 'Add dropzone resize util',
    repo: 'leaflet-app',
    status: 'flagged',
    flagCount: 1,
    specialists: [
      { name: 'a11y', status: 'watch', noteCount: 1 },
      { name: 'perf', status: 'ok' },
      { name: 'security', status: 'ok' },
      { name: 'tests', status: 'ok' },
    ],
  },
}

export const TwoFlags: Story = {
  args: {
    prNumber: 52,
    title: 'Migrate image loader to next/image',
    repo: 'foreman',
    status: 'flagged',
    flagCount: 2,
    specialists: [
      { name: 'a11y', status: 'watch', noteCount: 2 },
      { name: 'perf', status: 'watch', noteCount: 1 },
      { name: 'security', status: 'ok' },
      { name: 'tests', status: 'ok' },
    ],
  },
}

export const ThreeFlags: Story = {
  args: {
    prNumber: 61,
    title: 'Replace fetch with axios across all services',
    repo: 'leaflet-app',
    status: 'flagged',
    flagCount: 3,
    specialists: [
      { name: 'a11y', status: 'watch', noteCount: 1 },
      { name: 'perf', status: 'watch', noteCount: 3 },
      { name: 'security', status: 'watch', noteCount: 2 },
      { name: 'tests', status: 'ok' },
    ],
  },
}

export const Stale: Story = {
  args: {
    prNumber: 47,
    title: 'Add dropzone resize util',
    repo: 'leaflet-app',
    status: 'stale',
    flagCount: 0,
    stale: true,
    specialists: ALL_CLEAR_SPECIALISTS,
  },
}

// Verifies that 4 tags wrap cleanly at 360 px — no overflow.
export const TagWrapAt360px: Story = {
  args: {
    prNumber: 47,
    title: 'Add dropzone resize util',
    repo: 'leaflet-app',
    status: 'flagged',
    flagCount: 1,
    specialists: [
      { name: 'a11y', status: 'watch', noteCount: 1 },
      { name: 'perf', status: 'ok' },
      { name: 'security', status: 'ok' },
      { name: 'tests', status: 'ok' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}
