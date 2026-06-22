import { pgTable, pgEnum, text, integer, timestamp, unique } from 'drizzle-orm/pg-core'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export const prStatusEnum = pgEnum('pr_status', ['reviewing', 'clear', 'flagged', 'stale'])
export const specialistTypeEnum = pgEnum('specialist_type', ['a11y', 'performance', 'security', 'tests'])
export const verdictEnum = pgEnum('verdict', ['clear', 'flagged'])

export const repos = pgTable('repos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  owner: text('owner').notNull(),
  name: text('name').notNull(),
  githubInstallationId: text('github_installation_id').notNull(),
  connectedAt: timestamp('connected_at', { withTimezone: true }).notNull().defaultNow(),
})

export const pullRequests = pgTable(
  'pull_requests',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    repoId: text('repo_id')
      .notNull()
      .references(() => repos.id),
    number: integer('number').notNull(),
    title: text('title').notNull(),
    status: prStatusEnum('status').notNull(),
    headSha: text('head_sha').notNull(),
    openedAt: timestamp('opened_at', { withTimezone: true }).notNull(),
    lastReviewedAt: timestamp('last_reviewed_at', { withTimezone: true }),
    closedAt: timestamp('closed_at', { withTimezone: true }),
  },
  (table) => [unique('pull_requests_repo_number_unique').on(table.repoId, table.number)],
)

export const specialistResults = pgTable('specialist_results', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  pullRequestId: text('pull_request_id')
    .notNull()
    .references(() => pullRequests.id),
  specialist: specialistTypeEnum('specialist').notNull(),
  verdict: verdictEnum('verdict').notNull(),
  summary: text('summary').notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }).notNull().defaultNow(),
})

export type Repo = InferSelectModel<typeof repos>
export type PullRequest = InferSelectModel<typeof pullRequests>
export type SpecialistResult = InferSelectModel<typeof specialistResults>

export type NewRepo = InferInsertModel<typeof repos>
export type NewPullRequest = InferInsertModel<typeof pullRequests>
export type NewSpecialistResult = InferInsertModel<typeof specialistResults>
