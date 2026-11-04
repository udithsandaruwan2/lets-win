# T-012 — Render cron + Netlify prod wiring

- **Milestone:** M5
- **Feature:** NFR-005, ADR-0007
- **Size:** M
- **Risk:** medium
- **Depends on:** T-003, T-008
- **Status:** todo

## Goal

`dev/backend`→Render staging and `dev/frontend`→Netlify preview documented/wired; cron can run ingest/infer commands.

## Acceptance

- [ ] Render service + Postgres linked via env
- [ ] Netlify env points at API origin
- [ ] At least one cron job configured (or documented dry-run)
- [ ] Rollback steps in runbook stub

## Out of scope

- GPU Kronos host
- prod promote without human ask

## Verification

```bash
# health against staging URL; Netlify preview loads login
```
