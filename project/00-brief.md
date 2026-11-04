# 00 — Project brief

**Gate G0:** approved 2026-11-04 by human (intake defaults applied).

## Identity

- **Project:** lets-win
- **Owner:** human
- **Date:** 2026-11-04
- **One-liner:** A realistic gold-and-crypto signal system that optimizes calibrated probability and after-cost expectancy — not claimed 80% win rates.

## Problem

A builder who wants automated / assisted trading signals for **XAUUSD** and major crypto (**BTC, ETH, XRP**) cannot trust headline “high accuracy” systems. Markets are noise-dominated; 80%+ directional claims usually mean leakage, overfitting, or cost-blind evaluation. Building without honest validation wastes time and capital risk.

## Outcome

When this works, the operator receives **selective** trade signals (entry / stop / target / confidence) with **positive expectancy after spread, commission, and slippage**, measured out-of-sample and paper-traded before live size. High hit rate is allowed only on a **narrow, abstaining** subset with coverage reported.

**Metric:** paper-trade expectancy after costs > 0 on **XAUUSD 1H/4H** over ≥2–3 months, with max drawdown ≤ **15%** of paper equity. Baseline: none (greenfield).

## Users

| Segment | Job to be done | Current workaround |
|---|---|---|
| Primary operator (owner only — personal tool) | Get honest, cost-aware signals and risk limits for gold/crypto | Manual discretion; unverified open-source / LLM trading demos; research notes in chat |

## Scope

**In scope for v1 (from chat research brief)**
- Data + point-in-time feature pipeline for **one asset first** (recommended: XAUUSD)
- Signal baseline: gradient boosting (LightGBM/XGBoost/CatBoost) with honest walk-forward / purged validation
- Risk controls: vol sizing, daily loss, max DD, news blackouts
- Output: signals to Telegram and/or a dashboard (entry, stop, target, confidence)
- Phased additions: regime detector, Gemini news/macro **structured features** (not candle prediction), optional Kronos fine-tune, then BTC/ETH/XRP, then paper trade
- Product shell per stack default: React + Vite + Netlify frontend; Django + DRF backend; promotion-track git

**Out of scope**
- Guaranteeing 80%+ win rate on dense bars
- Fine-tuning an LLM to predict candles
- Cluster / large infra for Phase 1
- Live automated execution before paper proof (MT5/freqtrade later)
- Treating TradingAgents / FinRL published curves as production truth
- Zero-shot TimesFM/Chronos as the production signal

## Constraints

- Deadline: TBD
- Budget: TBD (chat: single GPU / Colab rental is enough for Kronos later; LightGBM on CPU)
- Stack: **mainly Python** (Django + DRF API + research/ML) · React + Vite UI on Netlify · promotion tracks (`dev|prod` × `frontend|backend` → `main`)
- Compliance: personal single-operator tool (no multi-tenant v1)
- Team: owner + AI agents (DevOpt process)
- Phase-1 market: XAUUSD on **1H/4H** (not 5m scalp first)
- Existing research: `docs/` collector (TradingAgents, Kronos, TSFMs, FinGPT/FinBERT, Qlib, FinRL, freqtrade, methodology)

## Success and stop conditions

- **Success:** calibrated signals with positive after-cost expectancy on Phase-1 asset, selective coverage reported, paper gate passed before live
- **Guardrail:** live vs backtest divergence monitored; no silent look-ahead; costs always modeled
- **Stop if:** cannot show positive OOS expectancy after realistic costs on the first asset within an agreed research window; or operator will not accept selective abstention / non-80% framing

## Riskiest assumption

A LightGBM (+ PIT features + purged walk-forward) baseline can find a small, cost-surviving edge on the chosen gold timeframe — confidence **med**, impact if wrong **high** ( falsified by honest Phase-1 backtest).

## Decision

- [x] Proceed to discovery
- [ ] Pivot: `<new hypothesis>`
- [ ] Stop: `<reason>`

**Approved by:** human on 2026-11-04
