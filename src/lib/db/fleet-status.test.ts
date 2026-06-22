import { describe, it, expect } from 'vitest'
import { computeFleetStatus } from './fleet-status'
import type { PullRequest } from './schema'

function makePR(status: PullRequest['status']): PullRequest {
  return {
    id: crypto.randomUUID(),
    repoId: 'repo-1',
    number: 1,
    title: 'Test PR',
    status,
    headSha: 'abc123',
    openedAt: new Date(),
    lastReviewedAt: null,
    closedAt: null,
  }
}

describe('computeFleetStatus', () => {
  it('returns empty when there are no open PRs', () => {
    expect(computeFleetStatus([])).toEqual({ kind: 'empty' })
  })

  it('returns clearCount === total when all PRs are clear', () => {
    const prs = [makePR('clear'), makePR('clear'), makePR('clear')]
    expect(computeFleetStatus(prs)).toEqual({ kind: 'result', clearCount: 3, total: 3 })
  })

  it('returns clearCount === 0 when all PRs are flagged', () => {
    const prs = [makePR('flagged'), makePR('flagged')]
    expect(computeFleetStatus(prs)).toEqual({ kind: 'result', clearCount: 0, total: 2 })
  })

  it('counts only clear PRs in clearCount for a mixed set', () => {
    const prs = [makePR('clear'), makePR('flagged'), makePR('clear'), makePR('flagged')]
    expect(computeFleetStatus(prs)).toEqual({ kind: 'result', clearCount: 2, total: 4 })
  })

  it('counts a stale (mid-re-review) PR in total but not in clearCount', () => {
    // A PR that received new commits is stale until re-review finishes.
    // It must not inherit its previous clear/flagged status.
    const prs = [makePR('clear'), makePR('stale'), makePR('clear')]
    expect(computeFleetStatus(prs)).toEqual({ kind: 'result', clearCount: 2, total: 3 })
  })
})
