import { eq, isNull, and, ne } from 'drizzle-orm'
import { db } from './client'
import { repos, pullRequests, specialistResults } from './schema'
import type {
  Repo,
  PullRequest,
  SpecialistResult,
  NewRepo,
  NewPullRequest,
  NewSpecialistResult,
} from './schema'

export type { Repo, PullRequest, SpecialistResult }

// ── Repos ──────────────────────────────────────────────────────────────────

export async function getAllRepos(): Promise<Repo[]> {
  return db.select().from(repos)
}

export async function getRepoByName(owner: string, name: string): Promise<Repo | undefined> {
  const [repo] = await db
    .select()
    .from(repos)
    .where(and(eq(repos.owner, owner), eq(repos.name, name)))
  return repo
}

export async function createRepo(data: NewRepo): Promise<Repo> {
  const [repo] = await db.insert(repos).values(data).returning()
  return repo
}

// ── Pull Requests ──────────────────────────────────────────────────────────

export async function getOpenPullRequests(): Promise<PullRequest[]> {
  return db.select().from(pullRequests).where(isNull(pullRequests.closedAt))
}

export async function getPullRequestsByRepo(repoId: string): Promise<PullRequest[]> {
  return db.select().from(pullRequests).where(eq(pullRequests.repoId, repoId))
}

export async function getPullRequest(id: string): Promise<PullRequest | undefined> {
  const [pr] = await db.select().from(pullRequests).where(eq(pullRequests.id, id))
  return pr
}

export async function createPullRequest(data: NewPullRequest): Promise<PullRequest> {
  const [pr] = await db.insert(pullRequests).values(data).returning()
  return pr
}

export async function updatePullRequestStatus(
  id: string,
  status: PullRequest['status'],
  lastReviewedAt?: Date,
): Promise<PullRequest> {
  const [pr] = await db
    .update(pullRequests)
    .set({ status, ...(lastReviewedAt ? { lastReviewedAt } : {}) })
    .where(eq(pullRequests.id, id))
    .returning()
  return pr
}

export async function setPullRequestStale(id: string, headSha: string): Promise<PullRequest> {
  const [pr] = await db
    .update(pullRequests)
    .set({ status: 'stale', headSha })
    .where(eq(pullRequests.id, id))
    .returning()
  return pr
}

export async function getPullRequestByNumber(
  repoId: string,
  number: number,
): Promise<PullRequest | undefined> {
  const [pr] = await db
    .select()
    .from(pullRequests)
    .where(and(eq(pullRequests.repoId, repoId), eq(pullRequests.number, number)))
  return pr
}

export async function upsertPullRequestFromWebhook(
  repoId: string,
  data: Omit<NewPullRequest, 'repoId'>,
): Promise<PullRequest | undefined> {
  const [pr] = await db
    .insert(pullRequests)
    .values({ repoId, ...data })
    .onConflictDoUpdate({
      target: [pullRequests.repoId, pullRequests.number],
      set: {
        headSha: data.headSha,
        status: data.status,
        title: data.title,
      },
      setWhere: ne(pullRequests.headSha, data.headSha),
    })
    .returning()
  return pr
}

export async function markPullRequestClosed(id: string): Promise<PullRequest> {
  const [pr] = await db
    .update(pullRequests)
    .set({ closedAt: new Date() })
    .where(eq(pullRequests.id, id))
    .returning()
  return pr
}

// ── Specialist Results ─────────────────────────────────────────────────────

export async function createSpecialistResult(
  data: NewSpecialistResult,
): Promise<SpecialistResult> {
  const [result] = await db.insert(specialistResults).values(data).returning()
  return result
}

export async function getSpecialistResultsByPR(
  pullRequestId: string,
): Promise<SpecialistResult[]> {
  return db
    .select()
    .from(specialistResults)
    .where(eq(specialistResults.pullRequestId, pullRequestId))
}
