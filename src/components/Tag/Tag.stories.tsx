import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Tag from '.'
import StatusDot from '../StatusDot'

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Tag>

export const WithDotOk: Story = {
  render: () => (
    <Tag>
      <StatusDot variant="ok" />
      a11y
    </Tag>
  ),
}

export const WithDotWatch: Story = {
  render: () => (
    <Tag>
      <StatusDot variant="watch" />
      a11y · 1 note
    </Tag>
  ),
}

export const TagRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      <Tag><StatusDot variant="watch" />a11y · 1 note</Tag>
      <Tag><StatusDot variant="ok" />perf</Tag>
      <Tag><StatusDot variant="ok" />security</Tag>
      <Tag><StatusDot variant="ok" />tests</Tag>
    </div>
  ),
}
