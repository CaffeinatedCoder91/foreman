import { connection } from 'next/server'
import { getAllRepos, getOpenPullRequests, getSpecialistResultsByPR } from '@/lib/db/queries'
import { computeFleetStatus } from '@/lib/db/fleet-status'
import type { SpecialistResult } from '@/lib/db/schema'
import type { PRStatus } from '@/components/PRReviewCard'
import AppShell from '@/components/AppShell'
import GaugeReadout from '@/components/GaugeReadout'
import PRReviewCard from '@/components/PRReviewCard'
import LockedRoadmapRow from '@/components/LockedRoadmapRow'

const SPECIALIST_LABEL: Record<string, string> = {
  a11y: 'a11y',
  performance: 'perf',
  security: 'security',
  tests: 'tests',
}

const SPECIALIST_ORDER = ['a11y', 'performance', 'security', 'tests']

function dbStatusToCardStatus(status: string): PRStatus {
  if (status === 'clear' || status === 'flagged' || status === 'stale') return status
  return 'stale'
}

function buildSpecialists(results: SpecialistResult[]) {
  return [...results]
    .sort(
      (a, b) =>
        SPECIALIST_ORDER.indexOf(a.specialist) - SPECIALIST_ORDER.indexOf(b.specialist),
    )
    .map((r) => ({
      name: SPECIALIST_LABEL[r.specialist] ?? r.specialist,
      status: r.verdict === 'clear' ? ('ok' as const) : ('watch' as const),
      noteCount: r.verdict === 'flagged' ? 1 : undefined,
    }))
}

const ROADMAP = [
  { name: 'Repo Janitor', description: 'Nightly dependency & Lighthouse sweep', version: 'v2', iconType: 'lock' as const },
  { name: 'Codebase Archaeology', description: 'On-demand repo explainer', version: 'v3', iconType: 'clock' as const },
]

export default async function Dashboard() {
  await connection()

  const [repos, openPRs] = await Promise.all([getAllRepos(), getOpenPullRequests()])

  const specialistsByPR = await Promise.all(
    openPRs.map((pr) =>
      getSpecialistResultsByPR(pr.id).then((results) => ({ prId: pr.id, results })),
    ),
  )

  const repoMap = new Map(repos.map((r) => [r.id, r]))
  const fleet = computeFleetStatus(openPRs)
  const clearCount = fleet.kind === 'result' ? fleet.clearCount : 0
  const total = fleet.kind === 'result' ? fleet.total : 0

  const prCards = openPRs.map((pr) => {
    const repo = repoMap.get(pr.repoId)
    const results = specialistsByPR.find((s) => s.prId === pr.id)?.results ?? []
    const flagCount = results.filter((r) => r.verdict === 'flagged').length
    return (
      <PRReviewCard
        key={pr.id}
        prNumber={pr.number}
        title={pr.title}
        repo={repo?.name ?? ''}
        status={dbStatusToCardStatus(pr.status)}
        flagCount={flagCount}
        specialists={buildSpecialists(results)}
        stale={pr.status === 'stale'}
      />
    )
  })

  const roadmap = ROADMAP.map((row) => (
    <LockedRoadmapRow key={row.name} {...row} />
  ))

  return (
    <AppShell
      repoCount={repos.length}
      gauge={<GaugeReadout clearCount={clearCount} total={total} />}
      prCards={prCards}
      roadmap={roadmap}
    />
  )
}
