import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineBrowserCommand, playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const browserCommands = {
  setViewport: defineBrowserCommand(async ({ page, frame }, width: number, height: number) => {
    await page.setViewportSize({ width: Math.max(width + 80, 680), height: height + 80 })
    const testFrame = await frame()
    const frameElement = await testFrame.frameElement()
    await frameElement.evaluate(
      (element, viewport) => {
        const frameElement = element as HTMLElement
        frameElement.style.width = `${viewport.width}px`
        frameElement.style.height = `${viewport.height}px`
      },
      { width, height },
    )
  }),
  setReducedMotion: defineBrowserCommand(
    async ({ page }, reducedMotion: 'reduce' | 'no-preference') => {
      await page.emulateMedia({ reducedMotion })
    },
  ),
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/styles': path.resolve(dirname, 'src/styles'),
      '@/components': path.resolve(dirname, 'src/components'),
      '@/hooks': path.resolve(dirname, 'src/hooks'),
      '@/lib': path.resolve(dirname, 'src/lib'),
      '@': path.resolve(dirname, '.'),
    },
  },
  test: {
    projects: [{
      extends: true,
      test: {
        environment: 'jsdom',
        setupFiles: ['src/test/setup.ts'],
        globals: true,
        include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
        exclude: ['src/test/**/*.browser.test.tsx'],
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }, {
      extends: true,
      test: {
        name: 'browser',
        include: ['src/test/**/*.browser.test.tsx'],
        setupFiles: ['src/test/setup.ts'],
        globals: true,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          commands: browserCommands,
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
