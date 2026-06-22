import React from 'react'
import type { Preview } from '@storybook/nextjs-vite'
import { ThemeProvider } from 'styled-components'

const placeholderTheme = {}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'foreman',
      values: [{ name: 'foreman', value: '#D7DADF' }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={placeholderTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
