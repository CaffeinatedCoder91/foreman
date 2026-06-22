import type { PullRequest } from './schema'

export type FleetStatus =
  | { kind: 'empty' }
  | { kind: 'result'; clearCount: number; total: number }

/**
 * Single source of truth for fleet/PR status.
 * - stale PRs count toward total but not clearCount
 * - closed PRs must be excluded by the caller (pass only open PRs)
 * - zero open PRs returns the explicit empty state, not "0/0 all clear"
 */
export function computeFleetStatus(prs: PullRequest[]): FleetStatus {
  if (prs.length === 0) return { kind: 'empty' }
  const clearCount = prs.filter((pr) => pr.status === 'clear').length
  return { kind: 'result', clearCount, total: prs.length }
}
