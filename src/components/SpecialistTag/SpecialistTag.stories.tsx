import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SpecialistTag from '.'

const meta: Meta<typeof SpecialistTag> = {
  title: 'Components/SpecialistTag',
  component: SpecialistTag,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof SpecialistTag>

export const Clear: Story = {
  args: { name: 'a11y', status: 'ok' },
}

export const Flagged: Story = {
  args: { name: 'a11y', status: 'watch' },
}

export const FlaggedWithNote: Story = {
  args: { name: 'a11y', status: 'watch', noteCount: 1 },
}

export const FlaggedWithNotes: Story = {
  args: { name: 'perf', status: 'watch', noteCount: 3 },
}
