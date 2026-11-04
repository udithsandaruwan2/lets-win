# 01 — Discovery

**Gate G1:** approved 2026-11-04 by human (intake defaults applied).

## Problem

The operator needs a **cost-aware, leakage-resistant** signal system for gold and crypto. Popular LLM trading frameworks and off-the-shelf time-series foundation models either overclaim (short backtests, inflated Sharpe) or fail on financial returns (negative OOS R²). Building the wrong target (80% accuracy) would optimize vanity metrics.

## Evidence

| # | Source | Type | What it shows | Link |
|---|---|---|---|---|
| E1 | Operator research brief (this chat) | requirement framing | Reject 80% directional accuracy; prefer calibrated probs, after-cost expectancy, selective abstention; phased XAUUSD → crypto | `docs/06-notes/ORIGINAL_BRIEF.md` |
| E2 | TradingAgents paper + audits | literature / critique | Multi-agent LLM firm pattern useful; ~3-month equity BT; SR claims outside authors’ own “excellent” range; HF/SoloSoft skepticism; research-only | `docs/01-systems/tradingagents/NOTES.md`, `docs/04-papers/pdfs/tradingagents-2412.20138.pdf` |
| E3 | Kronos (AAAI 2026) | literature | K-line foundation model on 12B+ records / 45 exchanges; headline **RankIC** not win rate; context 512 for small/base; fine-tune scripts exist | `docs/01-systems/kronos/NOTES.md` |
| E4 | Revisiting TSFMs in finance | literature | TimesFM OOS R² ≈ −2.80%; Chronos also negative; finance-native pretrain helps; CatBoost still strong baseline | `docs/01-systems/timesfm-chronos/NOTES.md`, `docs/04-papers/pdfs/timesfm-revisiting-2511.18578.pdf` |
| E5 | FinGPT / FinBERT | literature | Useful for **sentiment / NLP features**, not price prediction | `docs/01-systems/fingpt-finbert/NOTES.md` |
| E6 | Qlib / FinRL / freqtrade notes | tooling survey | Qlib = research harness; FinRL = late RL research; freqtrade = crypto ops later, not gold MT5 primary | `docs/01-systems/*/NOTES.md` |
| E7 | Validation / leakage notes | methodology | Walk-forward + purged CV + embargo; PIT joins; cost stress required | `docs/02-methodology/` |
| E8 | Recommended stack note | architecture draft | Data → features → signals → meta → risk → output; Gemini as structured news features | `docs/03-architecture/RECOMMENDED_STACK.md` |

No user interviews or live trading P&L yet — discovery is **desk research + operator intent** until paper trading produces E9+.

## Current alternatives

| Segment | Today | Pain | Switching cost |
|---|---|---|---|
| Operator | Discretionary trading; studying TradingAgents / Kronos / bots | Unverified claims; no owned PIT pipeline or honest BT | Time to build Phase-1 data+model; learning curve |
| Operator | Generic TSFMs / LLM “predict next candle” demos | Negative or illusory edge on returns | Low to abandon; high if already overfit a bad pipeline |

## Users and jobs

| Segment | Job to be done | Trigger | Success |
|---|---|---|---|
| Primary operator (sole user) | Receive selective signals with stops/targets and know when to abstain | Session open / scheduled scan | After-cost expectancy and drawdown within plan on paper then tiny live |

## Assumptions

| # | Assumption | Confidence | Impact if wrong | Test | Result |
|---|---|---|---|---|---|
| A1 | Phase-1 tabular GBDT on PIT features can beat costs on chosen TF | med | high | Walk-forward BT with realistic spread/slippage | pending |
| A2 | Slower TF (1H/4H) has better signal/cost ratio than 5m scalp | med–high | med | Optional later ablation vs 5m; Phase-1 locked to 1H/4H | accepted for v1 scope |
| A3 | LLM best as news/macro **feature** producer, not price model | high | med | Ablation: model with vs without Gemini/FinBERT features | pending Phase 2 |
| A4 | Single-asset models beat one universal gold+crypto model | med | med | Shared vs separate models on holdout | pending Phase 4 |
| A5 | Product is primarily for the owner (not SaaS v1) | high | high | Confirmed at G0/G1 | accepted |

## Constraints

- Stack default: React + Vite + Netlify, Django + DRF, promotion-track git (`project/rules/stack.md`)
- No product code before G4
- Prefer one asset first; no cluster for Phase 1
- Research corpus already under repo `docs/`

## Non-goals

- 80% dense-bar win-rate marketing
- LLM candle fine-tunes
- Live auto-execution before paper gate
- Off-the-shelf TimesFM/Chronos as production signal

## Success metrics

- **Primary:** after-cost expectancy on XAUUSD 1H/4H (paper) — baseline `none` → target `> 0` over ≥2–3 months
- **Guardrail:** max drawdown ≤ 15% of paper equity; coverage % always reported with hit rate; live−backtest gap monitored
- **Secondary:** probability calibration (reliability); no positive expectancy under label-shuffle / time-shift sanity tests

## Recommendation

- [x] Proceed (draft) — evidence supports realistic-edge framing and phased build; stack defaults set
- [ ] Pivot: `<new hypothesis>`
- [ ] Stop: `<reason>`

## Open questions

Resolved at G0/G1: personal tool; XAUUSD 1H/4H; paper ≥2–3 months with expectancy > 0 and DD ≤ 15%. Product-delivery questions moved to G2.

**Approved by:** human on 2026-11-04
