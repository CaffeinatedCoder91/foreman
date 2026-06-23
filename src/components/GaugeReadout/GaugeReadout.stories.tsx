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

// Simulates prefers-reduced-motion: reduce by disabling all animations via CSS.
// The needle remains visible at 12 o'clock — it is never removed.
export const ReducedMotion: Story = {
  args: { clearCount: 2, total: 3 },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .rmo-demo, .rmo-demo * {
            animation: none !important;
            transition: none !important;
          }
        `}</style>
        <div className="rmo-demo">
          <Story />
        </div>
      </>
    ),
  ],
}
