# 03 — Architecture

**Gate G3:** approved 2026-11-04 by human (Render + PostgreSQL + manage.py/cron).

## Context

Single-operator **lets-win**: React UI on Netlify talks to a **Django + DRF** API. All research/ML (features, GBDT, walk-forward, paper metrics) runs in **Python** inside/alongside `apps/api`. v1 focuses on XAUUSD 1H/4H signals with abstention and paper journal. Scale is personal (one user, low QPS). Split-apps monorepo with promotion-track git (ADR-0001).

## Constraints

| Constraint | Value | Source |
|---|---|---|
| Users year 1 | 1 operator | G0/G2 |
| Peak writes | low (bars ingest + occasional signals) | estimate |
| UI latency | interactive list/detail < ~500ms p95 typical | NFR comfort |
| Research jobs | batch; minutes OK | Python-first |
| Data class | personal trading ops + market data | security |
| Stack | Django/DRF + React/Vite/Netlify | G2 / stack.md |
| Live execution | out of scope until paper gate | PRD |
| API host | Render (Django + managed Postgres + cron) | G3 |
| Primary DB | PostgreSQL | ADR-0004 |
| Jobs | manage.py + cron | ADR-0005 |

## System shape

```
Operator browser
    → apps/web (React/Vite) → Netlify
         → HTTPS JSON
    → apps/api (Django/DRF) → API host
         → PostgreSQL
         → local/files or object storage (model artifacts)
         ↘ manage.py / cron: ingest · features · train · infer · validate
```

Optional later: Telegram bot process (Python) calling the same domain services.

| Component | Responsibility | Owns data? | Exit path |
|---|---|---|---|
| `apps/web` | Auth shell, signals UI, performance summary, paper journal forms | no | replace UI; keep API |
| `apps/api` HTTP | Auth, CRUD/read APIs, trigger/status for jobs | no (API only) | version OpenAPI |
| `apps/api` domain | Features, models, risk/meta, paper metrics | yes (logic) | keep as Python package |
| PostgreSQL | Bars, features metadata, signals, journal, model registry rows | yes | dump/restore |
| Artifact store | Trained model files | yes | path/URI in registry |
| Cron / scheduler | Periodic ingest + infer | no | swap for worker later |

## Options considered

| Decision | Option A | Option B | Choice | ADR |
|---|---|---|---|---|
| Git | Promotion tracks | Trunk | Promotion | 0001 (framework) |
| API framework | Django+DRF | FastAPI | Django+DRF | 0002 + product lock |
| Primary DB | PostgreSQL | SQLite | PostgreSQL (proposed) | 0004 |
| Research jobs | manage.py + cron | Celery/Redis | manage.py + cron first | 0005 |
| Auth | Django session | Netlify Identity | Django session | 0006 |
| API hosting | Render | Railway/Fly/VPS | Render | 0007 |

## Boundaries

| Module | Responsibility | Interface | Owner |
|---|---|---|---|
| `web` | Presentation | HTTP to OpenAPI | frontend track |
| `api.accounts` | Single-user auth | session/CSRF | backend |
| `api.marketdata` | OHLC ingest/storage | models + commands | backend |
| `api.features` | PIT feature build | commands + tables/files | backend |
| `api.signals` | Infer, meta, risk attach | Signal API + commands | backend |
| `api.paper` | Journal + performance aggregates | API | backend |
| `api.research` | Walk-forward / purged CV / costs | CLI only v1 | backend |

Dependency rule: `web → HTTP API → domain services → ORM/storage`. Web never imports Python. Research never depends on React.

## Data model (logical)

```text
OperatorUser 1
Instrument 1—* Bar (OHLC, timeframe, source, as_of)
Instrument 1—* FeatureRun → FeatureRow / artifact
ModelVersion *—1 FeatureRun (training)
ModelVersion 1—* Signal (ts, side|abstain, p, entry, stop, target, reason)
Signal 1—0..1 PaperEntry (fill|skip, outcome, pnl)
```

Invariants:

- Feature/signal `as_of` ≤ decision time; no future bars in inputs
- Actionable Signal requires non-abstain + risk fields
- Every Signal references `ModelVersion`
- Tenancy: single operator (no tenant_id v1)
- Retention: market bars keep; soft-delete journal optional
- Migration: expand → migrate → contract

## Contracts (initial)

| Interface | Input | Output | Errors | Auth |
|---|---|---|---|---|
| `POST /api/auth/login/` | credentials | session | 401 | public |
| `GET /api/signals/` | filters | signal list | 401 | operator |
| `GET /api/signals/{id}/` | id | detail | 404 | operator |
| `POST /api/paper/entries/` | signal_id, action, fields | entry | 400 | operator |
| `GET /api/performance/summary/` | window | metrics | 401 | operator |
| `GET /api/health/` | — | ok | — | public |

OpenAPI is the contract source; web types follow API.

## Threat model

| Threat | Mitigation | Test |
|---|---|---|
| Unauthenticated access | Session required on operator routes | API tests |
| Secret leakage | env-only keys; no broker tokens in web | review |
| Prompt/news injection (later Gemini) | treat text as data; structured outputs | review when FEAT-015 |
| Overfitting via UI | no hyperopt UI v1 | catalog |
| Look-ahead in jobs | PIT checks + sanity commands | FEAT-011 |

## Observability

- Logs: request id, user id, job name, model version; redact secrets
- Metrics: job success/fail, signal count, API 5xx, paper DD
- Traces: optional later
- Alerts: ingest/infer job failure; DD guardrail breach (operator notification)

## Failure modes

| Failure | Impact | Detection | Response |
|---|---|---|---|
| Data vendor / MT5 down | stale bars | job fail log | show last-success; no new signals |
| Infer job fail | no new signals | job status | alert; keep last good model |
| API down | UI unusable | healthcheck | redeploy previous API |
| Bad model deploy | bad signals | paper metrics / sanity | pin previous ModelVersion |

## Decisions

- [ADR-0001](04-adr/0001-promotion-tracks.md) — promotion-track git (framework)
- [ADR-0002](04-adr/0002-stack-profiles.md) — Django default / profiles (framework)
- [ADR-0003](04-adr/0003-context-packs.md) — context packs (framework)
- [ADR-0004](04-adr/0004-postgres-primary-store.md) — PostgreSQL primary store
- [ADR-0005](04-adr/0005-django-jobs-before-queue.md) — manage.py/cron before Celery
- [ADR-0006](04-adr/0006-django-session-single-user.md) — Django session auth
- [ADR-0007](04-adr/0007-api-hosting-paas.md) — API on PaaS (vendor TBD)

## Open questions

| # | Question | Blocks | Default |
|---|---|---|---|
| Q1 | Managed Postgres + API PaaS vendor? | ADR-0007 | **Locked: Render** |
| Q2 | Confirm PostgreSQL over SQLite for v1? | ADR-0004 | **Locked: PostgreSQL** |
| Q3 | Job runner: cron + manage.py vs Celery now? | ADR-0005 | **Locked: cron + manage.py** |

**Approved by:** human on 2026-11-04
