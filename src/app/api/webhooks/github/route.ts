import {
  getRepoByName,
  getPullRequestByNumber,
  upsertPullRequestFromWebhook,
  markPullRequestClosed,
} from '../../../../lib/db/queries'
import { verifyGitHubSignature } from '../../../../lib/github/verify-signature'

export const runtime = 'nodejs'

export async function POST(request: Request): Promise<Response> {
  // Read raw body before anything else — needed for signature verification
  const rawBody = await request.text()

  // Verify HMAC signature first; reject unverified payloads immediately
  const secret = process.env.GITHUB_WEBHOOK_SECRET
  if (!secret) {
    return new Response('Webhook secret not configured', { status: 500 })
  }

  const signature = request.headers.get('x-hub-signature-256')
  if (!verifyGitHubSignature(rawBody, signature, secret)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const event = request.headers.get('x-github-event')
  if (event !== 'pull_request') {
    return new Response('OK', { status: 200 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = JSON.parse(rawBody) as any
  const { action, pull_request: pr, repository } = payload

  if (action === 'opened' || action === 'synchronize') {
    const repo = await getRepoByName(repository.owner.login, repository.name)
    if (!repo) return new Response('OK', { status: 200 })

    // Idempotency: a redelivered synchronize for the same headSha is not new work.
    const existing = await getPullRequestByNumber(repo.id, pr.number)
    if (action === 'synchronize' && existing?.headSha === pr.head.sha) {
      return new Response('OK', { status: 200 })
    }

    await upsertPullRequestFromWebhook(repo.id, {
      number: pr.number,
      title: pr.title,
      status: 'reviewing',
      headSha: pr.head.sha,
      openedAt: new Date(pr.created_at),
      lastReviewedAt: null,
      closedAt: null,
    })

    // Return immediately — agent triggering is a later session's job
    return new Response('OK', { status: 200 })
  }

  if (action === 'closed') {
    const repo = await getRepoByName(repository.owner.login, repository.name)
    if (!repo) return new Response('OK', { status: 200 })

    const existing = await getPullRequestByNumber(repo.id, pr.number)
    if (!existing) return new Response('OK', { status: 200 })

    await markPullRequestClosed(existing.id)
    return new Response('OK', { status: 200 })
  }

  return new Response('OK', { status: 200 })
}
