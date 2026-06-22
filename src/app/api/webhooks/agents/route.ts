import {
  getRepoByName,
  getPullRequestByNumber,
  createSpecialistResult,
  updatePullRequestStatus,
} from '../../../../lib/db/queries'
import { derivePRStatus } from '../../../../lib/db/fleet-status'
import { parseAgentWebhookEvent, fetchSessionResult } from '../../../../lib/agents'
import { buildCommentBody, postReviewComment } from '../../../../lib/github/comment'

export const runtime = 'nodejs'

const SPECIALISTS = ['a11y', 'performance', 'security', 'tests'] as const

export async function POST(request: Request): Promise<Response> {
  const rawBody = await request.text()
  const headers = Object.fromEntries(request.headers.entries())

  let eventData: ReturnType<typeof parseAgentWebhookEvent>['data']
  try {
    eventData = parseAgentWebhookEvent(rawBody, headers).data
  } catch {
    return new Response('Unauthorized', { status: 401 })
  }

  if (eventData.type !== 'session.status_idled') {
    return new Response('OK', { status: 200 })
  }

  const sessionId = eventData.id
  const result = await fetchSessionResult(sessionId)
  if (!result) return new Response('OK', { status: 200 })

  const { prNumber, repoOwner, repoName, headSha, results } = result

  const repo = await getRepoByName(repoOwner, repoName)
  if (!repo) return new Response('OK', { status: 200 })

  const pr = await getPullRequestByNumber(repo.id, prNumber)
  if (!pr) return new Response('OK', { status: 200 })

  // Stale-callback guard: PR closed or new commits pushed since this session started
  if (pr.closedAt !== null || pr.headSha !== headSha) {
    return new Response('OK', { status: 200 })
  }

  await Promise.all(
    SPECIALISTS.map((s) =>
      createSpecialistResult({
        pullRequestId: pr.id,
        specialist: s,
        verdict: results[s].verdict,
        summary: results[s].summary,
      }),
    ),
  )

  const prStatus = derivePRStatus(SPECIALISTS.map((s) => results[s].verdict))
  await updatePullRequestStatus(pr.id, prStatus, new Date())

  await postReviewComment({
    installationId: repo.githubInstallationId,
    owner: repoOwner,
    repo: repoName,
    prNumber,
    body: buildCommentBody(sessionId, results),
  })

  return new Response('OK', { status: 200 })
}
