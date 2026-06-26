import React from 'react'
import type { Preview } from '@storybook/nextjs-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/styles/theme'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'foreman',
      values: [{ name: 'foreman', value: theme.color.page }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
