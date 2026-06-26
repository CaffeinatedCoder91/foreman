/// <reference types="@vitest/browser-playwright" />
/// <reference types="vite/client" />

import 'vitest/browser'

declare module 'vitest/browser' {
  interface BrowserCommands {
    setViewport(width: number, height: number): Promise<void>
    setReducedMotion(value: 'reduce' | 'no-preference'): Promise<void>
  }
}

export {}
