# 02 — PRD

**Gate G2:** approved 2026-11-04 by human (delivery defaults + Python-first stack).

## Summary

**lets-win** is a single-operator web+API product that produces selective, cost-aware trading signals for **XAUUSD (1H/4H first)**, with a path to BTC/ETH/XRP. v1 optimizes **after-cost expectancy and drawdown**, not dense-bar win rate. **Primary language is Python** (Django/DRF API, research/ML jobs, validation). **React + Vite** is the operator UI only (Netlify). Research pipelines stay honest (PIT features, walk-forward / purged validation, paper gate before live execution).

## Problem and evidence

See `project/01-discovery.md` (E1–E8). Do not restate the literature dump here.

## Users and jobs

| Segment | Job to be done | Today | Why switch |
|---|---|---|---|
| Sole operator | Get selective signals (entry/stop/target/confidence) with risk limits and know when the system abstains | Discretion + unverified demos | Owned PIT pipeline, cost-aware metrics, paper gate |

## Outcomes and metrics

- **Primary:** paper after-cost expectancy on XAUUSD 1H/4H — baseline none → target **> 0** over **≥2–3 months**
- **Guardrails:** max DD **≤ 15%** of paper equity; hit rate always paired with **coverage %**; no silent look-ahead
- **Measurement:** backtest reports + paper-trade journal stored via API; dashboard summaries

## Scope

**In scope (v1)**
- Ingest/store OHLC (and later macro/news features) with point-in-time discipline
- Feature generation + LightGBM/XGBoost/CatBoost baseline signal
- Meta/abstain rules + basic risk engine (sizing, daily loss, max DD, news blackout hooks)
- Operator UI: signal list, detail (entry/stop/target/confidence), risk status, paper P&L summary
- Auth for single operator
- Validation tooling: walk-forward / purged splits, cost model, paper mode
- Promotion-track git; deploy web to Netlify; API + all signal/research jobs in Python/Django
- React used as the operator dashboard (dev tool for UI), not for model training or backtests

**Out of scope**
- Multi-tenant SaaS, public signal marketplace
- Guaranteed 80%+ win rate
- LLM predicting candles
- Live auto-execution (MT5/freqtrade) before paper success criteria met
- Zero-shot TimesFM/Chronos as production signal
- 5m scalping as Phase-1 primary

**Deferred (post-v1 / later phases)**
- Regime detector + Gemini structured news/macro features
- Kronos fine-tune + richer meta-model
- BTC / ETH / XRP models
- Telegram delivery (unless chosen as Must in G2 Q1)
- Automated MT5 / freqtrade execution
- Full backtest charting studio in UI

## User journeys

### J1 — Review a new signal

1. Operator signs in.
2. Opens Signals; sees only non-abstained setups with confidence and risk tags.
3. Opens one signal: entry, stop, target, rationale fields available, timestamp.
4. Marks paper fill / skip (journal).

Failure: if data/model job failed, UI shows last-success time and error state — no fabricated signal.

### J2 — Check paper performance

1. Operator opens Performance.
2. Sees expectancy, win rate, coverage, max DD vs 15% guardrail for the paper window.
3. Can drill to trade list.

Failure: empty state until first paper trades exist.

### J3 — System abstains

1. Model/meta layer yields low confidence or blocked regime/news window.
2. Operator sees “no trade / abstain” for the bar — not a forced direction.

## Functional requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| FR-01 | System stores PIT OHLC bars for XAUUSD at configured 1H and/or 4H | Must | Bars queryable by time; no future bars in feature as-of |
| FR-02 | Feature job builds train/infer matrices without look-ahead | Must | Time-shift / shuffle-label sanity tests documented and runnable |
| FR-03 | Baseline GBDT produces directional or probabilistic signal + confidence | Must | Artifact versioned; inference writes Signal records |
| FR-04 | Meta/risk layer can abstain and attach stop/target/size suggestion | Must | Abstain rows do not appear as actionable trades; risk fields present on actions |
| FR-05 | Operator can list/filter signals and open detail in web UI | Must | Authenticated; entry/stop/target/confidence visible |
| FR-06 | Paper journal: record fill, skip, or outcome against a signal | Must | P&L summary reflects journal; expectancy computable |
| FR-07 | Performance view shows expectancy, coverage, hit rate, max DD | Must | DD breach flagged vs 15% |
| FR-08 | Single-operator authentication | Must | Unauthenticated API/UI denied |
| FR-09 | Walk-forward / purged validation runnable as Python (Django management command / scripts) | Must | Report includes costs; outputs stored or exportable; no JS required to run research |
| FR-10 | Telegram push for new actionable signals | Should | Message includes entry/stop/target/confidence (if approved Must→promote) |
| FR-11 | News blackout calendar blocks signals around NFP/FOMC/CPI | Should | Configurable windows; abstain reason logged |
| FR-12 | Multi-asset crypto signals | Could | Deferred until gold paper gate |

## Non-functional requirements

| ID | Requirement | Target | Verification |
|---|---|---|---|
| NFR-01 | Correctness over speed for research jobs | PIT + purged CV required before claiming edge | checklist in validation runbook |
| NFR-02 | Secrets | No API keys/broker tokens in repo or client | env only; doctor/secret scan |
| NFR-03 | Access | Single-user; least privilege | auth tests |
| NFR-04 | UI a11y baseline | Keyboard usable signal list/detail; semantic HTML | manual pass |
| NFR-05 | Deploy | Web on Netlify; API per Django hosting choice (TBD at G3) | deploy docs |
| NFR-06 | Auditability | Every signal ties to model version + feature as-of | DB fields / logs |

## Dependencies and risks

| ID | Item | Impact | Mitigation |
|---|---|---|---|
| RISK-01 | No economic edge after costs on XAUUSD 1H/4H | High — project stop condition | Honest BT first; stop rule in brief |
| RISK-02 | MT5/data vendor PIT gaps | High — false edge | Vendor audit; embargo tests |
| RISK-03 | Scope creep into LLM candle models / multi-tenant | Med | Catalog non-goals; G4 slices |
| RISK-04 | Overfitting via UI-driven hyperopt | Med | Locked validation protocol; no test peek |

## Release criteria (v1)

- [ ] All Must FRs met
- [ ] No open P0/P1
- [ ] Paper metrics path live (even if expectancy still accumulating)
- [ ] Rollback: redeploy previous web/API; disable signal job

## Open questions

| # | Question | Owner | Default |
|---|---|---|---|
| Q1 | Signal delivery for v1? | human | **Locked:** Dashboard Must; Telegram Should |
| Q2 | Auth style for single operator? | human | **Locked:** Django session + one user |
| Q3 | Backtest charts in UI for v1? | human | **Locked:** No — Python CLI/reports Must; UI charts deferred |
| Q4 | Stack emphasis | human | **Locked:** Django + React; mainly Python for API + research/ML |

**Approved by:** human on 2026-11-04
