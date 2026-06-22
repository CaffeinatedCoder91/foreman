import Anthropic from '@anthropic-ai/sdk'

// Singleton — one SDK instance for the lifetime of this module
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})
