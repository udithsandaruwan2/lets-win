# ADR-0004 — PostgreSQL as primary store

- **Status:** accepted
- **Date:** 2026-11-04
- **Deciders:** human (G3 approved 2026-11-04)
- **Supersedes:** none

## Context

lets-win stores time-series bars, signal history, model registry metadata, and paper journal for a single operator. SQLite is simpler locally; PostgreSQL matches production time-series and concurrent job+API access better.

## Decision

Use **PostgreSQL** as the primary application database for `apps/api` in all environments that matter (dev can use Docker Postgres or a free managed instance). Avoid SQLite as the system of record for market bars and signals.

## Alternatives

| Option | Why not chosen |
|---|---|
| SQLite only | Weak for concurrent writers (ingest job + API); poorer ops path to prod |
| Separate timeseries DB (e.g. QuestDB) first | Extra ops before edge is proven |

## Consequences

**Positive**
- Same engine local→prod; solid for time-range queries and integrity

**Negative**
- Requires Docker or managed DB even for solo use

**Neutral**
- Can add specialized TS store later without changing API shape

## Revisit if

- Operator insists on zero-deps laptop-only and accepts SQLite limitations
- Bar volume or query patterns demand a dedicated TS engine

## References

- `project/03-architecture.md`
- `project/02-prd.md` FR-01, NFR-06
