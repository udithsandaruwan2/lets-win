# T-004 — Signals list/detail API + UI (empty/fixture)

- **Milestone:** M1
- **Feature:** FEAT-008
- **Size:** M
- **Risk:** low
- **Depends on:** T-003
- **Status:** todo

## Goal

Authenticated operator sees Signals list and detail pages; API supports list/detail (fixture or empty OK).

## Context

- PRD J1, FR-05
- Architecture contracts

## Acceptance

- [ ] `GET /api/signals/` and detail endpoints exist
- [ ] UI lists signals and opens detail (entry/stop/target/confidence fields rendered even if null)
- [ ] Empty state is clear

## Out of scope

- Live infer (T-008)
- Paper journal (T-010)

## Verification

```bash
# API tests + manual UI check
```
