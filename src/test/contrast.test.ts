import { theme } from '@/styles/theme'

function channel(value: number): number {
  const normalized = value / 255
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number {
  const [red, green, blue] = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((value) => channel(Number.parseInt(value, 16)))
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrast(foreground: string, background: string): number {
  const foregroundLuminance = luminance(foreground)
  const backgroundLuminance = luminance(background)
  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)
  return (lighter + 0.05) / (darker + 0.05)
}

function composite(foreground: string, background: string, alpha: number): string {
  const foregroundChannels = foreground.slice(1).match(/.{2}/g)!.map((value) => Number.parseInt(value, 16))
  const backgroundChannels = background.slice(1).match(/.{2}/g)!.map((value) => Number.parseInt(value, 16))
  const channels = foregroundChannels.map((value, index) =>
    Math.round(value * alpha + backgroundChannels[index] * (1 - alpha)),
  )
  return `#${channels.map((value) => value.toString(16).padStart(2, '0')).join('')}`
}

const DASHBOARD_SURFACES = [
  theme.color.page,
  theme.color.panel,
  '#E9EBEE',
  '#FAFBFC',
  '#F6F7F9',
] as const

test.each([
  ['inkMuted', theme.color.inkMuted],
  ['inkFaint', theme.color.inkFaint],
] as const)('%s meets WCAG AA small-text contrast on dashboard surfaces', (_, color) => {
  for (const surface of DASHBOARD_SURFACES) {
    expect(contrast(color, surface)).toBeGreaterThanOrEqual(4.5)
  }
})

test('status.flaggedFg meets WCAG AA on every tinted badge surface', () => {
  for (const surface of [theme.color.panel, '#FAFBFC', '#F6F7F9']) {
    const tintedSurface = composite('#B8821F', surface, 0.14)
    expect(contrast(theme.color.status.flaggedFg, tintedSurface)).toBeGreaterThanOrEqual(4.5)
  }
})
