# T-001 — Bootstrap Django API + Postgres locally

- **Milestone:** M1
- **Feature:** FEAT-001 (foundation), FEAT-007
- **Size:** M
- **Risk:** low
- **Depends on:** none
- **Status:** done

## Goal

`apps/api` runs Django+DRF against local PostgreSQL; `/api/health/` returns ok.

## Context

- `project/03-architecture.md`, ADR-0004, ADR-0002
- `.agents/profiles/api-python-django.md`
- `apps/api/AGENTS.md`

## Acceptance

- [x] Django project boots with `uv`/venv per nested AGENTS
- [x] Postgres connected via env
- [x] Health endpoint green
- [x] Migrations apply cleanly

## Out of scope

- Render deploy (T-012)
- Signal domain models beyond minimal stubs

## Verification

```bash
# from apps/api — follow nested AGENTS.md
# migrate + runserver + curl health
```
