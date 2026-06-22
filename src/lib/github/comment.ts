import { Octokit } from '@octokit/rest'
import { createInstallationToken } from './app-auth'
import type { AgentSessionResult } from '../agents/webhook'

const VERDICT_ICON: Record<'clear' | 'flagged', string> = {
  clear: '✅',
  flagged: '⚠️',
}

const SPECIALIST_LABEL: Record<string, string> = {
  a11y: 'Accessibility (a11y)',
  performance: 'Performance',
  security: 'Security',
  tests: 'Tests',
}

export function buildCommentBody(
  sessionId: string,
  results: AgentSessionResult['results'],
): string {
  const specialists = ['a11y', 'performance', 'security', 'tests'] as const
  const rows = specialists.map((s) => {
    const { verdict, summary } = results[s]
    const label = verdict === 'clear' ? 'Clear' : 'Flagged'
    return `**${SPECIALIST_LABEL[s]}** — ${VERDICT_ICON[verdict]} ${label}\n${summary}`
  })
  return `## Foreman Review\n\n${rows.join('\n\n')}\n\n---\n*Session \`${sessionId}\`*`
}

export async function postReviewComment(params: {
  installationId: string
  owner: string
  repo: string
  prNumber: number
  body: string
}): Promise<void> {
  const token = await createInstallationToken(params.installationId)
  const octokit = new Octokit({ auth: token })
  await octokit.rest.issues.createComment({
    owner: params.owner,
    repo: params.repo,
    issue_number: params.prNumber,
    body: params.body,
  })
}
