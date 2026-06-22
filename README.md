# Foreman

Foreman is a Next.js application scaffolded for the staged build-out of database-backed GitHub and agent workflows.

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Run the main verification commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Tooling

- Next.js uses the built-in compiler with styled-components support enabled in `next.config.ts`.
- Sentry is wired through `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, and the Sentry wrapper in `next.config.ts`.
- Drizzle is configured in `drizzle.config.ts` with the schema entrypoint at `src/lib/db/schema.ts`.
- Storybook is configured under `.storybook/` and currently has no authored stories.

## Environment

Copy `.env.local.example` to `.env.local` for local secrets. The example file documents the required keys without values.

## Current Scope

The database schema is intentionally empty. GitHub webhook routes and agent calls are intentionally not implemented yet.
