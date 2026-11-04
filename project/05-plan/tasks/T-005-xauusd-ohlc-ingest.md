# T-005 — XAUUSD OHLC ingest (1H/4H)

- **Milestone:** M2
- **Feature:** FEAT-001
- **Size:** M
- **Risk:** medium
- **Depends on:** T-001
- **Status:** todo

## Goal

Store XAUUSD 1H and/or 4H bars in Postgres via a management command; source from spike S-001 (default: MT5 export / CSV first).

## Context

- ADR-0005
- Discovery E1; architecture Bar model
- Spike S-001

## Acceptance

- [ ] Instrument + Bar models migrated
- [ ] Idempotent ingest command for 1H and 4H
- [ ] Query by time range works
- [ ] Source and timestamps documented (PIT notes)

## Out of scope

- Crypto symbols
- Feature engineering (T-006)

## Verification

```bash
# manage.py ingest + SQL/count checks
```
