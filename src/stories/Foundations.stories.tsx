import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { theme } from '@/styles/theme'

const meta: Meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontFamily: theme.font.brand, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.color.inkFaint, marginBottom: 16 }}>
      {title}
    </h2>
    {children}
  </div>
)

const SwatchRow = ({ swatches }: { swatches: Array<{ name: string; value: string }> }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
    {swatches.map(({ name, value }) => (
      <div key={name} style={{ textAlign: 'center' }}>
        <div style={{ width: 72, height: 48, borderRadius: 8, background: value, border: `1px solid ${theme.color.border}`, boxShadow: theme.shadow.card, marginBottom: 6 }} />
        <div style={{ fontSize: 10, fontFamily: theme.font.mono, color: theme.color.inkFaint }}>{name}</div>
        <div style={{ fontSize: 9, fontFamily: theme.font.mono, color: theme.color.inkFaint, marginTop: 2 }}>{value}</div>
      </div>
    ))}
  </div>
)

const GradientSwatch = ({ name, gradient }: { name: string; gradient: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ width: 96, height: 56, borderRadius: 8, background: gradient, border: `1px solid ${theme.color.border}`, boxShadow: theme.shadow.card, marginBottom: 6 }} />
    <div style={{ fontSize: 10, fontFamily: theme.font.mono, color: theme.color.inkFaint }}>{name}</div>
  </div>
)

export const Palette: Story = {
  render: () => (
    <div style={{ fontFamily: theme.font.body }}>
      <Section title="Colour — Surface">
        <SwatchRow swatches={[
          { name: 'page', value: theme.color.page },
          { name: 'panel', value: theme.color.panel },
        ]} />
      </Section>

      <Section title="Colour — Text">
        <SwatchRow swatches={[
          { name: 'ink', value: theme.color.ink },
          { name: 'inkMuted', value: theme.color.inkMuted },
          { name: 'inkFaint', value: theme.color.inkFaint },
        ]} />
      </Section>

      <Section title="Colour — Accent">
        <SwatchRow swatches={[
          { name: 'accent', value: theme.color.accent },
          { name: 'accentLight', value: theme.color.accentLight },
          { name: 'accentSoft', value: theme.color.accentSoft },
          { name: 'accentDim', value: theme.color.accentDim },
        ]} />
      </Section>

      <Section title="Colour — Status">
        <SwatchRow swatches={[
          { name: 'clearBg', value: theme.color.status.clearBg },
          { name: 'clearFg', value: theme.color.status.clearFg },
          { name: 'flaggedBg', value: theme.color.status.flaggedBg },
          { name: 'flaggedFg', value: theme.color.status.flaggedFg },
        ]} />
      </Section>

      <Section title="Colour — LCD">
        <SwatchRow swatches={[
          { name: 'lcdGreen', value: theme.color.lcdGreen },
          { name: 'lcdGreenFaint', value: theme.color.lcdGreenFaint },
        ]} />
      </Section>
    </div>
  ),
}

export const Gradients: Story = {
  render: () => (
    <div style={{ fontFamily: theme.font.body }}>
      <Section title="Named Gradient Tokens">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <GradientSwatch name="surface" gradient={theme.gradient.surface} />
          <GradientSwatch name="gaugeHousing" gradient={theme.gradient.gaugeHousing} />
          <GradientSwatch name="gaugeFace" gradient={theme.gradient.gaugeFace} />
          <GradientSwatch name="glassHighlight" gradient={theme.gradient.glassHighlight} />
          <GradientSwatch name="lcd" gradient={theme.gradient.lcd} />
          <GradientSwatch name="accentDot" gradient={theme.gradient.accentDot} />
          <GradientSwatch name="statusDotOk" gradient={theme.gradient.statusDotOk} />
          <GradientSwatch name="statusDotWatch" gradient={theme.gradient.statusDotWatch} />
        </div>
      </Section>
    </div>
  ),
}

export const SignatureDetails: Story = {
  render: () => (
    <div style={{ fontFamily: theme.font.body }}>
      <Section title="Glass Highlight — Gauge Face">
        <div style={{
          position: 'relative',
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: theme.gradient.gaugeFace,
          boxShadow: theme.shadow.gaugeFace,
        }}>
          <div style={{
            position: 'absolute',
            top: 4,
            left: 8,
            width: 52,
            height: 26,
            background: theme.gradient.glassHighlight,
            borderRadius: '50%',
            filter: 'blur(1px)',
          }} />
        </div>
      </Section>

      <Section title="LCD Readout — Glowing Digits">
        <div style={{
          display: 'inline-block',
          background: theme.gradient.lcd,
          borderRadius: 6,
          padding: '8px 16px',
          boxShadow: theme.shadow.lcd,
        }}>
          <div style={{
            fontFamily: theme.font.mono,
            fontSize: 22,
            fontWeight: 500,
            color: theme.color.lcdGreen,
            letterSpacing: '0.04em',
            textShadow: `0 0 8px ${theme.color.lcdGreenFaint}`,
            lineHeight: 1,
          }}>2/3</div>
          <div style={{
            fontSize: 9,
            color: theme.color.lcdGreenFaint,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: 4,
          }}>all clear</div>
        </div>
      </Section>

      <Section title="Brand Dot — Accent Radial">
        <div style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: theme.gradient.accentDot,
          boxShadow: `0 0 0 5px ${theme.color.accentSoft}`,
        }} />
      </Section>

      <Section title="Status Dots">
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.gradient.statusDotOk }} />
            <span style={{ fontSize: 12, color: theme.color.status.clearFg, fontWeight: 600 }}>Clear</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: theme.gradient.statusDotWatch }} />
            <span style={{ fontSize: 12, color: theme.color.status.flaggedFg, fontWeight: 600 }}>Flagged</span>
          </div>
        </div>
      </Section>

      <Section title="Layered Shadow Tokens">
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {([
            ['card', theme.shadow.card],
            ['cardElevated', theme.shadow.cardElevated],
            ['button', theme.shadow.button],
            ['frame', theme.shadow.frame],
          ] as const).map(([name, shadow]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{ width: 72, height: 48, borderRadius: 9, background: theme.color.panel, boxShadow: shadow, marginBottom: 8 }} />
              <div style={{ fontSize: 10, fontFamily: theme.font.mono, color: theme.color.inkFaint }}>{name}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontFamily: theme.font.mono, color: theme.color.inkFaint, marginBottom: 6 }}>font.brand — Space Grotesk</div>
        <div style={{ fontFamily: theme.font.brand, fontSize: 24, fontWeight: 700, letterSpacing: '0.04em', color: theme.color.ink }}>FOREMAN</div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontFamily: theme.font.mono, color: theme.color.inkFaint, marginBottom: 6 }}>font.mono — IBM Plex Mono</div>
        <div style={{ fontFamily: theme.font.mono, fontSize: 18, fontWeight: 500, color: theme.color.ink }}>2/3 all clear</div>
      </div>
      <div>
        <div style={{ fontSize: 10, fontFamily: theme.font.mono, color: theme.color.inkFaint, marginBottom: 6 }}>font.body — Inter</div>
        <div style={{ fontFamily: theme.font.body, fontSize: 13, color: theme.color.ink }}>#47 · Add dropzone resize util</div>
        <div style={{ fontFamily: theme.font.body, fontSize: 10.5, color: theme.color.inkFaint, marginTop: 4 }}>leaflet-app</div>
      </div>
    </div>
  ),
}
