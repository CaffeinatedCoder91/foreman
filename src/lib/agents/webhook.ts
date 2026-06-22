import { anthropic } from './client'

export interface SpecialistOutcome {
  verdict: 'clear' | 'flagged'
  summary: string
}

export interface AgentSessionResult {
  sessionId: string
  prNumber: number
  repoOwner: string
  repoName: string
  headSha: string
  results: {
    a11y: SpecialistOutcome
    performance: SpecialistOutcome
    security: SpecialistOutcome
    tests: SpecialistOutcome
  }
}

export function parseAgentWebhookEvent(rawBody: string, headers: Record<string, string>) {
  const verificationHeaders = { ...headers }
  if (!verificationHeaders['webhook-signature'] && verificationHeaders['x-webhook-signature']) {
    verificationHeaders['webhook-signature'] = verificationHeaders['x-webhook-signature']
  }

  return anthropic.beta.webhooks.unwrap(rawBody, {
    headers: verificationHeaders,
    key: process.env.ANTHROPIC_WEBHOOK_SIGNING_KEY,
  })
}

export async function fetchSessionResult(sessionId: string): Promise<AgentSessionResult | null> {
  const session = await anthropic.beta.sessions.retrieve(sessionId, {
    betas: ['managed-agents-2026-04-01'],
  })

  const { pr_number, repo_owner, repo_name, head_sha } = session.metadata
  const prNumber = parseInt(pr_number ?? '', 10)
  if (!prNumber || !repo_owner || !repo_name || !head_sha) return null

  let coordinatorOutput: AgentSessionResult['results'] | null = null
  for await (const event of anthropic.beta.sessions.events.list(sessionId, {
    betas: ['managed-agents-2026-04-01'],
  })) {
    if (event.type === 'agent.message') {
      const text = event.content.map((b) => b.text).join('')
      const parsed = tryParseCoordinatorOutput(text)
      if (parsed) coordinatorOutput = parsed
    }
  }

  if (!coordinatorOutput) return null
  return {
    sessionId,
    prNumber,
    repoOwner: repo_owner,
    repoName: repo_name,
    headSha: head_sha,
    results: coordinatorOutput,
  }
}

function tryParseCoordinatorOutput(text: string): AgentSessionResult['results'] | null {
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = codeBlock ? codeBlock[1] : text.match(/(\{[\s\S]*\})/)?.[1]
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw.trim())
    if (isValidCoordinatorOutput(parsed)) return parsed
  } catch {
    // ignore parse errors
  }
  return null
}

const SPECIALISTS = ['a11y', 'performance', 'security', 'tests'] as const

function isValidCoordinatorOutput(obj: unknown): obj is AgentSessionResult['results'] {
  if (!obj || typeof obj !== 'object') return false
  return SPECIALISTS.every((s) => {
    const entry = (obj as Record<string, unknown>)[s]
    if (!entry || typeof entry !== 'object') return false
    const { verdict, summary } = entry as Record<string, unknown>
    return (verdict === 'clear' || verdict === 'flagged') && typeof summary === 'string'
  })
}
