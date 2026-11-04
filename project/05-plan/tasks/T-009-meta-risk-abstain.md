# T-009 — Meta abstain + stop/target/risk hooks

- **Milestone:** M4
- **Feature:** FEAT-005, FEAT-006
- **Size:** M
- **Risk:** medium
- **Depends on:** T-008
- **Status:** todo

## Goal

Meta/risk layer can abstain; actionable signals carry stop, target, and size suggestion fields.

## Acceptance

- [ ] Low-confidence / blocked cases write abstain (not actionable)
- [ ] Actionable signals include stop/target/confidence
- [ ] Daily loss / max DD hooks exist (even if simple)

## Out of scope

- News blackout calendar (FEAT-012)
- Live execution

## Verification

```bash
# unit tests for abstain rules + API field presence
```
