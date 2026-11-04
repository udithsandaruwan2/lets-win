# T-007 — GBDT train/infer + model registry

- **Milestone:** M3
- **Feature:** FEAT-003, FEAT-004
- **Size:** L
- **Risk:** high
- **Depends on:** T-006
- **Status:** todo

## Goal

Train LightGBM/XGBoost/CatBoost baseline; store ModelVersion + artifact; run infer producing probabilities/scores.

## Context

- Research brief Phase 1; Python-first stack
- ADR-0005

## Acceptance

- [ ] Train command writes ModelVersion row + artifact path
- [ ] Infer command loads a pinned version
- [ ] Metrics from train logged (even if weak)

## Out of scope

- Kronos
- Meta/risk packaging (T-009)
- Claiming edge without T-011

## Verification

```bash
# manage.py train_baseline && manage.py infer_baseline
```
