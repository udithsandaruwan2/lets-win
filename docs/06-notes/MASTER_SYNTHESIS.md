# Master synthesis — research collector

**Date:** 2026-11-04  
**Scope:** Everything researched for the Lets Win signal system design.

---

## 1. The 80% myth

Markets are low SNR. Academic and industry evidence converges: useful edges are small; 80%+ dense directional accuracy on liquid instruments is almost never real after costs and honest OOS. Design for **calibrated probabilities**, **expectancy after costs**, and **selective abstention**.

With 1:2 RR, ~40–45% win rate can be profitable. RankIC improvements (Kronos) and MAE rankings (TSFMs) are **not** win rates.

---

## 2. System scorecard

| System | Keep | Drop / defer | Role for us |
|---|---|---|---|
| **TradingAgents** | Agent roles, debate, structured reports, Gemini-ready | Headline Sharpe, short equity BT as truth | Blueprint for LLM **feature** layer |
| **Kronos** | K-line FM, fine-tune scripts, probabilistic sampling | Treating RankIC as scalp win rate | Phase-3 probabilistic signal |
| **TimesFM / Chronos (generic)** | Cautionary evidence | Zero-shot deployment | Do not use off shelf |
| **FinText / finance-pretrained TSFM** | Domain pretraining lesson | Unproven on gold/crypto 5m | Optional research |
| **FinGPT / FinBERT** | Sentiment tooling | Price prediction | News features |
| **Qlib** | Research pipeline patterns; Kronos demo glue | Live MT5/crypto exec | Optional equity-style labs |
| **FinRL** | Cost-aware reward ideas | Phase-1 RL | Late experiment |
| **freqtrade** | Crypto ops, FreqAI, lookahead tools | Gold/forex primary shell | Phase-4 crypto execution |

---

## 3. Evidence anchors (with local PDFs)

1. **TradingAgents** (2412.20138) — multi-agent LLM firm; ~3m 2024 BT; SR claimed very high; authors admit SR outside expected range; external audits skeptical.  
2. **Kronos** (2508.02739 / AAAI 2026) — 12B+ K-lines, 45 exchanges; RankIC +93% vs leading TSFM; context 512 for small/base.  
3. **Revisiting TSFMs** (2511.18578) — TimesFM R² ≈ −2.80%; finance-native pretrain helps; CatBoost still strong.  
4. **TSFM return forecasting** (2606.27100) — TSFMs rank well on MAE; economic skill sparse.  
5. **FinGPT** (2306.06031) — LoRA FinLLMs for sentiment; ~50K-sample class fine-tunes.  
6. **FinBERT** (1908.10063) — classic financial sentiment BERT.  
7. **Qlib** (2009.11189) — AI quant platform.  
8. **FinRL** (2011.09607) — DRL for trading research.

---

## 4. Architecture we should build

See `03-architecture/RECOMMENDED_STACK.md`.

Core idea: **ensemble of cheap tabular models + regime + optional Kronos + LLM structured features → meta gate → risk → alerts**. LLM never owns the price call alone.

---

## 5. Open decision

**Phase-1 timeframe:** prefer **1H/4H swing** over **5m scalp** for first honest edge (costs/noise). User still to confirm asset/timeframe preference.

Once chosen → draft detailed data schema + Phase-1 build plan (next artifact).

---

## 6. Collector inventory

```
docs/00-index/README.md
docs/05-sources/links.md
docs/01-systems/*/NOTES.md          (7 systems)
docs/02-methodology/*/NOTES.md      (validation, expectancy, leakage)
docs/03-architecture/RECOMMENDED_STACK.md
docs/04-papers/pdfs/*.pdf           (9 PDFs, ~25MB)
docs/06-notes/ORIGINAL_BRIEF.md
docs/06-notes/MASTER_SYNTHESIS.md   (this file)
```

Re-run / extend later: vendor API docs for MT5, Binance funding/OI, economic calendar PIT feeds, and a Phase-1 schema doc once timeframe is locked.
