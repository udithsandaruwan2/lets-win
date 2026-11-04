# T-008 — Wire infer → Signal records + live UI

- **Milestone:** M3
- **Feature:** FEAT-008, FEAT-004
- **Size:** M
- **Risk:** medium
- **Depends on:** T-004, T-007
- **Status:** todo

## Goal

Infer writes Signal rows with model version; UI shows real DB signals.

## Context

- Architecture Signal model
- PRD FR-03, FR-05, NFR-006

## Acceptance

- [ ] Every signal references ModelVersion
- [ ] UI no longer depends on fixtures for happy path
- [ ] Abstain vs actionable distinguishable in API

## Out of scope

- Paper journal
- Telegram

## Verification

```bash
# infer → GET /api/signals/ → UI refresh
```
