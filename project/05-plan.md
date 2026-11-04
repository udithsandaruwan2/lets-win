# 05 — Development plan

**Gate G4:** approved 2026-11-04 by human (M1 first; MT5/CSV for data; no hard M1 date).

## Summary

- **Target:** v0.1 operator skeleton → v0.2 first XAUUSD signal loop → v0.3 paper metrics (no live exec)
- **Capacity:** owner + AI agents; Python-first backend track leads
- **Critical path:** T-001 → T-002 → T-003 → T-005 → T-006 → T-007 → T-008 → T-009 → T-010 → T-011

## Milestones

### M1 — Runnable skeleton (first demo)

- **Demo:** Log into React UI on Netlify (or local); see empty Signals list from Django API + Postgres.
- **Exit:** health OK; auth works; OpenAPI stub; `doctor` clean enough; tracks created.
- **Tasks:** T-001, T-002, T-003, T-004

### M2 — Data + features (XAUUSD 1H/4H)

- **Demo:** Bars in DB; feature job runs without look-ahead; sanity command available.
- **Exit:** PIT checklist items for bars/features documented and runnable.
- **Tasks:** T-005, T-006

### M3 — Baseline signal loop

- **Demo:** Train GBDT; register model; infer writes Signals (incl. abstain); UI shows them.
- **Exit:** Signal↔ModelVersion link; no fabricated UI data.
- **Tasks:** T-007, T-008

### M4 — Risk, paper, performance

- **Demo:** Risk fields on actionable signals; paper journal; expectancy/coverage/DD summary (DD flag at 15%).
- **Exit:** FR-04…07 paths green locally.
- **Tasks:** T-009, T-010

### M5 — Honest validation gate

- **Demo:** `manage.py` walk-forward / purged + costs report; paper-window runbook started.
- **Exit:** FEAT-011 usable; stop condition measurable.
- **Tasks:** T-011, T-012

## Task table

| ID | Task | Size | Depends | Parallel-safe | Status |
|---|---|---|---|---|---|
| T-001 | Bootstrap Django API + Postgres locally | M | — | no | done |
| T-002 | Bootstrap React/Vite web + Netlify config | M | — | yes (vs T-001) | todo |
| T-003 | Session auth + CORS/CSRF for web↔API | M | T-001, T-002 | no | todo |
| T-004 | Signals list/detail API+UI (empty/fixture) | M | T-003 | no | todo |
| T-005 | XAUUSD OHLC ingest (1H/4H) | M | T-001 | no | todo |
| T-006 | PIT feature builder + sanity checks | L | T-005 | no | todo |
| T-007 | GBDT train/infer + model registry | L | T-006 | no | todo |
| T-008 | Wire infer → Signal records + UI live data | M | T-004, T-007 | no | todo |
| T-009 | Meta abstain + stop/target/risk hooks | M | T-008 | no | todo |
| T-010 | Paper journal + performance summary | M | T-009 | no | todo |
| T-011 | Walk-forward / purged validation + costs | L | T-007 | yes (after T-007) | todo |
| T-012 | Render cron + Netlify prod wiring (dev/prod tracks) | M | T-003, T-008 | no | todo |

## Risks

| ID | Risk | Impact | Mitigation | Owner |
|---|---|---|---|---|
| RISK-001 | No after-cost edge | fatal | T-011 before live talk | human |
| RISK-002 | MT5/data PIT gaps | high | T-006 sanity; vendor audit | human |
| RISK-003 | Cross-origin session pain | med | T-003 spike early | agent |
| RISK-004 | Scope creep past M1 | med | G4 slices; no FEAT-015+ until M5 | human |

## Spikes

| ID | Question | Time-box | Decision unblocked | Result |
|---|---|---|---|---|
| S-001 | XAUUSD data source for v1 (MT5 export vs vendor API)? | 0.5 day | T-005 | pending |
| S-002 | Netlify↔Render cookie auth vs token for SPA? | 0.5 day | T-003 | pending |

## Buffers

- Known work: M1–M5 as sequenced above
- Integration/review: +25%
- Interruptions: +15%
- Release: wire Render/Netlify once skeleton works (T-012)

## Review and release

- **Reviewer:** human
- **Required checks:** app tests/lint per `apps/*/AGENTS.md`; `./scripts/doctor.sh`; no secrets in git
- **Release window:** TBD (no calendar date locked)
- **Rollback:** previous Netlify deploy + previous Render deploy; pin prior ModelVersion

## Open questions

| # | Question | Default |
|---|---|---|
| Q1 | First demoable outcome? | **Locked: M1 skeleton** |
| Q2 | XAUUSD data source for T-005? | **Locked: MT5 export / local CSV first** |
| Q3 | Target calendar for M1? | **Locked: no hard date** |

**Approved by:** human on 2026-11-04
