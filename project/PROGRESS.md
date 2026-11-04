# Progress board

> Living tracker. Update when a task status or gate changes. Mirror summary in `STATE.md`.

**Last updated:** 2026-11-04  
**Phase:** 5 Build · **Gates:** G0–G4 approved · G5/G6 pending

## Milestone M1 — Runnable skeleton

| Task | Status | Branch | Commit | Pushed |
|---|---|---|---|---|
| T-001 Django + Postgres + health | done | `feat/backend/t-001-django-postgres` | `3397aca` | yes |
| T-002 React/Vite + Netlify shell | done | `feat/frontend/t-002-react-netlify` | `cf68876` | yes |
| T-003 Session auth + CORS/CSRF + Docker stack | done* | `feat/backend/t-003-session-auth` | `2ef2b39` | yes |
| T-004 Signals list/detail stub | todo | — | — | — |

\*T-003 includes root `docker-compose.yml` for local full-stack testing.

**M1 demo:** Log in at http://127.0.0.1:5173 → Ping API.

## Milestone M2–M5 (queued)

| Task | Status |
|---|---|
| T-005 … T-012 | todo — see `05-plan/tasks/` |

## Local run (Docker)

```bash
docker compose up --build
# Web  http://127.0.0.1:5173/   (operator / operator)
# API  http://127.0.0.1:8000/api/health/
```

## How to read this

- **done** = acceptance checked in the task file  
- **Pushed** = branch on `origin`  
- Product truth: `STATE.md` · Plan: `05-plan.md` · Tasks: `05-plan/tasks/`
