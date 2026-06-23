import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { theme } from '@/styles/theme'
import RegistrationMarks from '.'

const meta: Meta = {
  title: 'Components/RegistrationMarks',
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 240,
        height: 120,
        background: theme.color.panel,
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.color.border}`,
      }}
    >
      <RegistrationMarks />
    </div>
  ),
}
