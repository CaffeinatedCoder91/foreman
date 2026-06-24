import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Card from '.'
import StatusDot from '../StatusDot'
import Tag from '../Tag'
import { theme } from '@/styles/theme'

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
        #47 · Add dropzone resize util
      </p>
      <p style={{ fontSize: 10.5, color: theme.color.inkFaint }}>leaflet-app</p>
    </Card>
  ),
}

export const PRCard: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 9,
        }}
      >
        <div>
          <p style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.35 }}>
            #47 · Add dropzone resize util
          </p>
          <p
            style={{
              fontSize: 10.5,
              color: theme.color.inkFaint,
              marginTop: 2,
            }}
          >
            leaflet-app
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Tag>
          <StatusDot variant="watch" />
          a11y · 1 note
        </Tag>
        <Tag>
          <StatusDot variant="ok" />
          perf
        </Tag>
        <Tag>
          <StatusDot variant="ok" />
          security
        </Tag>
        <Tag>
          <StatusDot variant="ok" />
          tests
        </Tag>
      </div>
    </Card>
  ),
}
