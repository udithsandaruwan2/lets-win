# T-006 — PIT feature builder + sanity checks

- **Milestone:** M2
- **Feature:** FEAT-002
- **Size:** L
- **Risk:** high
- **Depends on:** T-005
- **Status:** todo

## Goal

Build point-in-time feature matrices for XAUUSD; runnable look-ahead sanity checks (time-shift / label-shuffle hooks).

## Context

- `docs/02-methodology/leakage/NOTES.md`
- PRD FR-02
- Architecture features module

## Acceptance

- [ ] Feature job uses only data ≤ as_of
- [ ] Sanity command fails loudly on injected look-ahead fixture
- [ ] Feature run versioned/recorded

## Out of scope

- Model training (T-007)
- News/Gemini features

## Verification

```bash
# manage.py build_features + sanity
```
