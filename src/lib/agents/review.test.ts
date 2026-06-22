import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockSessionCreate = vi.hoisted(() => vi.fn())
const mockEventSend = vi.hoisted(() => vi.fn())

vi.mock('@anthropic-ai/sdk', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: vi.fn(function (this: any) {
    this.beta = {
      sessions: {
        create: mockSessionCreate,
        events: { send: mockEventSend },
      },
    }
  }),
}))

import { triggerReview, type PRReviewContext } from './review'

const ctx: PRReviewContext = {
  prNumber: 7,
  repoOwner: 'acme',
  repoName: 'widget',
  prTitle: 'Add dark mode',
  headSha: 'deadbeef',
}

beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv('ANTHROPIC_COORDINATOR_AGENT_ID', 'agent-coord-id')
  vi.stubEnv('ANTHROPIC_ENVIRONMENT_ID', 'env-id')
  mockSessionCreate.mockResolvedValue({ id: 'session-abc' })
  mockEventSend.mockResolvedValue({})
})

describe('triggerReview', () => {
  it('creates a Managed Agents session with the correct params', async () => {
    await triggerReview(ctx)

    expect(mockSessionCreate).toHaveBeenCalledOnce()
    expect(mockSessionCreate).toHaveBeenCalledWith({
      agent: 'agent-coord-id',
      environment_id: 'env-id',
      title: 'PR #7 — acme/widget',
      metadata: {
        pr_number: '7',
        repo_owner: 'acme',
        repo_name: 'widget',
        head_sha: 'deadbeef',
      },
      betas: ['managed-agents-2026-04-01'],
    })
  })

  it('sends the initial user message to the session', async () => {
    await triggerReview(ctx)

    expect(mockEventSend).toHaveBeenCalledOnce()
    const [sessionId, params] = mockEventSend.mock.calls[0]
    expect(sessionId).toBe('session-abc')
    expect(params.betas).toEqual(['managed-agents-2026-04-01'])
    expect(params.events).toHaveLength(1)
    expect(params.events[0].type).toBe('user.message')
    const text: string = params.events[0].content[0].text
    expect(text).toContain('acme/widget')
    expect(text).toContain('PR #7')
    expect(text).toContain('deadbeef')
  })

  it('returns the session id', async () => {
    const id = await triggerReview(ctx)
    expect(id).toBe('session-abc')
  })
})
