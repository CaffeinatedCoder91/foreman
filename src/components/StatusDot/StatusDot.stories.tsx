import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StatusDot from '.'

const meta: Meta<typeof StatusDot> = {
  title: 'Primitives/StatusDot',
  component: StatusDot,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['ok', 'watch'] },
  },
}

export default meta
type Story = StoryObj<typeof StatusDot>

export const Ok: Story = {
  args: { variant: 'ok' },
}

export const Watch: Story = {
  args: { variant: 'watch' },
}

export const BothVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
        <StatusDot variant="ok" /> Clear
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
        <StatusDot variant="watch" /> Flagged
      </span>
    </div>
  ),
}
