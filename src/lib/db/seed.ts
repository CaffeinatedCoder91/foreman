/**
 * Seeds fixture data for local development and Storybook.
 * Run with: pnpm db:seed
 */
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import { repos, pullRequests, specialistResults } from './schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

async function seed() {
  console.log('Seeding database...')

  // ── Repos ──────────────────────────────────────────────────────────────

  const [leaflet, foreman, oldPortfolio] = await db
    .insert(repos)
    .values([
      {
        owner: 'CaffeinatedCoder91',
        name: 'leaflet-app',
        githubInstallationId: 'install-001',
      },
      {
        owner: 'CaffeinatedCoder91',
        name: 'foreman',
        githubInstallationId: 'install-002',
      },
      {
        owner: 'CaffeinatedCoder91',
        name: 'old-portfolio',
        githubInstallationId: 'install-003',
      },
    ])
    .returning()

  console.log(`Created repos: ${leaflet.name}, ${foreman.name}, ${oldPortfolio.name}`)

  // ── Pull Requests ──────────────────────────────────────────────────────

  const now = new Date()

  const [pr47, pr46, pr12] = await db
    .insert(pullRequests)
    .values([
      {
        repoId: leaflet.id,
        number: 47,
        title: 'Add dropzone resize util',
        status: 'flagged' as const,
        headSha: 'sha-pr47-abc',
        openedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        lastReviewedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
      {
        repoId: leaflet.id,
        number: 46,
        title: 'Fix Lighthouse font preload',
        status: 'clear' as const,
        headSha: 'sha-pr46-def',
        openedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        lastReviewedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        repoId: foreman.id,
        number: 12,
        title: 'Bump eslint config',
        status: 'clear' as const,
        headSha: 'sha-pr12-ghi',
        openedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
        lastReviewedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      },
    ])
    .returning()

  console.log(`Created PRs: #${pr47.number}, #${pr46.number}, #${pr12.number}`)

  // ── Specialist Results ─────────────────────────────────────────────────

  await db.insert(specialistResults).values([
    // PR #47 — a11y flagged, others clear
    {
      pullRequestId: pr47.id,
      specialist: 'a11y' as const,
      verdict: 'flagged' as const,
      summary:
        'Dropzone lacks an accessible label; keyboard users cannot activate the resize handle.',
    },
    {
      pullRequestId: pr47.id,
      specialist: 'performance' as const,
      verdict: 'clear' as const,
      summary: 'No measurable bundle size increase; resize logic is lazily imported.',
    },
    {
      pullRequestId: pr47.id,
      specialist: 'security' as const,
      verdict: 'clear' as const,
      summary: 'No new endpoints or user input paths introduced.',
    },
    {
      pullRequestId: pr47.id,
      specialist: 'tests' as const,
      verdict: 'clear' as const,
      summary: 'Resize util has unit tests covering edge cases.',
    },

    // PR #46 — all clear
    {
      pullRequestId: pr46.id,
      specialist: 'a11y' as const,
      verdict: 'clear' as const,
      summary: 'No UI changes; font preload update has no accessibility impact.',
    },
    {
      pullRequestId: pr46.id,
      specialist: 'performance' as const,
      verdict: 'clear' as const,
      summary: 'Font preload order improved; eliminates render-blocking.',
    },
    {
      pullRequestId: pr46.id,
      specialist: 'security' as const,
      verdict: 'clear' as const,
      summary: 'Static asset configuration change; no security surface.',
    },
    {
      pullRequestId: pr46.id,
      specialist: 'tests' as const,
      verdict: 'clear' as const,
      summary: 'Lighthouse config change is covered by the CI lhci run.',
    },

    // PR #12 — all clear
    {
      pullRequestId: pr12.id,
      specialist: 'a11y' as const,
      verdict: 'clear' as const,
      summary: 'ESLint config bump adds no UI changes.',
    },
    {
      pullRequestId: pr12.id,
      specialist: 'performance' as const,
      verdict: 'clear' as const,
      summary: 'Dev-dependency only; zero runtime impact.',
    },
    {
      pullRequestId: pr12.id,
      specialist: 'security' as const,
      verdict: 'clear' as const,
      summary: 'No new rules enable unsafe patterns.',
    },
    {
      pullRequestId: pr12.id,
      specialist: 'tests' as const,
      verdict: 'clear' as const,
      summary: 'Config change; no test coverage required.',
    },
  ])

  console.log('Created specialist results.')
  console.log('Seed complete.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
