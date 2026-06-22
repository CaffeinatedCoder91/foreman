import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createHmac } from 'crypto'

// Mock the db queries module — hoisted before any imports
vi.mock('../../../../lib/db/queries', () => ({
  getRepoByName: vi.fn(),
  getPullRequestByNumber: vi.fn(),
  upsertPullRequestFromWebhook: vi.fn(),
  markPullRequestClosed: vi.fn(),
}))

import { POST } from './route'
import {
  getRepoByName,
  getPullRequestByNumber,
  upsertPullRequestFromWebhook,
  markPullRequestClosed,
} from '../../../../lib/db/queries'

const SECRET = 'test-webhook-secret'

function sign(body: string, secret = SECRET): string {
  return `sha256=${createHmac('sha256', secret).update(body, 'utf8').digest('hex')}`
}

function makeRequest(payload: object, options: { signature?: string; event?: string } = {}): Request {
  const body = JSON.stringify(payload)
  return new Request('http://localhost/api/webhooks/github', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-github-event': options.event ?? 'pull_request',
      'x-hub-signature-256': options.signature ?? sign(body),
    },
    body,
  })
}

const basePR = {
  number: 42,
  title: 'Test PR',
  head: { sha: 'abc123' },
  created_at: new Date().toISOString(),
}

const baseRepo = { owner: { login: 'acme' }, name: 'widget' }

const dbRepo = {
  id: 'repo-uuid',
  owner: 'acme',
  name: 'widget',
  githubInstallationId: 'x',
  connectedAt: new Date(),
}

const dbPR = {
  id: 'pr-uuid',
  repoId: dbRepo.id,
  number: basePR.number,
  title: basePR.title,
  status: 'clear' as const,
  headSha: 'old-sha',
  openedAt: new Date(),
  lastReviewedAt: new Date(),
  closedAt: null,
}

beforeEach(() => {
  // Reset call history AND implementations between tests
  vi.resetAllMocks()
  vi.stubEnv('GITHUB_WEBHOOK_SECRET', SECRET)
  // Defaults: repo found, no existing PR, writes succeed
  vi.mocked(getRepoByName).mockResolvedValue(dbRepo)
  vi.mocked(getPullRequestByNumber).mockResolvedValue(undefined)
  vi.mocked(upsertPullRequestFromWebhook).mockResolvedValue({} as never)
  vi.mocked(markPullRequestClosed).mockResolvedValue({} as never)
})

describe('POST /api/webhooks/github', () => {
  it('accepts a request with a valid signature', async () => {
    const req = makeRequest({ action: 'opened', pull_request: basePR, repository: baseRepo })
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(upsertPullRequestFromWebhook).toHaveBeenCalledOnce()
  })

  it('rejects a request with an invalid signature with 401 and makes no DB calls', async () => {
    const req = makeRequest(
      { action: 'opened', pull_request: basePR, repository: baseRepo },
      { signature: 'sha256=badhash' },
    )
    const res = await POST(req)
    expect(res.status).toBe(401)
    expect(getRepoByName).not.toHaveBeenCalled()
    expect(upsertPullRequestFromWebhook).not.toHaveBeenCalled()
  })

  it('fails closed when the webhook secret is not configured', async () => {
    vi.stubEnv('GITHUB_WEBHOOK_SECRET', '')
    const payload = { action: 'opened', pull_request: basePR, repository: baseRepo }
    const body = JSON.stringify(payload)
    const req = makeRequest(payload, { signature: sign(body, '') })

    const res = await POST(req)

    expect(res.status).toBe(500)
    expect(getRepoByName).not.toHaveBeenCalled()
    expect(upsertPullRequestFromWebhook).not.toHaveBeenCalled()
  })

  it('skips processing a duplicate synchronize event for the same headSha', async () => {
    // PR is already in 'reviewing' state with this exact headSha
    vi.mocked(getPullRequestByNumber).mockResolvedValue({
      ...dbPR,
      status: 'reviewing',
      headSha: basePR.head.sha,
    })

    const req = makeRequest({
      action: 'synchronize',
      pull_request: basePR,
      repository: baseRepo,
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    // Idempotency: must not re-upsert
    expect(upsertPullRequestFromWebhook).not.toHaveBeenCalled()
  })

  it('skips a duplicate synchronize event for an already reviewed headSha', async () => {
    vi.mocked(getPullRequestByNumber).mockResolvedValue({
      ...dbPR,
      status: 'clear',
      headSha: basePR.head.sha,
    })

    const req = makeRequest({
      action: 'synchronize',
      pull_request: basePR,
      repository: baseRepo,
    })
    const res = await POST(req)

    expect(res.status).toBe(200)
    expect(upsertPullRequestFromWebhook).not.toHaveBeenCalled()
  })

  it('sets closedAt on a closed event', async () => {
    vi.mocked(getPullRequestByNumber).mockResolvedValue(dbPR)

    const req = makeRequest({ action: 'closed', pull_request: basePR, repository: baseRepo })
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(markPullRequestClosed).toHaveBeenCalledWith(dbPR.id)
    expect(upsertPullRequestFromWebhook).not.toHaveBeenCalled()
  })
})
