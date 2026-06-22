import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../lib/db/queries', () => ({
  getRepoByName: vi.fn(),
  getPullRequestByNumber: vi.fn(),
  createSpecialistResult: vi.fn(),
  updatePullRequestStatus: vi.fn(),
}))

vi.mock('../../../../lib/db/fleet-status', () => ({
  derivePRStatus: vi.fn(),
}))

vi.mock('../../../../lib/agents', () => ({
  parseAgentWebhookEvent: vi.fn(),
  fetchSessionResult: vi.fn(),
}))

vi.mock('../../../../lib/github/comment', () => ({
  buildCommentBody: vi.fn(),
  postReviewComment: vi.fn(),
}))

import { POST } from './route'
import {
  getRepoByName,
  getPullRequestByNumber,
  createSpecialistResult,
  updatePullRequestStatus,
} from '../../../../lib/db/queries'
import { derivePRStatus } from '../../../../lib/db/fleet-status'
import { parseAgentWebhookEvent, fetchSessionResult } from '../../../../lib/agents'
import { buildCommentBody, postReviewComment } from '../../../../lib/github/comment'

const SESSION_ID = 'sess_abc123'

const completionEvent = {
  id: 'evt_1',
  created_at: '2026-06-22T00:00:00Z',
  type: 'event' as const,
  data: {
    id: SESSION_ID,
    type: 'session.status_idled' as const,
    organization_id: 'org_1',
    workspace_id: 'ws_1',
  },
}

const sessionResult = {
  sessionId: SESSION_ID,
  prNumber: 42,
  repoOwner: 'acme',
  repoName: 'widget',
  headSha: 'abc123',
  results: {
    a11y: { verdict: 'clear' as const, summary: 'No a11y issues.' },
    performance: { verdict: 'clear' as const, summary: 'No perf concerns.' },
    security: { verdict: 'clear' as const, summary: 'No security issues.' },
    tests: { verdict: 'clear' as const, summary: 'Coverage looks good.' },
  },
}

const dbRepo = {
  id: 'repo-uuid',
  owner: 'acme',
  name: 'widget',
  githubInstallationId: 'install-1',
  connectedAt: new Date(),
}

const dbPR = {
  id: 'pr-uuid',
  repoId: dbRepo.id,
  number: 42,
  title: 'Add dark mode',
  status: 'reviewing' as const,
  headSha: 'abc123',
  openedAt: new Date(),
  lastReviewedAt: null,
  closedAt: null,
}

function makeRequest(body = '{}'): Request {
  return new Request('http://localhost/api/webhooks/agents', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'webhook-id': 'msg_test',
      'webhook-timestamp': String(Math.floor(Date.now() / 1000)),
      'x-webhook-signature': 'v1,sig_test',
    },
    body,
  })
}

beforeEach(() => {
  vi.resetAllMocks()
  vi.mocked(parseAgentWebhookEvent).mockReturnValue(completionEvent)
  vi.mocked(fetchSessionResult).mockResolvedValue(sessionResult)
  vi.mocked(getRepoByName).mockResolvedValue(dbRepo)
  vi.mocked(getPullRequestByNumber).mockResolvedValue(dbPR)
  vi.mocked(createSpecialistResult).mockResolvedValue({} as never)
  vi.mocked(updatePullRequestStatus).mockResolvedValue(dbPR)
  vi.mocked(derivePRStatus).mockReturnValue('clear')
  vi.mocked(buildCommentBody).mockReturnValue('## Foreman Review\n\nAll clear.')
  vi.mocked(postReviewComment).mockResolvedValue(undefined)
})

describe('POST /api/webhooks/agents', () => {
  it('accepts a request with a valid webhook signature', async () => {
    const body = '{"type":"event"}'
    const res = await POST(makeRequest(body))

    expect(res.status).toBe(200)
    expect(parseAgentWebhookEvent).toHaveBeenCalledWith(
      body,
      expect.objectContaining({
        'webhook-id': 'msg_test',
        'x-webhook-signature': 'v1,sig_test',
      }),
    )
    expect(fetchSessionResult).toHaveBeenCalledWith(SESSION_ID)
  })

  it('returns 401 for an invalid webhook signature', async () => {
    vi.mocked(parseAgentWebhookEvent).mockImplementation(() => {
      throw new Error('Invalid signature')
    })
    const res = await POST(makeRequest())
    expect(res.status).toBe(401)
    expect(fetchSessionResult).not.toHaveBeenCalled()
  })

  it('returns 401 for a stale webhook payload older than five minutes', async () => {
    vi.mocked(parseAgentWebhookEvent).mockImplementation(() => {
      throw new Error('Message timestamp too old')
    })
    const res = await POST(makeRequest())

    expect(res.status).toBe(401)
    expect(fetchSessionResult).not.toHaveBeenCalled()
    expect(createSpecialistResult).not.toHaveBeenCalled()
    expect(updatePullRequestStatus).not.toHaveBeenCalled()
    expect(postReviewComment).not.toHaveBeenCalled()
  })

  it('ignores non-completion event types', async () => {
    vi.mocked(parseAgentWebhookEvent).mockReturnValue({
      ...completionEvent,
      data: { ...completionEvent.data, type: 'session.created' },
    } as never)
    const res = await POST(makeRequest())
    expect(res.status).toBe(200)
    expect(fetchSessionResult).not.toHaveBeenCalled()
  })

  it('happy path: writes all specialist results, updates PR status, and posts comment', async () => {
    const res = await POST(makeRequest())
    expect(res.status).toBe(200)

    expect(createSpecialistResult).toHaveBeenCalledTimes(4)
    expect(createSpecialistResult).toHaveBeenCalledWith(
      expect.objectContaining({ pullRequestId: dbPR.id, specialist: 'a11y', verdict: 'clear' }),
    )
    expect(createSpecialistResult).toHaveBeenCalledWith(
      expect.objectContaining({ specialist: 'security', verdict: 'clear' }),
    )

    expect(derivePRStatus).toHaveBeenCalledWith(['clear', 'clear', 'clear', 'clear'])
    expect(updatePullRequestStatus).toHaveBeenCalledWith(dbPR.id, 'clear', expect.any(Date))

    expect(postReviewComment).toHaveBeenCalledOnce()
    expect(postReviewComment).toHaveBeenCalledWith(
      expect.objectContaining({
        installationId: dbRepo.githubInstallationId,
        owner: 'acme',
        repo: 'widget',
        prNumber: 42,
      }),
    )
  })

  it('stale callback: does not write results or post comment when PR is closed', async () => {
    vi.mocked(getPullRequestByNumber).mockResolvedValue({
      ...dbPR,
      closedAt: new Date('2026-06-21T00:00:00Z'),
    })

    const res = await POST(makeRequest())

    expect(res.status).toBe(200)
    expect(createSpecialistResult).not.toHaveBeenCalled()
    expect(updatePullRequestStatus).not.toHaveBeenCalled()
    expect(postReviewComment).not.toHaveBeenCalled()
  })

  it('stale callback: does not write results or post comment when headSha has changed', async () => {
    vi.mocked(getPullRequestByNumber).mockResolvedValue({
      ...dbPR,
      headSha: 'new-sha-from-later-push',
    })

    const res = await POST(makeRequest())

    expect(res.status).toBe(200)
    expect(createSpecialistResult).not.toHaveBeenCalled()
    expect(updatePullRequestStatus).not.toHaveBeenCalled()
    expect(postReviewComment).not.toHaveBeenCalled()
  })
})
