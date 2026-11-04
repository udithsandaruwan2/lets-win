# 02 — Product catalog

**Gate G2:** approved 2026-11-04 by human.  
IDs are stable. Status: `idea → specified → planned → in-progress → shipped → deprecated` | `dropped`.

Delivery locks: dashboard Must, Telegram Should; Django session single-user; Python CLI backtests (no UI studio v1).

## Capabilities

| ID | Capability | Outcome | Owner | Status |
|---|---|---|---|---|
| CAP-001 | Market data & features | PIT bars/features for gold (then crypto) | human | active |
| CAP-002 | Signal models | Versioned GBDT (later Kronos/meta) outputs | human | active |
| CAP-003 | Risk & abstention | Sized, filtered, blackout-aware actions | human | active |
| CAP-004 | Operator delivery | Authenticated UI (+ optional Telegram) | human | active |
| CAP-005 | Validation & paper | Honest BT + paper journal + metrics | human | active |

## Features

| ID | Capability | Feature | Priority | Status | Spec | Release |
|---|---|---|---|---|---|---|
| FEAT-001 | CAP-001 | XAUUSD OHLC ingest (1H/4H) + storage | Must | idea | | v0.1 |
| FEAT-002 | CAP-001 | PIT feature builder (technicals, session, vol) | Must | idea | | v0.1 |
| FEAT-003 | CAP-002 | LightGBM/XGBoost/CatBoost baseline train/infer | Must | idea | | v0.1 |
| FEAT-004 | CAP-002 | Model registry (version, metrics, artifact URI) | Must | idea | | v0.1 |
| FEAT-005 | CAP-003 | Meta abstain + stop/target/confidence attachment | Must | idea | | v0.1 |
| FEAT-006 | CAP-003 | Risk limits (daily loss, max DD, vol sizing hooks) | Must | idea | | v0.1 |
| FEAT-007 | CAP-004 | Operator auth (single user) | Must | idea | | v0.1 |
| FEAT-008 | CAP-004 | Signals list + detail UI | Must | idea | | v0.1 |
| FEAT-009 | CAP-005 | Paper journal (fill/skip/outcome) | Must | idea | | v0.1 |
| FEAT-010 | CAP-005 | Performance summary (expectancy, coverage, hit rate, DD) | Must | idea | | v0.1 |
| FEAT-011 | CAP-005 | Python walk-forward / purged validation + cost model | Must | idea | | v0.1 |
| FEAT-012 | CAP-003 | News blackout windows (NFP/FOMC/CPI) | Should | idea | | v0.2 |
| FEAT-013 | CAP-004 | Telegram signal alerts | Should | idea | | v0.2 |
| FEAT-014 | CAP-002 | Regime detector gate | Should | idea | | v0.3 |
| FEAT-015 | CAP-001 | Gemini/FinBERT structured news-macro features | Should | idea | | v0.3 |
| FEAT-016 | CAP-002 | Kronos fine-tune + probabilistic features | Could | idea | | v0.4 |
| FEAT-017 | CAP-001 | BTC/ETH/XRP data + separate models | Could | idea | | v0.4 |
| FEAT-018 | CAP-004 | Live MT5 / freqtrade execution bridge | Could | idea | | v1.x |

## Non-functional requirements

| ID | Requirement | Target | Status |
|---|---|---|---|
| NFR-001 | Point-in-time + purged validation before edge claims | Mandatory for research releases | active |
| NFR-002 | Secrets only in env | No keys in git/client | active |
| NFR-003 | Single-operator access control | Unauthenticated denied | active |
| NFR-004 | Signal↔model version audit trail | Required on every signal | active |
| NFR-005 | Web deploy on Netlify | Production web via Netlify | active |
| NFR-006 | Python-first research/API | Training, BT, jobs in Python/Django — not Node | active |

## Risks

| ID | Risk | Impact | Mitigation | Status |
|---|---|---|---|---|
| RISK-001 | No after-cost edge on XAUUSD 1H/4H | fatal | Honest BT; stop condition | open |
| RISK-002 | Data leakage / non-PIT vendors | high | Leakage checklist; sanity tests | open |
| RISK-003 | Scope creep (SaaS, LLM candles, 5m first) | med | Catalog + gates | open |
| RISK-004 | UI hyperopt overfitting | med | Locked validation protocol | open |

## Dropped / deferred

| ID | Item | Reason | Revisit when |
|---|---|---|---|
| — | Multi-tenant SaaS | Personal tool v1 | Explicit product pivot |
| — | 5m scalp as Phase-1 primary | Cost/noise | After swing edge proven |
| — | LLM candle fine-tune | Poor compute use | Never as primary |
| — | TimesFM/Chronos zero-shot prod signal | Negative finance R² evidence | Finance-native pretrain research only |
| FEAT-019 | Rich backtest charting studio in UI | Not needed for first edge | After CLI reports stable |

## Rules

- Every spec, task, commit, and changelog entry references a `FEAT-###`.
- Do not reuse IDs.
- Do not add a feature without a priority and a status.
- The catalog is scope; the plan is sequence; the tracker is execution.
