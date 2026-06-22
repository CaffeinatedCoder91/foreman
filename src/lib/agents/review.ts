import { anthropic } from './client'

export interface PRReviewContext {
  prNumber: number
  repoOwner: string
  repoName: string
  prTitle: string
  headSha: string
}

/**
 * Creates a Managed Agents session for a PR review and sends the initial
 * context message. Returns the session ID for tracking.
 *
 * Fire-and-forget from the caller's perspective — never await session
 * completion here. Results arrive via the agents webhook (Session 4).
 */
export async function triggerReview(ctx: PRReviewContext): Promise<string> {
  const session = await anthropic.beta.sessions.create({
    agent: process.env.ANTHROPIC_COORDINATOR_AGENT_ID!,
    environment_id: process.env.ANTHROPIC_ENVIRONMENT_ID!,
    title: `PR #${ctx.prNumber} — ${ctx.repoOwner}/${ctx.repoName}`,
    metadata: {
      pr_number: String(ctx.prNumber),
      repo_owner: ctx.repoOwner,
      repo_name: ctx.repoName,
      head_sha: ctx.headSha,
    },
    betas: ['managed-agents-2026-04-01'],
  })

  await anthropic.beta.sessions.events.send(session.id, {
    events: [
      {
        type: 'user.message',
        content: [
          {
            type: 'text',
            text: buildReviewPrompt(ctx),
          },
        ],
      },
    ],
    betas: ['managed-agents-2026-04-01'],
  })

  return session.id
}

function buildReviewPrompt(ctx: PRReviewContext): string {
  return `\
Review the following pull request and return specialist verdicts.

Repository: ${ctx.repoOwner}/${ctx.repoName}
PR #${ctx.prNumber}: ${ctx.prTitle}
Head SHA: ${ctx.headSha}

Delegate to the a11y, performance, security, and tests specialists in parallel. \
Collect their verdicts and summaries, then return the structured JSON result.`
}
