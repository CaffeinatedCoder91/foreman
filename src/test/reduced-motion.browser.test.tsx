import { render, cleanup } from '@testing-library/react'
import { commands } from 'vitest/browser'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import GaugeReadout from '@/components/GaugeReadout'

afterEach(async () => {
  cleanup()
  await commands.setReducedMotion('no-preference')
})

test('GaugeReadout responds to an actual prefers-reduced-motion toggle', async () => {
  await commands.setReducedMotion('no-preference')
  const { container } = render(
    <ThemeProvider theme={theme}>
      <GaugeReadout clearCount={2} total={3} />
    </ThemeProvider>,
  )

  const sweepGroup = container.querySelector('svg g')
  expect(sweepGroup).not.toBeNull()
  expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(false)
  expect(window.getComputedStyle(sweepGroup!).animationName).not.toBe('none')

  await commands.setReducedMotion('reduce')
  await new Promise(requestAnimationFrame)

  expect(window.matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true)
  expect(window.getComputedStyle(sweepGroup!).animationName).toBe('none')
  expect(container).toHaveTextContent('2/3')
})
