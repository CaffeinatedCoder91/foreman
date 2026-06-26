import { createElement, type ComponentType, type ReactNode } from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'

expect.extend(toHaveNoViolations)

type StoryExport = {
  args?: Record<string, unknown>
  render?: (args: Record<string, unknown>) => ReactNode
}

type StoryModule = {
  default: {
    component?: ComponentType<Record<string, unknown>>
  }
  [exportName: string]: unknown
}

const storyModules = import.meta.glob<StoryModule>(
  '../components/**/*.stories.tsx',
  { eager: true },
)

// jsdom cannot calculate rendered color contrast. Every component story is
// still scanned here for all other axe rules; contrast is checked numerically
// in contrast.test.ts and again by Storybook axe in real Chromium.
const AXE_OPTIONS = { rules: { 'color-contrast': { enabled: false } } }

for (const [modulePath, storyModule] of Object.entries(storyModules)) {
  const componentName = modulePath.split('/').at(-2)!
  for (const [storyName, storyValue] of Object.entries(storyModule)) {
    if (storyName === 'default') continue

    test(`${componentName}/${storyName} has no axe violations`, async () => {
      const story = storyValue as StoryExport
      const args = story.args ?? {}
      const content = story.render
        ? story.render(args)
        : createElement(storyModule.default.component!, args)
      const { container } = render(
        <ThemeProvider theme={theme}>{content}</ThemeProvider>,
      )
      const results = await axe(container, AXE_OPTIONS)
      expect(results).toHaveNoViolations()
    })
  }
}
