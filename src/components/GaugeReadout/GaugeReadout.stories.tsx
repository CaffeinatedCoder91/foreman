import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import GaugeReadout from '.'

const meta: Meta<typeof GaugeReadout> = {
  title: 'Components/GaugeReadout',
  component: GaugeReadout,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof GaugeReadout>

export const AllClear: Story = {
  args: { clearCount: 3, total: 3 },
}

export const Mixed: Story = {
  args: { clearCount: 2, total: 3 },
}

export const ZeroPRs: Story = {
  args: { clearCount: 0, total: 0 },
}
