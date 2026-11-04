# T-011 — Walk-forward / purged validation + costs

- **Milestone:** M5
- **Feature:** FEAT-011
- **Size:** L
- **Risk:** high
- **Depends on:** T-007
- **Status:** todo

## Goal

Python management command runs walk-forward / purged validation with realistic costs; report exportable.

## Acceptance

- [ ] Contiguous folds; purge/embargo supported
- [ ] Cost model applied (spread/commission/slippage params)
- [ ] Report includes expectancy, coverage, hit rate, DD

## Out of scope

- UI backtest studio
- Claiming production edge without paper window

## Verification

```bash
# manage.py validate_walk_forward --help && sample run on fixture
```
