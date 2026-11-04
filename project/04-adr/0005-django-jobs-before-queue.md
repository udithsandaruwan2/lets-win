# ADR-0005 — Django management commands + cron before a queue

- **Status:** accepted
- **Date:** 2026-11-04
- **Deciders:** human (G3 approved 2026-11-04)
- **Supersedes:** none

## Context

Ingest, feature build, train, infer, and walk-forward validation are batch Python jobs. A queue (Celery/RQ + Redis) adds moving parts before any edge is proven. Product lock is Python-first and personal scale.

## Decision

Implement research/ops jobs as **Django management commands** (and plain Python modules under `apps/api`) invoked by **cron** or manual CLI for v1. Defer Celery/Redis until jobs need retries, concurrency, or multi-host workers.

## Alternatives

| Option | Why not chosen |
|---|---|
| Celery + Redis now | Ops cost without proven need |
| Frontend-triggered long HTTP requests | Timeouts; mixes UI with batch work |

## Consequences

**Positive**
- Simple mental model; easy to run locally; fits FR-09 CLI validation

**Negative**
- No fancy retry/dashboard until later; overlapping cron must be guarded (locks)

**Neutral**
- Domain services stay queue-agnostic so a worker can wrap them later

## Revisit if

- Jobs exceed cron comfort (many assets, frequent retrain)
- Need parallel infer across symbols with backpressure

## References

- `project/03-architecture.md`
- FEAT-001…011 in `02-product-catalog.md`
