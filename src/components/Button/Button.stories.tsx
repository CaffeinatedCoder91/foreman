import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Button from '.'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Review PR' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'View Details' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Dismiss' },
}

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Unavailable', disabled: true },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}
